// src/components/AgeVerification.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import imgLogo from "../assets/logo-removebg.png";
const AgeVerification = ({ onConfirm }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    onConfirm();
    navigate("/");
  };

  const handleNo = () => {
    alert("Lo siento, debes ser mayor de edad para acceder al sitio.");
    // Puedes redirigir a otra página o realizar otra acción aquí
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(to left, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
      }}
      className="relative flex flex-col items-center pt-28 w-full h-[100dvh] overflow-hidden lg:bg-zinc-300 lg:pt-[10%]"
    >
      <nav className="absolute top-2 left-2 z-50  lg:w-full lg:flex lg:justify-end  lg:top-3 ">
        <div className=" lg:lg:mr-[3%] flex justify-center items-center">
          <img
            src={imgLogo}
            className="w-16 lg:w-28 2xl:w-28 "
            alt="logo"
          />
        </div>
      </nav>
      <section
        id="verification"
        className="w-full h-screen absolute inset-0 "
      ></section>
      <article
        id="box-glass"
        className="flex flex-col justify-center font-text items-center gap-2 z-50 py-6 px-2 w-[95%] rounded-3xl max-w-[650px] 2xl:max-w-[750px] lg:gap-4 shadow-xl shadow-zinc-700 lg:shadow-xl lg:shadow-gray-400"
      >
        <h6 className="text-[2.70rem] text-zinc-800 font-title font-semibold lg:text-5xl xl:text-6xl">
          Verificación de Edad
        </h6>
        <p className="text-stone-700 text-sm text-center text-balance lg:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
          explicabo est quam, omnis tenetur repellendus.
        </p>
        <p className="text-lg font-text mt-3 font-medium text-stone-700 lg:text-xl 2xl:text-2xl">
          ¿Eres mayor de edad?
        </p>
        <div className="flex justify-evenly items-center gap-4 font-text font-medium text-base mt-3 lg:text-lg xl:text-xl lg:gap-6 2xl:gap-10 2xl:text-xl">
          <button
            className="rounded-full px-6 border border-stone-600 lg:px-7 text-primary bg-zinc-700 shadow-lg shadow-zinc-900"
            onClick={handleYes}
          >
            Sí, soy mayor.
          </button>
          <button
            className="rounded-full px-6 border border-stone-600 lg:px-7 text-stone-800 shadow-lg shadow-zinc-900 "
            onClick={handleNo}
          >
            No, soy menor.
          </button>
        </div>
      </article>
      <footer className="absolute bottom-0 text-white font-medium lg:text-zinc-500">
        <Footer />
      </footer>
    </section>
  );
};

export default AgeVerification;
