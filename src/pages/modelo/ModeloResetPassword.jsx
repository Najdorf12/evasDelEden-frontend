import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "../../api/axiosVercel";
import imgLogo from "/0003.png";
import icon from "/icon14.png";
import icon2 from "/icon13.png";
import PageLoader from "../../components/PageLoader";
import usePageLoader from "../../hooks/usePageLoader";
import AuthField from "../../components/AuthField";

const ModeloResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const showLoader = usePageLoader(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [apiErrors, setApiErrors] = useState([]);

  // Al terminar, vuelve al login automáticamente
  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => navigate("/modelo/login"), 3500);
    return () => clearTimeout(timer);
  }, [done, navigate]);

  const submit = async (formData) => {
    setSaving(true);
    setApiErrors([]);
    try {
      await axios.post(`/modelo-auth/reset-password/${token}`, {
        password: formData.password,
      });
      setDone(true);
    } catch (error) {
      const responseData = error.response?.data;
      setApiErrors(
        Array.isArray(responseData)
          ? responseData
          : ["No pudimos actualizar la contraseña. Intentá nuevamente."],
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="h-screen w-full flex flex-col items-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900">
      <PageLoader show={showLoader} />
      <nav className="absolute top-0 font-text2 text-lg px-3 flex justify-between items-center w-full xl:px-6 xl:mt-3 xl:text-xl">
        <picture className="flex items-center justify-center rounded-full w-[140px] lg:w-[150px] 2xl:w-[180px]">
          <img src={imgLogo} className="rounded-full" alt="logo" />
        </picture>
        <Link to={"/"}>
          <button
            className="w-full font-text py-1.5 px-9 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white transition duration-200 text-xs lg:px-10 md:text-base 3xl:text-lg"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Inicio
          </button>
        </Link>
      </nav>

      <div className="relative self-center mt-24 max-w-md w-[95%] rounded-xl shadow-2xl border-purple-600 border overflow-hidden py-8 px-4 flex flex-col gap-6 xl:max-w-lg bg-gradient-to-tr from-zinc-900 via-purple-950 to-zinc-900">
        <img src={icon2} alt="icon" className="w-12 absolute top-3 right-3" />
        <img src={icon2} alt="icon" className="w-12 absolute top-3 left-3" />
        <h5 className="text-center font-title text-5xl font-extrabold text-zinc-300 px-10">
          Nueva contraseña
        </h5>

        {done ? (
          <div className="font-text flex flex-col items-center gap-4 text-center">
            <p className="bg-green-500/10 text-green-400 text-sm font-semibold rounded-lg px-3 py-3">
              ¡Listo! Tu contraseña se actualizó correctamente.
            </p>
            <p className="text-zinc-400 text-sm">
              Te llevamos al inicio de sesión...
            </p>
            <Link
              to="/modelo/login"
              className="w-full font-text text-center py-2 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-md shadow-lg text-white font-semibold transition duration-200"
              style={{
                boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
              }}
            >
              Ingresar ahora
            </Link>
          </div>
        ) : (
          <>
            <p className="font-text text-center text-gray-200 text-sm">
              Elegí una contraseña nueva para tu cuenta.
            </p>

            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              <AuthField
                id="new-password"
                label="Contraseña nueva"
                type="password"
                name="password"
                register={register}
                autoComplete="new-password"
                error={errors.password}
                rules={{
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                }}
              />
              <AuthField
                id="confirm-password"
                label="Repetí la contraseña"
                type="password"
                name="confirmPassword"
                register={register}
                autoComplete="new-password"
                error={errors.confirmPassword}
                rules={{
                  required: {
                    value: true,
                    message: "Repetí la contraseña",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                }}
              />

              {apiErrors.length > 0 && (
                <div className="bg-red-400 text-white p-2 rounded-md font-text font-semibold text-sm text-center flex flex-col gap-2">
                  {apiErrors.map((message, i) => (
                    <p key={i}>{message}</p>
                  ))}
                  <Link
                    to="/modelo/forgot-password"
                    className="underline text-white"
                  >
                    Pedir un link nuevo
                  </Link>
                </div>
              )}

              <button
                disabled={saving}
                className="w-full font-text py-2 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-md shadow-lg text-white font-semibold transition duration-200 disabled:opacity-50"
                type="submit"
                style={{
                  boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                }}
              >
                {saving ? "Guardando..." : "Guardar contraseña"}
              </button>
            </form>
          </>
        )}
      </div>

      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-400"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
      <div className="absolute bottom-1 left-1 rotate-[90deg] z-100 w-16 h-16 lg:h-28 lg:w-28 lg:left-2 lg:bottom-0">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <div className="absolute bottom-1 right-1 z-100 w-16 h-16 lg:h-28 lg:w-28 lg:right-2 lg:bottom-0">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
    </section>
  );
};

export default ModeloResetPassword;
