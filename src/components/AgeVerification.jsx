// src/components/AgeVerification.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import imgBg from "../assets/bg/bg1.jpg";

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
    <section className="relative flex flex-col items-center pt-32 w-full h-screen overflow-hidden">
      
      <section id="verification" className="w-full h-screen absolute inset-0 ">
      </section>
        <article id="box-glass" className="flex flex-col justify-center font-text items-center gap-3 z-50 py-6 px-3 w-[95%] rounded-3xl">
          <h6 className="text-2xl text-stone-700">Verificación de Edad</h6>
          <p className="text-white text-sm text-center text-balance">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
            explicabo est quam, omnis tenetur repellendus.
          </p>
          <p className="text-lg text-stone-700">¿Eres mayor de edad?</p>
          <div className="flex justify-evenly items-center gap-3 text-base mt-3">
            <button
              className="rounded-full px-6 border border-stone-600 text-white bg-zinc-700"
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
        <footer className="absolute bottom-1">
          <Footer />
        </footer>
    </section>
  );
};

export default AgeVerification;
