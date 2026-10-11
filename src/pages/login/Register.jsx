import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axiosRender";
import imgLogo from "/0003.png";
import PageLoader from "../../components/PageLoader";
import usePageLoader from "../../hooks/usePageLoader";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [registerError, setRegisterError] = useState([]);
const showLoader = usePageLoader(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registerError?.length > 0) {
      const timer = setTimeout(() => {
        setRegisterError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registerError]);

  const submit = (data) => {
    axios
      .post("/auth/register", data)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        setRegisterError(error?.response?.data);
      });
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 ">
      <nav className="absolute top-0 font-text2 text-lg px-3  flex justify-between items-center w-full mt-1 xl:px-6 xl:mt-3 xl:text-xl">
        <picture className=" flex items-center justify-center rounded-full w-[140px] lg:w-[150px] 2xl:w-[180px]">
          <img src={imgLogo} className="rounded-full" alt="logo" />
        </picture>
        <Link to={"/"}>
          <button
            className="w-full font-text py-1.5 px-9 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white transition duration-200 text-sm  lg:px-10 md:text-base 3xl:text-lg"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Inicio
          </button>
        </Link>
      </nav>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right top, #426d89, #3f637a, #3c596b, #394f5d, #36454f, #344149, #333c43, #31383d, #31383d, #31383d, #31383d, #31383d)",
        }}
        className="max-w-md w-[95%]  rounded-xl shadow-2xl shadow-gray-900 overflow-hidden py-8 px-4 space-y-8"
      >
        {registerError?.map((error, i) => (
          <div
            key={i}
            className="absolute right-0 left-0 flex justify-center items-center top-[13rem] bg-red-400 text-white  p-2  mr-1 rounded-md mt-12 font-semibold text-lg max-w-[300px]"
          >
            <p> {error} </p>
          </div>
        ))}
        <h2 className="text-center font-title text-6xl font-extrabold text-white">
          Register
        </h2>
        <p className="text-center text-gray-200 font-text text-base">
          Create your account
        </p>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div className="relative font-text">
            <input
              autoComplete="off"
              placeholder="Joe Doe"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              name="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <label className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
              Username
              <p className="error absolute left-32  -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                {errors.username?.message}
              </p>
            </label>
          </div>
          <div className="relative font-text">
            <input
              autoComplete="off"
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white "
              required=""
              name="email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <label
              className="absolute left-0 -top-3.5  text-sm   transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
              htmlFor="email"
            >
              Email
              <p className="error absolute left-32  -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                {errors.email?.message}
              </p>
            </label>
          </div>
          <div className="relative font-text">
            <input
              autoComplete="off"
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
              required=""
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <label
              className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
              htmlFor="password"
            >
              Password
              <p className="error absolute left-32  -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                {errors.password?.message}
              </p>
            </label>
          </div>

          <button
            className="w-full font-text  py-2 px-4 border-[1px] border-slate-300 hover:bg-gray-300 rounded-md shadow-lg text-white font-semibold transition duration-200 "
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="text-center text-zinc-100 font-text">
          Ya tienes una cuenta?
          <Link className="text-purple-600 ml-1 hover:underline" to="/login">
            {" "}
            Ingresa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
