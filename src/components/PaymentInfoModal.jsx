import { PAYMENT_INFO, getPriceForCategory } from "../config/payment";

const PaymentInfoModal = ({ open, category, context = "perfil", onClose }) => {
  if (!open) return null;
  const price = getPriceForCategory(category);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const subject =
    context === "historia"
      ? "tu historia"
      : category
        ? `tu plan ${category}`
        : "tu perfil";
  const adjective = context === "historia" ? "aprobada" : "aprobado";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 border-2 border-purple-600 rounded-2xl max-w-md w-full p-6 space-y-4 font-text">
        <h3 className="font-title text-2xl text-white text-center lg:text-3xl">
          Datos para el pago
        </h3>
        <p className="text-zinc-300 text-sm text-center lg:text-base lg:leading-6 text-balance">
          Para que {subject} sea {adjective}, hacé la transferencia por el
          monto correspondiente
        </p>

        {price && (
          <p className="text-center text-3xl font-title text-purple-400 lg:text-4xl">
            ${price.toLocaleString("es-AR")}
          </p>
        )}

        <div className="bg-black/30 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-zinc-500 text-xs md:text-base">Titular</p>
            <p className="text-white">{PAYMENT_INFO.titular}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-zinc-500 text-xs md:text-base">CVU</p>
              <p className="text-white break-all">{PAYMENT_INFO.cvu}</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(PAYMENT_INFO.cvu)}
              className="text-xs border border-purple-500 rounded px-2 py-1 text-purple-300 hover:bg-purple-900 shrink-0 lg:px-6 md:text-sm"
            >
              Copiar
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-zinc-500 text-xs md:text-base">Alias</p>
              <p className="text-white">{PAYMENT_INFO.alias}</p>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(PAYMENT_INFO.alias)}
              className="text-xs border border-purple-500 rounded px-2 py-1 text-purple-300 hover:bg-purple-900 shrink-0 lg:px-6 md:text-sm"
            >
              Copiar
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-xs text-center md:text-sm lg:text-base text-balance">
          Una vez confirmado el pago, un admin va a revisar y aprobar {subject}.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 rounded-md border border-purple-500 text-purple-200 hover:bg-purple-900 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default PaymentInfoModal;