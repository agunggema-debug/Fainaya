import MenuIcon from "../MenuIcon";

type DesktopShortcutProps = {
  label: string;
  icon: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

/** Ikon di area desktop (ala Ext JS 2.0 Desktop): klik untuk memilih, klik 2x untuk membuka. */
export default function DesktopShortcut({ label, icon, selected, onSelect, onOpen }: Readonly<DesktopShortcutProps>) {
  return (
    <button
      type="button"
      title={`${label} — klik 2x untuk membuka`}
      className={`ext-shortcut ${selected ? "ext-shortcut-selected" : ""}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <span className="ext-shortcut-glyph">
        <MenuIcon path={icon} className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="ext-shortcut-label">{label}</span>
    </button>
  );
}