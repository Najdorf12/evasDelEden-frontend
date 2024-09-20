import { useEffect, useState } from "react";
import imgLogo from "../assets/logo-removebg.png";
import Carrusel from "../components/Carrusel";
import Footer from "../components/Footer";
import imgWoman1 from "../assets/imgWoman1.jpg";
import imgWoman2 from "../assets/imgWoman2.jpg";
import imgWoman3 from "../assets/imgWoman3.jpg";
import imgWoman4 from "../assets/imgWoman4.jpg";
import imgWoman5 from "../assets/imgWoman5.jpg";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);

const Home = ({ allEvas }) => {
  const categories = ["Todas", "Platinum", "Gold", "Silver"];
  const locations = ["Mendoza", "Córdoba", "Santa Fe", "Buenos Aires"];

  const [selectedMenu, setSelectedMenu] = useState("Categorias");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLocation, setSelectedLocation] = useState("Mendoza");

  const slides = [
    imgWoman1,
    imgWoman2,
    imgWoman3,
    imgWoman4,
    imgWoman5,
  ]
  return (
    <main className="bg-zinc-800 relative overflow-hidden min-h-[100dvh]">
      <section className="w-full flex flex-col items-center">
        <nav className="w-full flex justify-between items-center pr-1 mt-2">
          <div>
            <img src={imgLogo} alt="logo" className="w-14" />
          </div>
          <button className="pl-3 text-base border-l-[3px] border-zinc-600 font-text2 text-whiteCustom">
            Contacto
          </button>
        </nav>

        <article className="self-start pl-3 flex flex-col items-start mt-4">
          <h2 className="font-title text-zinc-700 text-7xl">Evas del Eden</h2>
          <h3 className="text-whiteCustom text-2xl font-text2">
            Escorts - Mendoza
          </h3>
        </article>

        <ul className="flex gap-6 text-base font-text2 text-zinc-500 mt-6 self-start">
          <li className="relative flex flex-col justify-start items-start">
            <div
              onClick={(e) => {
                setSelectedMenu("Categorias");
              }}
              className={`relative flex items-center ml-8 cursor-pointer ${
                selectedMenu === "Categorias"
                  ? "text-whiteCustom"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-doughnut-chart text-lg absolute text-primary -left-6 ${
                  selectedMenu === "Categorias"
                    ? "text-primary"
                    : "text-zinc-500"
                }`}
              ></i>
              Categorias
            </div>
          </li>
          <li className="relative flex flex-col justify-start items-start">
            <div
              onClick={() => setSelectedMenu("Ubicacion")}
              className={`relative  flex items-center ml-8 cursor-pointer ${
                selectedMenu === "Ubicacion"
                  ? "text-whiteCustom"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-map text-lg absolute text-primary -left-6 ${
                  selectedMenu === "Ubicacion"
                    ? "text-primary"
                    : "text-zinc-500"
                }`}
              ></i>
              Ubicacion
            </div>
          </li>
        </ul>
        {selectedMenu === "Categorias" ? (
          <div className="flex gap-4 w-full pl-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={` mt-3 rounded-full px-4 py-[1px] text-sm ${
                  selectedCategory === category
                    ? "bg-zinc-700 text-primary"
                    : "border border-zinc-700 text-zinc-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 w-full pl-3">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={` mt-3 rounded-full px-[10px] py-[1px] text-sm ${
                  selectedLocation === location
                    ? "bg-zinc-700 text-primary"
                    : "border border-zinc-700 text-zinc-500"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="bg-teal-500 py-1 w-full px-3 h-[25rem] mt-12 relative flex justify-center items-center">
      <div className="flex justify-center items-center gap-3  w-fit bg-rose-700">
      <div className=" w-fit ">
        <Carrusel autoSlide={false} >
          {[...slides.map((s) => (
            <img className="w-[200px] rounded-2xl object-cover" src={s} />
          ))]}
        </Carrusel>

      </div>
    </div>
      </section>

      <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
