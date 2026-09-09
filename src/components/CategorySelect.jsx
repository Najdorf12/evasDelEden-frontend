const categories = [
  {
    value: "Platinum",
    price: "$XX.XXX",
    tagline: "Máxima visibilidad",
    perks: ["Primer lugar en el listado", "Destacada en la home", "Sin límite de fotos"],
    accent: "border-teal-500 ring-teal-400",
    badge: "bg-teal-500/10 text-teal-400",
  },
  {
    value: "Gold",
    price: "$XX.XXX",
    tagline: "El más elegido",
    perks: ["Buena visibilidad", "Hasta 10 fotos", "Historias incluidas"],
    accent: "border-amber-500 ring-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
  },
  {
    value: "Silver",
    price: "$XX.XXX",
    tagline: "Para empezar",
    perks: ["Visibilidad estándar", "Hasta 5 fotos"],
    accent: "border-gray-400 ring-gray-300",
    badge: "bg-gray-400/10 text-gray-300",
  },
];

const CategorySelect = ({ register, watch, setValue, error }) => {
  const selected = watch("category");

  return (
    <div className="space-y-3">
      <input
        type="hidden"
        {...register("category", {
          required: { value: true, message: "Elegí una categoría para tu perfil" },
        })}
      />
      {error && <p className="text-red-400 text-xs font-text lg:text-base">{error.message}</p>}

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat) => {
          const isSelected = selected === cat.value;
          return (
            <button
              type="button"
              key={cat.value}
              onClick={() => setValue("category", cat.value, { shouldValidate: true })}
              className={`text-left rounded-xl p-3 border-2 transition-all font-text bg-black/20 ${
                isSelected
                  ? `${cat.accent} ring-2 bg-white/5`
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-title text-3xl text-white">{cat.value}</p>
                {isSelected && <i className="bx bxs-check-circle text-xl text-white"></i>}
              </div>
              <p className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 lg:text-sm ${cat.badge}`}>
                {cat.tagline}
              </p>
              <p className="text-white text-lg font-semibold mb-2">{cat.price}</p>
              <ul className="space-y-1">
                {cat.perks.map((perk) => (
                  <li key={perk} className="text-zinc-400 text-xs flex items-start gap-1 md:text-sm">
                    <i className="bx bx-check text-zinc-500 mt-0.5"></i>
                    {perk}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelect;