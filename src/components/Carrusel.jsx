import React, { useState, useEffect } from "react";

const Carrusel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="overflow-hidden relative">
        <div
          className="flex gap-3 transition-transform ease-out duration-500 xl:gap-4  "
          style={{ transform: `translateX(-${curr * 200}px)` }}
        >
          {slides}
        </div>
      </div>
      <div className="absolute flex items-center justify-between w-[90%] top-0 bottom-0  pointer-events-none  lg:w-full">
        <button
          onClick={prev}
          className="-ml-6 z-50 rounded-full pointer-events-auto hover:text-primary "
          aria-label="Ir al slide anterior"
        >
          <i className="bx bx-chevrons-left text-6xl text-white lg:text-7xl 2xl:text-8xl"></i>
        </button>
        <button
          onClick={next}
          className="z-50 -mr-6 rounded-full pointer-events-auto hover:text-primary lg:mr-12 xl:mr-16 2xl:mr-20"
          aria-label="Ir al slide siguiente"
        >
          <i className="bx bx-chevrons-right text-6xl text-white lg:text-7xl 2xl:text-8xl"></i>
        </button>
      </div>
    </>
  );
};

export default Carrusel;
