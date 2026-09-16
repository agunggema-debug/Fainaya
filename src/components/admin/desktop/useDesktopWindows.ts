import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DesktopBounds, DesktopWindowDef, WindowGeometry, WindowRuntime } from "./types";

/** Tinggi taskbar (px) — dipakai untuk menghitung area desktop yang tersedia. */
export const TASKBAR_HEIGHT = 30;

const DEFAULT_SIZE = { width: 980, height: 600 };
const DEFAULT_MIN_SIZE = { width: 380, height: 240 };
const CASCADE_STEP = 28;
const MARGIN = 18;
/** Di bawah lebar ini window otomatis terbuka maximize (ramah mobile). */
const COMPACT_WIDTH = 820;

type DesktopState = {
  order: string[];
  runtimes: Record<string, WindowRuntime>;
  activeId: string | null;
};

export function clamp(value: number, min: number, max: number): number {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

function minSizeOf(def: DesktopWindowDef) {
  return def.minSize ?? DEFAULT_MIN_SIZE;
}

function computeGeometry(def: DesktopWindowDef, slot: number, bounds: DesktopBounds): WindowGeometry {
  const desired = def.defaultSize ?? DEFAULT_SIZE;
  const min = minSizeOf(def);
  const maxWidth = Math.max(min.width, bounds.width - MARGIN * 2);
  const maxHeight = Math.max(min.height, bounds.height - MARGIN * 2);
  const width = clamp(desired.width, min.width, maxWidth);
  const height = clamp(desired.height, min.height, maxHeight);
  return {
    width,
    height,
    x: clamp(MARGIN + slot * CASCADE_STEP, 0, Math.max(0, bounds.width - width)),
    y: clamp(MARGIN + slot * CASCADE_STEP, 0, Math.max(0, bounds.height - height)),
  };
}

function createRuntime(def: DesktopWindowDef, slot: number, bounds: DesktopBounds): WindowRuntime {
  return {
    geometry: computeGeometry(def, slot, bounds),
    minimized: false,
    maximized: bounds.width < COMPACT_WIDTH,
  };
}

function bringToFront(order: string[], id: string): string[] {
  if (order[order.length - 1] === id) return order;
  return [...order.filter((entry) => entry !== id), id];
}

function topmostVisible(order: string[], runtimes: Record<string, WindowRuntime>): string | null {
  for (let i = order.length - 1; i >= 0; i -= 1) {
    const runtime = runtimes[order[i]];
    if (runtime && !runtime.minimized) return order[i];
  }
  return null;
}

/**
 * Window manager mini ala Ext JS 2.0 Desktop: menyimpan urutan z-index,
 * posisi, ukuran, serta status minimize/maximize setiap window.
 */
export function useDesktopWindows(defs: DesktopWindowDef[], bounds: DesktopBounds) {
  const boundsRef = useRef(bounds);
  const defMap = useMemo(() => new Map(defs.map((def) => [def.id, def])), [defs]);
  const defMapRef = useRef(defMap);

  /* Ref hanya disinkronkan lewat effect (tidak boleh ditulis saat render). */
  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  useEffect(() => {
    defMapRef.current = defMap;
  }, [defMap]);

  const [state, setState] = useState<DesktopState>(() => {
    const order: string[] = [];
    const runtimes: Record<string, WindowRuntime> = {};
    let slot = 0;
    for (const def of defs) {
      if (!def.openByDefault) continue;
      runtimes[def.id] = createRuntime(def, slot, bounds);
      order.push(def.id);
      slot += 1;
    }
    return { order, runtimes, activeId: order.length > 0 ? order[order.length - 1] : null };
  });

  const open = useCallback((id: string) => {
    const def = defMapRef.current.get(id);
    if (!def) return;
    setState((prev) => {
      const existing = prev.runtimes[id];
      return {
        order: bringToFront(prev.order, id),
        runtimes: {
          ...prev.runtimes,
          [id]: existing
            ? { ...existing, minimized: false }
            : createRuntime(def, prev.order.length, boundsRef.current),
        },
        activeId: id,
      };
    });
  }, []);

  const close = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.runtimes[id]) return prev;
      const order = prev.order.filter((entry) => entry !== id);
      const runtimes = { ...prev.runtimes };
      delete runtimes[id];
      return { order, runtimes, activeId: topmostVisible(order, runtimes) };
    });
  }, []);

  const focus = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.runtimes[id]) return prev;
      const order = bringToFront(prev.order, id);
      if (prev.activeId === id && order === prev.order) return prev;
      return { ...prev, order, activeId: id };
    });
  }, []);

  const minimize = useCallback((id: string) => {
    setState((prev) => {
      const runtime = prev.runtimes[id];
      if (!runtime) return prev;
      const runtimes = { ...prev.runtimes, [id]: { ...runtime, minimized: true } };
      return { order: prev.order, runtimes, activeId: topmostVisible(prev.order, runtimes) };
    });
  }, []);

  const restore = useCallback((id: string) => {
    setState((prev) => {
      const runtime = prev.runtimes[id];
      if (!runtime) return prev;
      return {
        order: bringToFront(prev.order, id),
        runtimes: { ...prev.runtimes, [id]: { ...runtime, minimized: false } },
        activeId: id,
      };
    });
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setState((prev) => {
      const runtime = prev.runtimes[id];
      if (!runtime) return prev;
      return {
        order: bringToFront(prev.order, id),
        runtimes: {
          ...prev.runtimes,
          [id]: { ...runtime, minimized: false, maximized: !runtime.maximized },
        },
        activeId: id,
      };
    });
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setState((prev) => {
      const runtime = prev.runtimes[id];
      if (!runtime) return prev;
      if (runtime.geometry.x === x && runtime.geometry.y === y) return prev;
      return {
        ...prev,
        runtimes: { ...prev.runtimes, [id]: { ...runtime, geometry: { ...runtime.geometry, x, y } } },
      };
    });
  }, []);

  const resize = useCallback((id: string, width: number, height: number) => {
    setState((prev) => {
      const runtime = prev.runtimes[id];
      if (!runtime) return prev;
      if (runtime.geometry.width === width && runtime.geometry.height === height) return prev;
      return {
        ...prev,
        runtimes: { ...prev.runtimes, [id]: { ...runtime, geometry: { ...runtime.geometry, width, height } } },
      };
    });
  }, []);

  /** Jaga agar semua window tetap berada di dalam area desktop yang tampak. */
  useEffect(() => {
    setState((prev) => {
      let changed = false;
      const runtimes: Record<string, WindowRuntime> = {};
      for (const [id, runtime] of Object.entries(prev.runtimes)) {
        if (runtime.maximized) {
          runtimes[id] = runtime;
          continue;
        }
        const def = defMapRef.current.get(id);
        const min = def ? minSizeOf(def) : DEFAULT_MIN_SIZE;
        const width = clamp(runtime.geometry.width, min.width, Math.max(min.width, bounds.width - MARGIN));
        const height = clamp(runtime.geometry.height, min.height, Math.max(min.height, bounds.height - MARGIN));
        const x = clamp(runtime.geometry.x, 0, Math.max(0, bounds.width - width));
        const y = clamp(runtime.geometry.y, 0, Math.max(0, bounds.height - height));
        if (
          width !== runtime.geometry.width ||
          height !== runtime.geometry.height ||
          x !== runtime.geometry.x ||
          y !== runtime.geometry.y
        ) {
          changed = true;
          runtimes[id] = { ...runtime, geometry: { x, y, width, height } };
        } else {
          runtimes[id] = runtime;
        }
      }
      return changed ? { ...prev, runtimes } : prev;
    });
  }, [bounds.width, bounds.height]);

  return {
    order: state.order,
    runtimes: state.runtimes,
    activeId: state.activeId,
    isOpen: (id: string) => Boolean(state.runtimes[id]),
    open,
    close,
    focus,
    minimize,
    restore,
    toggleMaximize,
    move,
    resize,
  };
}