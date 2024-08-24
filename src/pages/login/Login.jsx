import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

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
      <section
        style={{
          backgroundImage:
            "linear-gradient(to right top, #242427, #2b2a30, #33303a, #3c3542, #463b4b, #554255, #65495e, #765066, #905a6f, #aa6575, #c37278, #da8078)",
        }}
        className=" h-screen w-full flex flex-col px-4 gap-14 items-center"
      >
        <Navbar />
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right top, #242427, #2b2a30, #33303a, #3c3542, #463b4b, #554255, #65495e, #765066, #905a6f, #aa6575, #c37278, #da8078)",
          }}
          className="max-w-md w-full  rounded-xl shadow-2xl shadow-gray-900 overflow-hidden py-8 px-4 space-y-8"
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
          <p className="font-text text-center text-gray-200">Sign in to your account</p>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="relative font-text">
              <input
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
            <Link className="text-[#da8e88] ml-2 hover:underline" to="/register">
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

{
  /*
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
</main> */
}
