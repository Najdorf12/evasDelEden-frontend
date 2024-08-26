import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import NavbarAdmin from "../../components/NavbarAdmin";
import Footer from "../../components/Footer";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [registerError, setRegisterError] = useState([]);

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
    <section
      style={{
        backgroundImage:
          "linear-gradient(to right top, #242427, #2b2a30, #33303a, #3c3542, #463b4b, #554255, #65495e, #765066, #905a6f, #aa6575, #c37278, #da8078)",
      }}
      className=" h-screen w-full flex flex-col px-4 gap-14 items-center xl:px-10 2xl:gap-20 2xl:px-12"
    >
      <NavbarAdmin />
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right top, #242427, #2b2a30, #33303a, #3c3542, #463b4b, #554255, #65495e, #765066, #905a6f, #aa6575, #c37278, #da8078)",
        }}
        className="max-w-md w-full  rounded-xl shadow-2xl shadow-gray-900 overflow-hidden py-8 px-4 space-y-8"
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
            className="w-full font-text  py-2 px-4 border-[1px] border-slate-300 hover:bg-gray-300 rounded-md shadow-lg text-white font-semibold transition duration-200 hover:text-gray-600"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-100 font-text">
          Do you have an account?
          <Link className="text-[#da8e88] ml-1 hover:underline" to="/login">
            {" "}
            Login
          </Link>
        </div>
      </div>
      <div className="absolute bottom-2">
        <Footer />
      </div>
    </section>
  );
};

export default Register;
