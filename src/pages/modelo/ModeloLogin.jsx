import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axiosRender";
import imgLogo from "/0003.png";
import icon from "/icon14.png";
import icon2 from "/icon13.png";
import PageLoader from "../../components/PageLoader";
import usePageLoader from "../../hooks/usePageLoader";

const ModeloLogin = () => {
  const [loginError, setLoginError] = useState([]);
  const showLoader = usePageLoader(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginError?.length > 0) {
      const timer = setTimeout(() => {
        setLoginError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

  useEffect(() => {
    axios.post("/modelo-auth/logout").catch((error) => console.error(error));
  }, []);

  const submit = (data) => {
    axios
      .post("/modelo-auth/login", data)
      .then(() => {
        navigate("/modelo/dashboard");
      })
      .catch((error) => {
        setLoginError(error.response?.data);
      });
  };

  return (
    <section className="h-screen w-full flex flex-col items-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900">
      <PageLoader show={showLoader} />
      <nav className="absolute top-0 font-text2 text-lg px-3  flex justify-between items-center w-full  xl:px-6 xl:mt-3 xl:text-xl">
        <picture className=" flex items-center justify-center rounded-full w-[140px] lg:w-[150px] 2xl:w-[180px]">
          <img src={imgLogo} className="rounded-full" alt="logo" />
        </picture>
        <Link to={"/"}>
          <button
            className="w-full font-text py-1.5 px-9 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white transition duration-200 text-xs  lg:px-10 md:text-base 3xl:text-lg"
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
        <h5 className="text-center font-title text-6xl font-extrabold text-zinc-300 3xl:text-7xl">
          Bienvenida
        </h5>
        {loginError?.map((error, i) => (
          <div
            key={i}
            className="absolute right-0 left-0 flex justify-center items-center top-[10rem] bg-red-400 text-white p-2 mr-1 rounded-md mt-12 font-semibold text-lg max-w-[300px]"
          >
            <p> {error} </p>
          </div>
        ))}
        <p className="font-text text-center text-gray-200">
          Ingresá a tu cuenta
        </p>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 lg:gap-9">
          <div className="relative font-text">
            <input
              autoComplete="off"
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              name="email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "El email es requerido",
                },
              })}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
              htmlFor="email"
            >
              Email
              <p className="error absolute left-32 -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                {errors.email?.message}
              </p>
            </label>
          </div>
          <div className="relative font-text">
            <input
              autoComplete="off"
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
              })}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm "
              htmlFor="password"
            >
              Contraseña
              <p className="error absolute left-32 -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                {errors.password?.message}
              </p>
            </label>
          </div>

          <button
            className="w-full font-text py-2 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-md shadow-lg text-white font-semibold transition duration-200 lg:text-lg "
            type="submit"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Ingresar
          </button>
        </form>
        <div className="text-center text-gray-300 font-text">
          ¿No tenés cuenta?
          <Link
            className="text-white ml-2 hover:underline"
            to="/modelo/register"
          >
            {" "}
            Registrate
          </Link>
          <Link
            to="/modelo/forgot-password"
            className="block text-xs mt-2 text-purple-400 hover:text-purple-300 hover:underline"
          >
            Olvidé mi contraseña
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
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

export default ModeloLogin;
