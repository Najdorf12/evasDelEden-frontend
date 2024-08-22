import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./login.css";

const Login = () => {
  const [loginError, setLoginError] = useState([]);

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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

  useEffect(() => {
    axios.post("/auth/logout").catch((error) => console.error(error));
  }, []);

  const submit = (data) => {
    axios
      .post("/auth/login", data)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        setLoginError(error.response?.data);
      });
  };

  return (
    <>
      <main className="bg-gray-300  h-screen w-full flex justify-center  relative px-5 sm:px-6 pt-[20%] lg:pt-[5%] 2xl:pt-[8%]">
        <Link to={"/"}>
          <button className="btn-home2 absolute top-6 right-6  text-gray-500 text-base font-normal border-[2px] rounded-[1rem] px-5 py-1 border-white  xl:px-8 2xl:text-lg 2xl:px-8  xl:font-semibold xl:top-8 xl:right-12">
            <span>Home</span>
          </button>
        </Link>
        <form
          onSubmit={handleSubmit(submit)}
          className="form  lg:w-[400px] 2xl:w-[550px] lg:gap-7 lg:px-8"
        >
          {loginError?.map((error, i) => (
            <div
              key={i}
              className="absolute bg-red-600 text-white text-base p-2 top-0 right-0 mr-1 rounded-md mt-12 lg:text-lg lg:-right-80"
            >
              <p> {error} </p>
            </div>
          ))}

          <p className="title">Iniciar Sesión </p>
          <p className="message text-gray-600">
            Signup now and get full access to our app.{" "}
          </p>
          <label className="relative">
            <input
              required=""
              placeholder=""
              type="email"
              className="input"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <span>Email</span>
            <p className="error absolute right-0 top-0 m-2 text-base font-semibold text-red-700 ">
              {" "}
              {errors.email?.message}{" "}
            </p>
          </label>

          <label className="relative">
            <input
              required=""
              placeholder=""
              type="password"
              className="input"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <span>Password</span>
            <p className="error absolute right-0 top-0 m-2 text-base font-semibold text-red-700 ">
              {" "}
              {errors.password?.message}{" "}
            </p>
          </label>
          <button type="submit" className="submit">
            Enviar
          </button>
          <p className="signin text-gray-600 font-semibold">
            Todavía no tienes una cuenta ?
            <Link to="/register"> Regístrate</Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;