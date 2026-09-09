const iconByType = {
  success: "bx bxs-check-circle text-green-400",
  error: "bx bxs-error-circle text-red-400",
  confirm: "bx bxs-error text-yellow-400",
};

const Modal = ({
  open,
  onClose,
  title,
  message,
  type = "success",
  confirmLabel = "Aceptar",
  cancelLabel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed top-0 inset-0 w-full h-full  z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-purple-600 bg-gradient-to-tl from-zinc-900 via-purple-950 to-zinc-900 p-6 space-y-5 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <i className={`${iconByType[type]} text-5xl`}></i>
          <h3 className="font-title text-2xl text-white">{title}</h3>
          {message && <p className="text-zinc-300 text-sm font-text">{message}</p>}
        </div>

        <div className="flex gap-3">
          {cancelLabel && (
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-md border border-zinc-500 text-zinc-300 font-text text-sm hover:bg-white/5 transition-colors"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm || onClose}
            className={`flex-1 py-2 rounded-md font-text text-sm font-semibold transition-colors ${
              type === "confirm" || type === "error"
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;