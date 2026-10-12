/* Ubicación sugerida: src/components/AuthField.jsx
   Input con label flotante, mismo estilo que el login. */
const AuthField = ({
  id,
  label,
  type = "text",
  register,
  name,
  rules,
  error,
  autoComplete = "off",
}) => (
  <div className="relative font-text">
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      placeholder={label}
      className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
      {...register(name, rules)}
    />
    <label
      htmlFor={id}
      className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
    >
      {label}
    </label>
    {error && (
      <p className="mt-1 text-sm font-semibold text-[#da8e88]">
        {error.message}
      </p>
    )}
  </div>
);

export default AuthField;
