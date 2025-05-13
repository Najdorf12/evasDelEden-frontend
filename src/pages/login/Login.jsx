import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axiosRender";
import imgLogo from "/0003.png"

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
      }, 5000);
      return () => clearTimeout(timer);z
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
      <section
        style={{
          backgroundImage:
            "linear-gradient(to right top, #426d89, #3f637a, #3c596b, #394f5d, #36454f, #344149, #333c43, #31383d, #31383d, #31383d, #31383d, #31383d)",
        }}
        className="h-screen w-full flex flex-col gap-14 items-center 2xl:gap-24 "
      >
        <nav className="font-text2 text-lg px-3 relative flex justify-between items-center w-full mt-2 xl:px-6 xl:mt-3 xl:text-xl   ">
          <picture className=" flex items-center justify-center rounded-full w-[120px] lg:w-[150px] 2xl:w-[180px]  ">
            <img src={imgLogo} className="rounded-full" alt="logo" />
          </picture>
          <ul className="flex gap-6 xl:gap-10 2xl:gap-12">
            <li className="text-gray-50 border-l-2 pl-2 xl:pl-3 py-1 hover:scale-105 hover:text-white duration-500 ">
              <Link to={"/"}>Home </Link>
            </li>
          </ul>
        </nav>

        <div
          style={{
            backgroundImage:
              "linear-gradient(to right top, #426d89, #3f637a, #3c596b, #394f5d, #36454f, #344149, #333c43, #31383d, #31383d, #31383d, #31383d, #31383d)",
          }}
          className="max-w-md w-[95%] rounded-xl shadow-2xl shadow-gray-900 overflow-hidden py-8 px-4 space-y-8"
        >
          <h2 className="text-center font-title text-6xl font-extrabold text-white">
            Welcome
          </h2>
          {loginError?.map((error, i) => (
            <div
              key={i}
              className="absolute right-0 left-0 flex justify-center items-center top-[10rem] bg-red-400 text-white  p-2  mr-1 rounded-md mt-12 font-semibold text-lg max-w-[300px]"
            >
              <p> {error} </p>
            </div>
          ))}
          <p className="font-text text-center text-gray-200">
            Sign in to your account
          </p>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="relative font-text">
              <input
                autoComplete="off"
                placeholder="john@example.com"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
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
                className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
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
                className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                htmlFor="password"
              >
                Password
                <p className="error absolute left-32  -top-2 m-2 text-base font-semibold text-[#da8e88] w-64">
                  {errors.password?.message}
                </p>
              </label>
            </div>

            <button
              className="w-full font-text  py-2 px-4 border-[1px] border-slate-300 hover:bg-zinc-600 rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="text-center text-gray-300 font-text">
            Don't have an account?
            <Link className="text-white ml-2 hover:underline" to="/register">
              {" "}
              Register
            </Link>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Login;
