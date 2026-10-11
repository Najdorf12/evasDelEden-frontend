import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seleccionar",
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const current = value == null ? "" : String(value);

  // Conserva valores guardados aunque ya no estén en las opciones.
  const normalizedOptions = options.map((option) => String(option));
  const list =
    current && !normalizedOptions.includes(current)
      ? [current, ...normalizedOptions]
      : normalizedOptions;

  const items = ["", ...list];

  useEffect(() => {
    if (!open) return;

    const handleOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  const selectOption = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full font-text z-1000 ${open ? "z-50" : ""} ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm text-purple-200"
        >
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className={`flex h-10 w-full items-center justify-between
          rounded-lg border border-purple-500/70 bg-zinc-900/80
          px-3 text-left text-sm text-zinc-200 outline-none
          transition-colors focus:border-purple-300
          ${disabled ? "cursor-not-allowed opacity-40" : "hover:border-purple-400"}
        `}
      >
        <span className={current ? "truncate" : "truncate text-zinc-500"}>
          {current || placeholder}
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`ml-2 h-4 w-4 shrink-0 text-purple-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && !disabled && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1
            max-h-56 overflow-y-auto rounded-lg border border-purple-600
            bg-zinc-900 py-1 shadow-xl shadow-black/60"
        >
          {items.map((option, index) => {
            const selected = option === current;

            return (
              <li
                key={`${option}-${index}`}
                role="option"
                aria-selected={selected}
                onClick={() => selectOption(option)}
                className={`cursor-pointer px-3 py-2 text-sm transition-colors
                  ${
                    selected
                      ? "bg-purple-700/40 text-purple-200"
                      : "text-zinc-300 hover:bg-purple-600/20 hover:text-white"
                  }`}
              >
                {option || "Limpiar selección"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;