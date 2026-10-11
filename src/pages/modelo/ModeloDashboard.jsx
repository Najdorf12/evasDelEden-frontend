import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axiosRender";
import LocationSelector from "../../components/LocationSelector";
import imgLogo from "/0003.png";
import icon from "/icon14.png";
import CategorySelect from "../../components/CategorySelect";
import Modal from "../../components/Modal";
import StoriesManager from "../../components/StoriesManager";
import PaymentInfoModal from "../../components/PaymentInfoModal";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to right top, #426d89, #3f637a, #3c596b, #394f5d, #36454f, #344149, #333c43, #31383d, #31383d, #31383d, #31383d, #31383d)",
};

/* ---------- OPCIONES PREDEFINIDAS ---------- */
const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

const EDADES = range(18, 60);
const ALTURAS = range(145, 195); // cm
const PESOS = range(40, 120); // kg
const BUSTO = range(70, 130);
const CINTURA = range(50, 100);
const CADERA = range(80, 140);

// Editá esta lista con los servicios reales de tu plataforma
const SERVICIOS = [
  "Acompañamiento",
  "Salidas / Eventos",
  "Masajes",
  "Videollamadas",
  "Viajes",
  "Atiendo en mi domicilio",
  "Voy a hotel / domicilio",
];

const HORARIOS = ["Mañana", "Tarde", "Noche", "Madrugada"];

const FRASES_RAPIDAS = [
  "Simpática y atenta",
  "Trato amable y discreto",
  "Foto 100% real",
  "Atención personalizada",
  "Ambiente reservado y cómodo",
  "Puntualidad",
];

const OTRO_LABEL = "Otro / Prefiero especificar";

const FormInput = ({
  label,
  error,
  register,
  name,
  required,
  placeholder,
  ...rest
}) => (
  <div className="relative font-text">
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

const SectionCard = ({ title, subtitle, children }) => (
  <div className="relative bg-black/20 backdrop-blur-sm rounded-xl pt-6 pb-7 px-4 space-y-7 border border-purple-600 xl:p-7 bg-gradient-to-tl from-zinc-900 via-purple-950 to-zinc-900 z-10 has-[[aria-expanded=true]]:z-50">
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

const CustomSelect = ({
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
const MedidasSelector = ({ register, value, onChange }) => {
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
const OptionButtons = ({
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
    `rounded-lg border px-4 py-2 text-sm transition-colors ${
      selected
        ? "border-purple-400 bg-purple-700 text-zinc-300"
        : "border-zinc-600 bg-black/20 text-zinc-300 hover:border-purple-400"
    }`;

  return (
    <fieldset className="space-y-3 font-text">
      <legend className="mb-3 text-sm text-purple-200">{label}</legend>

      <div className="flex flex-wrap gap-2">
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
          className="h-10 w-full rounded-lg border border-purple-500 bg-transparent px-3 text-sm text-zinc-300 outline-none focus:border-purple-300"
        />
      )}
    </fieldset>
  );
};

const ModeloDashboard = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      detailLocation: { province: "Mendoza", region: "", city: "" },
    },
  });

  const [modelo, setModelo] = useState(null);
  const [myEva, setMyEva] = useState(null);
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modal, setModal] = useState({ open: false });
  const closeModal = () => setModal({ open: false });
  const showModal = (config) => setModal({ open: true, ...config });
  const [stories, setStories] = useState([]);
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    category: null,
  });
  const navigate = useNavigate();

  // Atajo para los selects/chips que se manejan con setValue
  const setField = (name) => (value) =>
    setValue(name, value, { shouldDirty: true });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const authResponse = await axios.get("/modelo-auth/verify");

        setModelo(authResponse.data);

        const evaResponse = await axios.get("/eva-modelo/me");

        const eva = evaResponse.data;

        setMyEva(eva);
        setStories(eva?.stories || []);

        if (eva) {
          reset({
            name: eva.name,
            wttp: eva.wttp,
            category: eva.category,
            detailLocation: eva.detailLocation || {
              province: "Mendoza",
              region: "",
              city: "",
            },
            edad: eva.description?.edad,
            altura: eva.description?.altura,
            peso: eva.description?.peso,
            medidas: eva.description?.medidas,
            depilacionDetalle: [
              "Completa",
              "Natural",
              "Otro / Prefiero especificar",
            ].includes(eva.description?.depilacion)
              ? ""
              : eva.description?.depilacion || "",
            depilacion: [
              "Completa",
              "Natural",
              "Otro / Prefiero especificar",
            ].includes(eva.description?.depilacion)
              ? eva.description?.depilacion
              : eva.description?.depilacion
                ? "Otro / Prefiero especificar"
                : "",
            servicio: eva.description?.servicio,
            horario: eva.description?.horario,
            extendDescription: eva.description?.extendDescription,
            isActive: eva.isActive,
          });

          setImages(eva.images || []);
          setVideos(eva.videos || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error cargando dashboard:", error);

        if (error.response?.status === 401) {
          navigate("/modelo/login");
        }
      }
    };

    loadDashboard();
  }, [navigate, reset]);

  const logout = () => {
    axios
      .post("/modelo-auth/logout")
      .then(() => navigate("/modelo/login"))
      .catch((error) => console.error(error));
  };

  const formatUrl = (url) => {
    if (!url) return "";
    const newUrl = url.replace(
      "https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket",
      "https://media.evasdeleden.com",
    );
    return newUrl.includes("media.evasdeleden.com") ? newUrl : "";
  };

  async function handleImage(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("image", files[0]);
    try {
      const response = await axios.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert(error.response?.data?.message || "Error al subir la imagen");
    } finally {
      setLoadingImage(false);
      e.target.value = "";
    }
  }
  const handleSetCoverImage = async (img) => {
    if (images[0]?.public_id === img.public_id) return; // ya es portada
    try {
      const response = await axios.patch("/eva-modelo/cover-image", {
        public_id: img.public_id,
      });
      setImages(response.data.images);
      setMyEva(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al fijar la portada");
    }
  };
  const handleDeleteImage = async (img) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;
    try {
      const response = await axios.delete("/eva-modelo/image", {
        params: { public_id: img.public_id },
      });
      setImages(response.data.images);
      setMyEva(response.data);
    } catch (error) {
      console.error(error);
      alert(
        (
          <div className="bg-red-600 w-full h-full absolute inset-0 z-10000">
            BIEN
          </div>
        ) || (
          <div className="bg-red-600 w-full h-full absolute inset-0 z-10000">
            ERROR
          </div>
        ),
      );
    }
  };

  async function handleVideo(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoadingVideo(true);
    const formData = new FormData();
    formData.append("video", files[0]);
    try {
      const response = await axios.post("/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error subiendo video:", error);
      alert("Error al subir el video");
    } finally {
      setLoadingVideo(false);
      e.target.value = "";
    }
  }

  const handleDeleteVideo = async (video) => {
    if (!window.confirm("¿Eliminar este video?")) return;
    try {
      const response = await axios.delete("/eva-modelo/video", {
        params: { public_id: video.public_id },
      });
      setVideos(response.data.videos);
      setMyEva(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al eliminar el video");
    }
  };

  const submit = async (data) => {
    setSaving(true);
    const wasApproved = myEva?.status === "approved";
    const isNewProfile = !myEva;

    const evaData = {
      name: data.name,
      wttp: data.wttp,
      category: data.category,
      detailLocation: data.detailLocation,
      isActive: data.isActive,
      description: {
        edad: data.edad,
        altura: data.altura,
        peso: data.peso,
        medidas: data.medidas,
        depilacion:
          data.depilacion === "Otro / Prefiero especificar"
            ? data.depilacionDetalle || data.depilacion
            : data.depilacion,
        servicio: data.servicio,
        horario: data.horario,
        extendDescription: data.extendDescription,
      },
      images,
      videos,
    };

    try {
      const response = myEva
        ? await axios.put("/eva-modelo", evaData)
        : await axios.post("/eva-modelo", evaData);
      setMyEva(response.data);
      showModal({
        type: "success",
        title: myEva ? "Perfil actualizado" : "Perfil creado",
        message: !myEva
          ? "Un admin lo va a revisar antes de publicarlo."
          : wasApproved
            ? "Los cambios se guardaron y ya están publicados."
            : "Los cambios se guardaron y ya están publicados.",
        confirmLabel: "Listo",
      });
      if (isNewProfile) {
        setPaymentModal({
          open: true,
          category: data.category,
          context: "perfil",
        });
      }
    } catch (error) {
      console.error(error);
      showModal({
        type: "error",
        title: "No se pudo guardar",
        message:
          error.response?.data?.message ||
          "Intentá nuevamente en unos segundos.",
        confirmLabel: "Entendido",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = () => {
    showModal({
      type: "confirm",
      title: "¿Eliminar tu perfil?",
      message:
        "Se van a borrar todas tus fotos y videos. Esta acción no se puede deshacer.",
      confirmLabel: "Sí, eliminar",
      cancelLabel: "Cancelar",
      onConfirm: async () => {
        closeModal();
        setDeleting(true);
        try {
          await axios.delete("/eva-modelo");
          setMyEva(null);
          setImages([]);
          setVideos([]);
          reset({
            name: "",
            wttp: "",
            category: "",
            detailLocation: { province: "Mendoza", region: "", city: "" },
            edad: "",
            altura: "",
            peso: "",
            medidas: "",
            depilacion: "",
            servicio: "",
            horario: "",
            extendDescription: "",
            isActive: true,
          });
          showModal({
            type: "success",
            title: "Perfil eliminado",
            confirmLabel: "Listo",
          });
        } catch (error) {
          console.error(error);
          showModal({
            type: "error",
            title: "No se pudo eliminar",
            message: "Intentá nuevamente en unos segundos.",
            confirmLabel: "Entendido",
          });
        } finally {
          setDeleting(false);
        }
      },
    });
  };
  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900">
        <p className="text-zinc-300 font-text animate-pulse">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-gradient-to-r  from-zinc-900 via-purple-950 to-zinc-900 min-h-screen flex flex-col items-center pb-32">
      <nav className="font-text text-base relative flex justify-between items-center w-full mt-2 px-1 xl:mt-3 xl:px-12 2xl:text-lg">
        <picture className="flex items-center justify-center w-[120px] lg:w-[180px] 2xl:w-[180px]">
          <img src={imgLogo} alt="logo" />
        </picture>
        <div className="flex items-center justify-center gap-3 pt-0 pr-2 lg:gap-6 ">
          <Link to={"/"}>
            <button
              className="w-full font-text py-1.5 px-6 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-zinc-300 text-xs transition duration-200  lg:px-10 lg:text-base 3xl:text-lg"
              style={{
                boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
              }}
            >
              Inicio
            </button>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-1 font-text pl-2 pr-5 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-zinc-300 text-xs transition duration-200 lg:px-10 lg:text-base 3xl:text-lg"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            <i className="bx bxs-arrow-from-left  cursor-pointer text-purple-600 hover:scale-110 hover:text-gray-100 duration-300 text-xl"></i>{" "}
            Cerrar sesión
          </button>
        </div>
      </nav>

      <section className="mt-9 w-full flex flex-col items-center px-3 gap-8 xl:mt-2 xl:gap-10">
        <article className="self-start lg:text-center lg:self-center">
          <div className="text-zinc-300 text-4xl font-title lg:text-6xl">
            Panel de Control
          </div>
          <p className="text-zinc-400 mt-1 lg:text-xl lg:mt-3">
            Crea, edita y organiza el contenido de forma sencilla
          </p>
        </article>
        {/* ---------- FORMULARIO ---------- */}
        <section className="relative max-w-md w-full rounded-2xl shadow-2xl border-y  border-purple-600 shadow-black overflow-hidden pt-12 pb-9 px-3 space-y-8 md:max-w-[700px] lg:max-w-[850px] xl:max-w-[1100px] xl:px-8">
          <div className="text-center ">
            <h6 className="font-title text-4xl font-bold text-zinc-100 xl:text-6xl">
              <img
                src={icon}
                alt="icon"
                className="w-12 absolute top-3 right-3"
              />
              <img
                src={icon}
                alt="icon"
                className="w-12 absolute top-3 left-3"
              />
              Hola, {modelo?.username}
            </h6>
            {myEva && (
              <div
                className={`inline-flex items-center gap-2 mt-4 text-sm font-text font-semibold px-3 py-1 rounded-full ${
                  myEva.status === "approved"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    myEva.status === "approved"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                />

                {myEva.status === "approved"
                  ? "Tu perfil está aprobado"
                  : "Pendiente de aprobación"}
              </div>
            )}
            <div className="text-zinc-400 text-xs mt-6 text-balance px-1 leading-5 lg:text-base">
              Desde esta sección podés editar tu información, actualizar tus
              datos y elegir el plan que mejor se adapte a vos. Cuando termines,
              pulsá el botón *Guardar Cambios* al final del formulario para
              confirmar la actualización
            </div>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <SectionCard
              title="Datos básicos"
              subtitle="Cómo te van a encontrar y contactar"
            >
              <div className="grid gap-6 xl:grid-cols-2">
                <FormInput
                  label="Nombre"
                  name="name"
                  register={register}
                  error={errors.name}
                  required
                />
                <FormInput
                  label="Whatsapp"
                  name="wttp"
                  register={register}
                  error={errors.wttp}
                  required
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Ubicación"
              subtitle="Dónde te van a poder buscar los clientes"
            >
              <LocationSelector
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
            </SectionCard>

            <SectionCard
              title="Datos físicos"
              subtitle="Opcional, pero ayuda a que te encuentren"
            >
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
                <MedidasSelector
                  register={register}
                  value={watch("medidas")}
                  onChange={setField("medidas")}
                />

                {/* Depilación */}
                <div className="space-y-3">
                  <OptionButtons
                    label="Depilación"
                    options={[
                      "Completa",
                      "Natural",
                      "Otro / Prefiero especificar",
                    ]}
                    value={watch("depilacion")}
                    onChange={(value) =>
                      setValue("depilacion", value, { shouldDirty: true })
                    }
                  />

                  {watch("depilacion") === "Otro / Prefiero especificar" && (
                    <input
                      {...register("depilacionDetalle")}
                      placeholder="Especificá tu preferencia..."
                      className="h-10 w-full rounded-lg border border-purple-500 bg-transparent px-3 text-zinc-300 outline-none focus:border-purple-300"
                    />
                  )}
                </div>

                {/* Servicio: chips de selección múltiple + "Otro" */}
                <OptionButtons
                  label="¿Qué servicios ofrecés? (podés elegir varios)"
                  options={SERVICIOS}
                  multiple
                  allowOther
                  otherPlaceholder="Escribí tu servicio..."
                  value={watch("servicio")}
                  onChange={setField("servicio")}
                />

                {/* Horario: selección múltiple + "Otro" */}
                <OptionButtons
                  label="¿En qué horarios estás disponible? (podés elegir varios)"
                  options={HORARIOS}
                  multiple
                  allowOther
                  otherPlaceholder="Escribí tu horario (ej: 14 a 18 hs)"
                  value={watch("horario")}
                  onChange={setField("horario")}
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Descripción"
              subtitle="Contales un poco más sobre vos"
            >
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
            </SectionCard>

            <SectionCard
              title="Imágenes"
              subtitle="La primera impresión. Subí tus mejores fotos"
            >
              <div className="flex flex-col items-center gap-6">
                <input
                  id="imageUpload"
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={handleImage}
                  className="hidden"
                  disabled={loadingImage}
                />
                <label
                  htmlFor="imageUpload"
                  className="rounded-lg w-full max-w-[320px] -mt-2 py-3 px-8 border border-purple-500 text-zinc-300 text-sm text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-text hover:bg-purple-900 lg:self-start"
                >
                  {loadingImage ? "Subiendo..." : "+ Agregar imagen"}
                </label>
                {images?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-6 mt-5 xl:gap-4">
                    {images.map((img, index) => (
                      <div key={img?.public_id} className="relative group">
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img)}
                          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-md font-semibold text-zinc-300 bg-red-600 hover:bg-red-500 text-xs shadow-md z-10"
                        >
                          ×
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(img)}
                          title={
                            index === 0 ? "Portada actual" : "Usar como portada"
                          }
                          className={`absolute -top-2 -left-2 w-9 h-9 flex items-center justify-center rounded-full text-base shadow-md z-10 transition-colors ${
                            index === 0
                              ? "bg-amber-400 text-zinc-900 border border-white"
                              : "text-zinc-900 border border-white"
                          }`}
                        >
                          ★
                        </button>
                        <img
                          className={`w-32 h-44 object-cover rounded-lg xl:w-40 xl:h-56 border-[2px] ${
                            index === 0
                              ? "border-amber-400 "
                              : "border-purple-600"
                          }`}
                          src={formatUrl(img?.secure_url)}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-zinc-500 text-sm">
                Solo las fotos GUARDADAS pueden ser seleccionadas como la
                principal del Perfil / Portada
              </div>
            </SectionCard>

            <SectionCard title="Videos" subtitle="Opcional">
              <div className="flex flex-col items-center gap-4">
                <input
                  id="videoUpload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideo}
                  className="hidden"
                  disabled={loadingVideo}
                />
                <label
                  htmlFor="videoUpload"
                  className="rounded-lg w-full max-w-[320px] py-3 px-8 border border-purple-500 text-zinc-300 text-sm text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-text hover:bg-purple-900 lg:self-start -mt-2"
                >
                  {loadingVideo ? "Subiendo..." : "+ Agregar video"}
                </label>
                {videos?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 mt-5 xl:gap-4">
                    {videos.map((video) => (
                      <div key={video?.public_id} className="relative group">
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(video)}
                          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-md font-semibold text-zinc-300 bg-red-600 hover:bg-red-500 text-xs shadow-md z-10"
                        >
                          x
                        </button>
                        <video
                          className="w-32 h-44 object-cover rounded-lg xl:w-40 xl:h-56 border-[2px] border-purple-600"
                          src={formatUrl(video?.secure_url)}
                          controls
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SectionCard>
            <SectionCard
              title="Historias"
              subtitle="Se muestran 24hs y luego se borran solas"
            >
              <StoriesManager
                stories={stories}
                setStories={setStories}
                formatUrl={formatUrl}
                onFirstStory={() =>
                  setPaymentModal({ open: true, category: myEva?.category })
                }
              />
            </SectionCard>
            <SectionCard
              title="Categoría"
              subtitle="Elegí el plan que mejor se adapte a vos"
            >
              <CategorySelect
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.category}
              />
            </SectionCard>
            <div className="flex items-center justify-center pt-2">
              <button
                disabled={saving}
                className="w-full font-text py-2 px-4 border-[1px] border-purple-500  rounded-md shadow-lg text-purple-200 font-semibold transition duration-200 lg:py-4 hover:bg-purple-900"
                type="submit"
                style={{
                  boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                }}
              >
                {saving
                  ? "Guardando..."
                  : myEva
                    ? "Guardar Cambios"
                    : "Crear perfil"}
              </button>
            </div>
          </form>
          <Modal
            open={modal.open}
            onClose={closeModal}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            confirmLabel={modal.confirmLabel}
            cancelLabel={modal.cancelLabel}
            onConfirm={modal.onConfirm}
          />
        </section>

        {/* ---------- RESUMEN / MI PERFIL ---------- */}
        {myEva && (
          <section className="relative max-w-md mt-9 w-full rounded-2xl bg-gradient-to-tr border border-purple-500 from-zinc-900 via-purple-950 to-zinc-900 overflow-hidden pt-3 pb-6 px-4 space-y-6 xl:max-w-[900px] xl:px-8 text-balance">
            <img
              src={icon}
              alt="icon"
              className="w-12 absolute right-4 top-4"
            />

            <h6 className="font-title text-3xl text-zinc-300 text-start xl:text-4xl">
              Tu perfil publicado
            </h6>
            <p className="text-zinc-400 text-xs lg:text-base font-text pl-1">
              Para editar tus datos, fotos o videos usá el formulario de arriba.
              Se guarda todo junto al pulsar "Guardar Cambios".
            </p>
            <div className="bg-black/20 border border-purple-600 backdrop-blur-sm rounded-xl p-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6">
              {images[0]?.secure_url ? (
                <img
                  src={formatUrl(images[0].secure_url)}
                  alt=""
                  className="w-full max-h-72 object-cover rounded-lg xl:w-40 xl:h-40 xl:shrink-0 border border-purple-600"
                />
              ) : (
                <div className="w-full h-48 xl:w-40 xl:h-40 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 text-sm font-text xl:shrink-0">
                  Sin foto
                </div>
              )}

              <div className="font-text text-zinc-300 space-y-2 mt-2 flex-1">
                <p className="text-zinc-200 text-3xl font-title lg:text-4xl">
                  {myEva.name}
                </p>
                <p className="text-sm  lg:text-base">
                  {[
                    myEva.detailLocation?.city,
                    myEva.detailLocation?.region,
                    myEva.detailLocation?.province,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p className="text-sm lg:text-base">
                  Categoría:{" "}
                  <span className="text-purple-600 ">{myEva.category}</span>
                </p>
                <p className="text-sm lg:text-base">
                  {images.length} {images.length === 1 ? "imagen" : "imágenes"}{" "}
                  · {videos.length} {videos.length === 1 ? "video" : "videos"}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center pt-2 gap-3">
              <Link to={`/${myEva?.name}/${myEva?._id}`}>
                <div
                  /*   onClick={handleDeleteProfile}
                disabled={deleting} */
                  className="font-text text-xs border border-purple-800 px-6 py-2 text-purple-600 hover:bg-purple-900 hover:text-zinc-100 rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  <i className="bx bxs-arrow-from-left  cursor-pointer text-purple-600 hover:scale-110 hover:text-gray-100 duration-300 text-xl"></i>
                  Ir a mi Perfil
                </div>
              </Link>
              <button
                onClick={handleDeleteProfile}
                disabled={deleting}
                className="font-text text-xs border border-red-600 px-6 py-2 text-red-600 hover:text-red-300 rounded-lg disabled:opacity-50 flex items-center gap-2"
              >
                <i className="bx bxs-trash-alt  cursor-pointer text-red-600 hover:scale-110 hover:text-gray-100 duration-300 text-xl"></i>
                {deleting ? "Eliminando..." : "Eliminar mi perfil por completo"}
              </button>
            </div>
          </section>
        )}
        <div className="text-zinc-500 mt-16 px-4 text-sm border p-6 border-zinc-600 rounded-lg max-w-[900px] lg:text-base lg:p-9">
          Desde esta sección podés editar tu información, actualizar tus datos y
          elegir el plan que mejor se adapte a vos. Revisá que toda la
          información esté correcta y que tus preferencias estén actualizadas
          para que tu perfil represente lo que querés mostrar. Cuando termines,
          pulsá el botón *Guardar Cambios* al final del formulario para
          confirmar la actualización. Una vez guardados, los cambios se verán
          reflejados en tu perfil de la página principal. <br />
          <span className="text-zinc-300">
            ¡Mantené tu perfil actualizado para ofrecer la mejor experiencia a
            quienes te visitan!
          </span>
        </div>
        <PaymentInfoModal
          open={paymentModal.open}
          category={paymentModal.category}
          context={paymentModal.context}
          onClose={() =>
            setPaymentModal({ open: false, category: null, context: "perfil" })
          }
        />
      </section>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-400"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </section>
  );
};

export default ModeloDashboard;
