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
      className="relative flex flex-col items-center pt-32 w-full h-[100dvh] overflow-hidden lg:bg-zinc-300 lg:pt-[10%]"
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
        className="flex flex-col justify-center font-text items-center gap-3 z-50 py-6 px-3 w-[95%] rounded-3xl max-w-[550px] 2xl:max-w-[650px] lg:shadow-xl lg:shadow-gray-400"
      >
        <h6 className="text-4xl text-zinc-800 font-title font-semibold xl:text-5xl">
          Verificación de Edad
        </h6>
        <p className="text-zinc-700 text-sm text-center text-balance xl:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
          explicabo est quam, omnis tenetur repellendus.
        </p>
        <p className="text-lg text-stone-700 xl:text-xl">
          ¿Eres mayor de edad?
        </p>
        <div className="flex justify-evenly items-center gap-3 text-base mt-3 xl:text-lg">
          <button
            className="rounded-full px-6 border border-stone-600 text-primary bg-zinc-700"
            onClick={handleYes}
          >
            Sí, soy mayor.
          </button>
          <button
            className="rounded-full px-6 border border-stone-600 text-stone-800 "
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
