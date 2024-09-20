import imgWoman1 from "../assets/imgWoman1.jpg";
import imgWoman2 from "../assets/imgWoman2.jpg";
import imgWoman3 from "../assets/imgWoman3.jpg";
import imgWoman4 from "../assets/imgWoman4.jpg";
import imgWoman5 from "../assets/imgWoman5.jpg";

import CardEva from "./CardEva";
import { forwardRef } from "react";

const Carrusel = forwardRef((props, ref) => {
  const allEvasPlatinum = [
    {
      name: "Erica Martinez",
      location: "Mendoza",
      description: { edad: "38" },
      image: imgWoman1,
    },
    {
      name: "Valentina Garcia",
      location: "Mendoza",
      description: { edad: "56" },
      image: imgWoman2,
    },
    {
      name: "FLorencia Gonzalez",
      location: "Mendoza",
      description: { edad: "28" },
      image: imgWoman3,
    },
    {
      name: "Andrea Impsum",
      location: "Mendoza",
      description: { edad: "25" },
      image: imgWoman4,
    },
    {
      name: "Aldog Impsum",
      location: "Mendoza",
      description: { edad: "32" },
      image: imgWoman5,
    },
  ];

  return (
    <div
      ref={ref}
      className="flex items-center h-[95%] w-full pl-2 bg-red-500 absolute inset-0 gap-3"
    >
      {allEvasPlatinum.map((evaPlatinum, i) => (
        <CardEva key={i} evaPlatinum={evaPlatinum} />
      ))}
    </div>
  );
});

export default Carrusel;
