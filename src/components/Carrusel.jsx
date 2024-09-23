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
          className="flex gap-3 transition-transform ease-out duration-500 "
          style={{ transform: `translateX(-${curr * 200}px)` }}
        >
          {slides}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center gap-[70%] w-full  md:gap-[90%] md:px-[3%]">
        <button
          onClick={prev}
          className="z-50 rounded-full   hover:text-primary"
        >
          <i className="bx bx-chevrons-left text-6xl text-white lg:text-7xl"></i>
        </button>
        <button onClick={next} className="z-50 rounded-full hover:text-primary">
          <i className="bx bx-chevrons-right  text-6xl text-white lg:text-7xl"></i>
        </button>
      </div>
    </>
  );
};

export default Carrusel;
