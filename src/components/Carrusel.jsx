import React, { useState, useEffect } from 'react'

const Carrusel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])


    return (
        <div className='overflow-hidden relative'>
            <div className='flex gap-3 transition-transform ease-out duration-500' style={{ transform: `translateX(-${curr * 200}px)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={prev} className='z-50 rounded-full   hover:text-primary'>
                <i className='bx bx-chevrons-left text-6xl text-stone-700' ></i>
                </button>
                <button onClick={next} className='z-50 rounded-full hover:text-primary'>
                <i className='bx bx-chevrons-right  text-6xl text-stone-700' ></i>
                </button>
            </div>
            
        </div>

    )
}

export default Carrusel

/* import imgWoman1 from "../assets/imgWoman1.jpg";
import imgWoman2 from "../assets/imgWoman2.jpg";
import imgWoman3 from "../assets/imgWoman3.jpg";
import imgWoman4 from "../assets/imgWoman4.jpg";
import imgWoman5 from "../assets/imgWoman5.jpg";

import CardEva from "./CardEva";
import { forwardRef, useEffect, useState } from "react";

const Carrusel = forwardRef((props, ref) => {
  const allEvasPlatinum = [
    { name: "Erica Martinez", location: "Mendoza", description: { edad: "38" }, image: imgWoman1 },
    { name: "Valentina Garcia", location: "Mendoza", description: { edad: "56" }, image: imgWoman2 },
    { name: "Florencia Gonzalez", location: "Mendoza", description: { edad: "28" }, image: imgWoman3 },
    { name: "Andrea Impsum", location: "Mendoza", description: { edad: "25" }, image: imgWoman4 },
    { name: "Aldog Impsum", location: "Mendoza", description: { edad: "32" }, image: imgWoman5 },
  ];

  const [maxScroll, setMaxScroll] = useState(0);

  // Calcular el ancho total del carrusel y el ancho visible
  useEffect(() => {
    if (ref.current) {
      const totalWidth = ref.current.scrollWidth; // Ancho total del carrusel
      const visibleWidth = ref.current.offsetWidth; // Ancho visible del contenedor
      setMaxScroll(totalWidth - visibleWidth); // Límite de desplazamiento
    }
  }, [ref]);

  return (
    <div ref={ref} className="flex items-center h-[95%] w-fit px-2 bg-red-500 absolute inset-0 gap-3">
      {allEvasPlatinum.map((evaPlatinum, i) => (
        <CardEva key={i} evaPlatinum={evaPlatinum} />
      ))}
    </div>
  );
});

export default Carrusel;
 */