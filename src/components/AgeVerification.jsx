// src/components/AgeVerification.js
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="w-full h-screen bg-zinc-800 flex flex-col items-center pt-24">
      <article className="flex flex-col justify-center items-center gap-3">
        <h6 className="text-xl text-zinc-500">Verificación de Edad</h6>
        <p className="text-zinc-700 text-sm text-center text-balance">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro explicabo est quam, omnis tenetur repellendus.</p>
        <p className="text-base text-zinc-600">¿Eres mayor de edad?</p>
        <div className="flex justify-evenly items-center gap-3 text-lg mt-3"> 
          <button className="rounded-full px-6 border border-stone-600 text-zinc-600" onClick={handleYes}>Sí, soy mayor.</button>
          <button className="rounded-full px-6 border border-stone-600 text-zinc-600" onClick={handleNo}>No, soy menor.</button>
        </div>
      </article>
    </section>
  );
};

export default AgeVerification;
