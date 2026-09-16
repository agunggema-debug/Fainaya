import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import MenuIcon from "../MenuIcon";
import type { DesktopBounds, DesktopWindowDef, WindowRuntime } from "./types";
import { clamp } from "./useDesktopWindows";

/** Minimal bagian title bar yang tetap terlihat supaya window tidak "hilang". */
const MIN_VISIBLE_VERTICAL = 34;
const DEFAULT_MIN_WIDTH = 380;
const DEFAULT_MIN_HEIGHT = 220;

const GLYPHS: Record<"minimize" | "maximize" | "restore" | "close", ReactNode> = {
  minimize: (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <path d="M2.5 9h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  maximize: (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <rect x="2.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  restore: (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <rect x="1.5" y="4.5" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 4.5v-3h6v6h-3" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <path d="M3.2 3.2l5.6 5.6M8.8 3.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

type ToolButtonProps = {
  label: string;
  glyph: ReactNode;
  variant?: "default" | "close";
  onClick: () => void;
};

function ToolButton({ label, glyph, variant = "default", onClick }: Readonly<ToolButtonProps>) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`ext-tool ${variant === "close" ? "ext-tool-close" : ""}`}
      onClick={onClick}
    >
      {glyph}
    </button>
  );
}

type DesktopWindowProps = {
  def: DesktopWindowDef;
  runtime: WindowRuntime;
  bounds: DesktopBounds;
  active: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
};

export default function DesktopWindow({
  def,
  runtime,
  bounds,
  active,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
}: Readonly<DesktopWindowProps>) {
  const draggingRef = useRef(false);

  /** Drag title bar untuk move, drag sudut kanan bawah untuk resize (pointer events). */
  const startInteraction = (mode: "move" | "resize") => (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0 || runtime.maximized || draggingRef.current) return;
    event.preventDefault();
    onFocus();

    const startX = event.clientX;
    const startY = event.clientY;
    const startGeometry = runtime.geometry;
    const minWidth = def.minSize?.width ?? DEFAULT_MIN_WIDTH;
    const minHeight = def.minSize?.height ?? DEFAULT_MIN_HEIGHT;

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (mode === "move") {
        onMove(
          clamp(startGeometry.x + dx, 0, Math.max(0, bounds.width - 90)),
          clamp(startGeometry.y + dy, 0, Math.max(0, bounds.height - MIN_VISIBLE_VERTICAL)),
        );
        return;
      }
      onResize(
        clamp(startGeometry.width + dx, minWidth, Math.max(minWidth, bounds.width - startGeometry.x)),
        clamp(startGeometry.height + dy, minHeight, Math.max(minHeight, bounds.height - startGeometry.y)),
      );
    };

    const handleEnd = () => {
      draggingRef.current = false;
      document.body.classList.remove("ext-dragging");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("pointercancel", handleEnd);
    };

    draggingRef.current = true;
    document.body.classList.add("ext-dragging");
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);
  };

  const geometry = runtime.maximized
    ? { x: 0, y: 0, width: bounds.width, height: bounds.height }
    : runtime.geometry;

  return (
    <section
      role="dialog"
      aria-label={def.title}
      className={`ext-window absolute flex flex-col ${active ? "ext-window-active" : "ext-window-inactive"} ${
        runtime.maximized ? "ext-window-maximized" : ""
      }`}
      style={{
        left: geometry.x,
        top: geometry.y,
        width: geometry.width,
        height: geometry.height,
        zIndex,
        display: runtime.minimized ? "none" : "flex",
      }}
      onPointerDown={onFocus}
    >
      {/* ── Title bar ── */}
      <div
        className="ext-titlebar flex h-[26px] flex-none items-center gap-1.5 px-1.5"
        onPointerDown={startInteraction("move")}
        onDoubleClick={onToggleMaximize}
      >
        <span className="ext-titlebar-icon">
          <MenuIcon path={def.icon} className="h-4 w-4" strokeWidth={2} />
        </span>
        <h2 className="ext-titlebar-text flex-1 truncate">{def.title}</h2>
        <div
          className="flex flex-none items-center gap-1"
          onPointerDown={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
        >
          <ToolButton label="Minimize" glyph={GLYPHS.minimize} onClick={onMinimize} />
          <ToolButton
            label={runtime.maximized ? "Restore" : "Maximize"}
            glyph={runtime.maximized ? GLYPHS.restore : GLYPHS.maximize}
            onClick={onToggleMaximize}
          />
          <span className="ext-toolbar-divider" />
          <ToolButton label="Close" glyph={GLYPHS.close} variant="close" onClick={onClose} />
        </div>
      </div>

      {/* ── Toolbar Ext (fixed, tidak ikut ter-scroll) ── */}
      {def.toolbar && <div className="ext-toolbar flex-none">{def.toolbar}</div>}

      {/* ── Body ── */}
      <div className="ext-window-body flex-1 overflow-auto">
        <div className="p-4">{def.content}</div>
      </div>

      {/* ── Status bar ── */}
      <div className="ext-statusbar flex h-[21px] flex-none items-center justify-between gap-3 px-2">
        <span className="truncate">{def.statusText ?? ""}</span>
        <span className="truncate opacity-80">
          {runtime.maximized ? "Maximized" : `${Math.round(geometry.width)} x ${Math.round(geometry.height)}`}
        </span>
      </div>

      {/* ── Resize handle ── */}
      {!runtime.maximized && (
        <div className="ext-resize-handle" title="Resize window" onPointerDown={startInteraction("resize")} />
      )}
    </section>
  );
}