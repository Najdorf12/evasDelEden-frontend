import { useState, useEffect, useRef } from "react";
import icon from "/icon14.png";

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

export const EDADES = range(18, 60);
export const ALTURAS = range(145, 195); // cm
export const PESOS = range(40, 120); // kg
export const BUSTO = range(70, 130);
export const CINTURA = range(50, 100);
export const CADERA = range(80, 140);

// Editá esta lista con los servicios reales de tu plataforma
export const SERVICIOS = [
  "Acompañamiento",
  "Salidas / Eventos",
  "Masajes",
  "Videollamadas",
  "Viajes",
  "Atiendo en mi domicilio",
  "Voy a hotel / domicilio",
];

export const HORARIOS = ["Mañana", "Tarde", "Noche", "Madrugada"];

export const FRASES_RAPIDAS = [
  "Simpática y atenta",
  "Trato amable y discreto",
  "Foto 100% real",
  "Atención personalizada",
  "Ambiente reservado y cómodo",
  "Puntualidad",
];

export const OTRO_LABEL = "Otro / Prefiero especificar";
export const DEPILACION_OPTIONS = ["Completa", "Natural", OTRO_LABEL];

/* ---------- INPUT DE TEXTO CON LABEL FLOTANTE ---------- */
export const FormInput = ({
  label,
  error,
  register,
  name,
  required,
  placeholder,
  ...rest
}) => (
  <div className="relative font-text ">
    {error && (
      <p className="text-red-400 text-xs mb-1 xl:absolute xl:right-0 xl:-top-1 xl:mb-0">
        {error.message}
      </p>
    )}
    <input
      autoComplete="off"
      placeholder={placeholder || label}
      className="peer h-10 w-full border-b-2 border-purple-400 text-zinc-200 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-600 transition-colors"
      {...register(
        name,
        required
          ? { required: { value: true, message: `${label} es requerido` } }
          : {},
      )}
      {...rest}
    />
    <label className="absolute left-0 -top-3.5 text-purple-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-200 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm">
      {label}
    </label>
  </div>
);

/* ---------- TARJETA DE SECCIÓN ---------- */
export const SectionCard = ({ title, subtitle, children }) => (
  <div className="relative bg-black/20 rounded-xl pt-6 pb-7 px-3 space-y-7 border border-purple-600 xl:p-7 bg-gradient-to-tl from-zinc-900 via-purple-950 to-zinc-900">
    <div>
      <img src={icon} alt="icon" className="w-12 absolute right-4 top-4" />
      <h3 className="font-title text-3xl text-zinc-300 xl:text-4xl">{title}</h3>
      {subtitle && (
        <p className="text-zinc-300 text-sm font-text mt-1 lg:text-base">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);

/* ---------- SELECT PERSONALIZADO (reemplaza al <select> nativo) ---------- */
const ChevronIcon = ({ open }) => (
  <svg
    className={`ml-2 h-4 w-4 shrink-0 text-purple-400 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 8l5 5 5-5" />
  </svg>
);

export const CustomSelect = ({
  id,
  label,
  shortLabel,
  value,
  onChange,
  options,
  placeholder = "Seleccionar",
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const openedRef = useRef(false);

  const current = value ? String(value) : "";
  // Si ya hay un valor guardado que no está en la lista, lo mantenemos
  const list =
    current && !options.includes(current) ? [current, ...options] : options;
  // El primer ítem ("") sirve para borrar la selección
  const items = ["", ...list];
  const listId = `${id}-listbox`;

  const openList = () => {
    setActiveIndex(items.indexOf(current));
    setOpen(true);
  };

  const select = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  // Cerrar al tocar/clickear afuera
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  // Mantener visible la opción activa (centrada al abrir)
  useEffect(() => {
    if (!open) {
      openedRef.current = false;
      return;
    }
    const listEl = listRef.current;
    const el = listEl?.querySelector('[data-active="true"]');
    if (!listEl || !el) return;

    if (!openedRef.current) {
      listEl.scrollTop =
        el.offsetTop - listEl.clientHeight / 2 + el.offsetHeight / 2;
      openedRef.current = true;
      return;
    }
    if (el.offsetTop < listEl.scrollTop) {
      listEl.scrollTop = el.offsetTop;
    } else if (
      el.offsetTop + el.offsetHeight >
      listEl.scrollTop + listEl.clientHeight
    ) {
      listEl.scrollTop = el.offsetTop + el.offsetHeight - listEl.clientHeight;
    }
  }, [open, activeIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        openList();
        return;
      }
      setActiveIndex((i) =>
        e.key === "ArrowDown"
          ? Math.min(i + 1, items.length - 1)
          : Math.max(i - 1, 0),
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) openList();
      else if (activeIndex >= 0) select(items[activeIndex]);
      else setOpen(false);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative font-text ${open ? "z-40" : ""}`}
    >
      {label && (
        <label htmlFor={id} className="text-sm text-purple-200">
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined
        }
        aria-label={
          !label && shortLabel
            ? `${shortLabel}: ${current || "sin seleccionar"}`
            : undefined
        }
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => {
          if (e.key === " ") e.preventDefault();
        }}
        className={`mt-1 flex h-10 w-full items-center justify-between border-b-2 bg-transparent text-left text-sm transition-colors focus:outline-none xl:text-base ${
          open
            ? "border-purple-600"
            : "border-purple-400 focus:border-purple-600"
        }`}
      >
        <span className="flex min-w-0 items-baseline truncate">
          {current ? (
            <>
              {shortLabel && (
                <span className="mr-1.5 text-xs text-zinc-400">
                  {shortLabel}
                </span>
              )}
              <span className="text-zinc-200">{current}</span>
            </>
          ) : (
            <span className="text-zinc-500">{shortLabel || placeholder}</span>
          )}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border border-purple-600 bg-zinc-900 py-1 shadow-xl shadow-black/60 [scrollbar-width:thin] [scrollbar-color:#7e22ce_#18181b]"
        >
          {items.map((opt, i) => {
            const isSelected = opt === current;
            const isActive = i === activeIndex;
            const isClear = opt === "";

            return (
              <li
                key={opt || "__none"}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                data-active={isActive}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(opt)}
                className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-purple-700 text-zinc-100"
                    : isActive
                      ? "bg-purple-900/70 text-zinc-100"
                      : isClear
                        ? "text-zinc-500 italic"
                        : "text-zinc-300"
                }`}
              >
                {isClear ? "Sin especificar" : opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

/* ---------- MEDIDAS: 3 selects que arman "90-60-90" ---------- */
export const MedidasSelector = ({ register, value, onChange }) => {
  const [busto = "", cintura = "", cadera = ""] = String(value || "")
    .split("-")
    .map((s) => s.trim());

  const update = (index, newValue) => {
    const parts = [busto, cintura, cadera];
    parts[index] = newValue;
    onChange(parts.every((p) => !p) ? "" : parts.join("-"));
  };

  const fields = [
    { key: "busto", label: "Busto", options: BUSTO, current: busto },
    { key: "cintura", label: "Cintura", options: CINTURA, current: cintura },
    { key: "cadera", label: "Cadera", options: CADERA, current: cadera },
  ];

  return (
    <div className="font-text">
      <p className="text-sm text-purple-200">Medidas (cm)</p>
      <input type="hidden" {...register("medidas")} />
      <div className="grid grid-cols-3 gap-3">
        {fields.map((f, i) => (
          <CustomSelect
            key={f.key}
            id={`medidas-${f.key}`}
            shortLabel={f.label}
            value={f.current}
            options={f.options}
            onChange={(v) => update(i, v)}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------- CHIPS (simple o múltiple, con opción "Otro" opcional) ---------- */
export const OptionButtons = ({
  label,
  options,
  value,
  onChange,
  multiple = false,
  allowOther = false,
  otherPlaceholder = "Escribí el tuyo...",
}) => {
  const [otherOpen, setOtherOpen] = useState(false);
  const otherInputRef = useRef(null);

  const rawTokens = multiple ? String(value || "").split(",") : [value || ""];

  const selectedValues = rawTokens
    .map((item) => String(item).trim())
    .filter(Boolean);

  // Texto libre: todo lo que no coincide con una opción de la lista
  const customText = allowOther
    ? rawTokens
        .filter((t) => t.trim() && !options.includes(t.trim()))
        .map((t) => t.replace(/^ /, ""))
        .join(", ")
    : "";

  const showOther = allowOther && (otherOpen || customText !== "");

  // Arma el string final: opciones elegidas (en orden) + texto libre
  const buildValue = (known, custom) =>
    [...options.filter((o) => known.includes(o)), custom.trim() ? custom : ""]
      .filter(Boolean)
      .join(", ");

  const toggleOption = (option) => {
    if (!multiple) {
      onChange(option === value ? "" : option);
      return;
    }

    const nextValues = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];

    if (allowOther) {
      onChange(buildValue(nextValues, customText));
      return;
    }

    onChange(nextValues.join(", "));
  };

  const toggleOther = () => {
    if (showOther) {
      setOtherOpen(false);
      onChange(buildValue(selectedValues, ""));
      return;
    }
    setOtherOpen(true);
    setTimeout(() => otherInputRef.current?.focus(), 0);
  };

  const handleOtherChange = (e) => {
    // Sin comas (se usan como separador) ni espacios al inicio
    const clean = e.target.value.replace(/,/g, "").replace(/^\s+/, "");
    onChange(buildValue(selectedValues, clean));
  };

  const handleOtherBlur = () => {
    onChange(buildValue(selectedValues, customText.trim()));
  };

  const chipClass = (selected) =>
    `rounded-lg border px-6 py-2 text-xs md:text-sm xl:text-base transition-colors ${
      selected
        ? "border-purple-400 bg-purple-700 text-zinc-300"
        : "border-zinc-600 bg-black/20 text-zinc-300 hover:border-purple-400"
    }`;

  return (
    <fieldset className=" font-text">
      <legend className="mb-3 text-sm text-purple-200">{label}</legend>

      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((option) => {
          const selected = selectedValues.includes(option);

          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleOption(option)}
              className={chipClass(selected)}
            >
              {option}
            </button>
          );
        })}

        {allowOther && (
          <button
            type="button"
            aria-pressed={showOther}
            onClick={toggleOther}
            className={chipClass(showOther)}
          >
            {OTRO_LABEL}
          </button>
        )}
      </div>

      {showOther && (
        <input
          ref={otherInputRef}
          type="text"
          value={customText}
          onChange={handleOtherChange}
          onBlur={handleOtherBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault(); // evita enviar el form
          }}
          maxLength={60}
          placeholder={otherPlaceholder}
          className="h-10 w-full rounded-lg border border-purple-500 bg-transparent px-3 text-xs text-zinc-300 outline-none focus:border-purple-300"
        />
      )}
    </fieldset>
  );
};

export const PhysicalFields = ({
  register,
  watch,
  setValue,
  resetKey = "new",
}) => {
  const setField = (name) => (value) =>
    setValue(name, value, { shouldDirty: true });

  return (
    <div className="grid gap-6 xl:grid-cols-2 ">
      <CustomSelect
        id="edad"
        label="Edad (años)"
        value={watch("edad")}
        onChange={setField("edad")}
        options={EDADES}
      />
      <CustomSelect
        id="altura"
        label="Altura (cm)"
        value={watch("altura")}
        onChange={setField("altura")}
        options={ALTURAS}
      />
      <CustomSelect
        id="peso"
        label="Peso (kg)"
        value={watch("peso")}
        onChange={setField("peso")}
        options={PESOS}
      />
      <div className="mb-3">
        <MedidasSelector
          register={register}
          value={watch("medidas")}
          onChange={setField("medidas")}
        />
      </div>
      <div className="w-full flex flex-col gap-3">
        {/* Depilación */}
        <div className="">
          <OptionButtons
            label="Depilación"
            options={DEPILACION_OPTIONS}
            value={watch("depilacion")}
            onChange={setField("depilacion")}
          />

          {watch("depilacion") === OTRO_LABEL && (
            <input
              {...register("depilacionDetalle")}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              placeholder="Especificá tu preferencia..."
              className="h-10 w-full rounded-lg border border-purple-500 bg-transparent px-3 text-zinc-300 outline-none focus:border-purple-300"
            />
          )}
        </div>

        {/* Servicio */}
        <OptionButtons
          key={`servicio-${resetKey}`}
          label="¿Qué servicio ofrece? (podés elegir varios)"
          options={SERVICIOS}
          multiple
          allowOther
          otherPlaceholder="Escribí tu servicio..."
          value={watch("servicio")}
          onChange={setField("servicio")}
        />

        {/* Horario */}
        <OptionButtons
          key={`horario-${resetKey}`}
          label="¿En qué horarios está disponible? (podés elegir varios)"
          options={HORARIOS}
          multiple
          allowOther
          otherPlaceholder="Escribí tu horario (ej: 14 a 18 hs)"
          value={watch("horario")}
          onChange={setField("horario")}
        />
      </div>
    </div>
  );
};

/* ---------- BLOQUE COMPLETO: DESCRIPCIÓN ----------
   Usar dentro de un <SectionCard>. Campo: extendDescription. */
export const DescriptionField = ({ register, watch, setValue }) => (
  <>
    <div className="flex flex-wrap gap-2">
      {FRASES_RAPIDAS.map((frase) => (
        <button
          key={frase}
          type="button"
          onClick={() => {
            const actual = watch("extendDescription") || "";
            if (actual.includes(frase)) return;
            setValue(
              "extendDescription",
              actual ? `${actual.trim()} ${frase}.` : `${frase}.`,
              { shouldDirty: true },
            );
          }}
          className="rounded-lg border border-zinc-600 bg-black/20 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-purple-400 font-text"
        >
          + {frase}
        </button>
      ))}
    </div>
    <textarea
      className="text-zinc-300 bg-transparent border-2 border-purple-600 focus:border-white outline-none w-full text-sm xl:text-base rounded-lg p-3 transition-colors"
      {...register("extendDescription")}
      rows="5"
      placeholder="Tocá las frases de arriba o escribí lo que quieras..."
    />
  </>
);
