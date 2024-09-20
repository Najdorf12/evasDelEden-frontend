import { useEffect, useState } from "react";
import imgLogo from "../assets/logo-removebg.png";
import Carrusel from "../components/Carrusel";
import Footer from "../components/Footer";

const Home = ({ allEvas }) => {
  const categories = ["Todas", "Platinum", "Gold", "Silver"];
  const locations = ["Mendoza", "Córdoba", "Santa Fe", "Buenos Aires"];

  const [selectedMenu, setSelectedMenu] = useState("Categorias");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLocation, setSelectedLocation] = useState("Mendoza");

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

      <section className="bg-teal-500 w-full h-[20rem] mt-12 relative flex justify-center items-center">
        <button className="text-6xl text-zinc-600 fixed right-0 z-50">
          <i className="bx bxs-chevrons-right"></i>
        </button>
        <Carrusel />
      </section>

      <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
