import { useState } from "react";
import logo from "/0004.png";
import { preloadData } from "../api/preload";
import { locations } from "../api/locations";
import { Link } from "react-router-dom";
import icon from "/icon14.png";

const AgeVerification = ({ onConfirm }) => {
  const [province, setProvince] = useState("Mendoza");

  const handleConfirm = async () => {
    try {
      await preloadData();
      sessionStorage.setItem("isVerified", "true");
      sessionStorage.setItem("userProvince", province);
      onConfirm(province);
    } catch (error) {
      console.error("Error preloading data:", error);
    }
  };
  const handleNo = () => {
    alert("Lo siento, debes ser mayor de edad para acceder al sitio.");
  };

  return (
    <section className="relative flex flex-col items-center pt-24 w-full h-[100dvh] overflow-hidden bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 lg:pt-[7%]">
      <div className="absolute bottom-2 right-2 z-100 w-20 h-20 lg:h-28 lg:w-28 lg:right-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <div className="absolute bottom-2 left-2 rotate-[90deg] z-100 w-20 h-20 lg:h-28 lg:w-28 lg:left-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <nav className="absolute top-0 font-text2 text-lg px-3  flex justify-between items-center w-full mt-1 xl:px-6 xl:mt-3 xl:text-xl">
        <picture className=" flex items-center justify-center rounded-full w-[140px] lg:w-[150px] 2xl:w-[180px]">
          <img src={logo} className="rounded-full" alt="logo" />
        </picture>
        {/* <Link to={"/model/login"}>
          <button
            className="w-full font-text py-1.5 px-9 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white transition duration-200 text-sm  lg:px-10 md:text-base 3xl:text-lg"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Iniciar Sesión
          </button>
        </Link> */}
      </nav>
      <article
        id="box-glass"
        className="flex flex-col justify-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 border-[2px] border-purple-600 font-text items-center gap-3 z-50 py-6 px-2 w-[95%] rounded-3xl max-w-[650px] xl:max-w-[800px] xl:py-9 2xl:max-w-[750px] lg:gap-5 "
      >
        <h6 className="text-[2.70rem] text-zinc-200 font-title font-semibold lg:text-5xl xl:text-6xl">
          Verificación de Edad
        </h6>
        <p className="text-zinc-400 text-sm text-center text-balance lg:text-base lg:px-12">
          Sitio para mayores de 18 años. Contenido explicito solo para adultos.
          La interaccion de los usuarios con la plataforma es exclusiva
          responsabilidad de los mismos y los anunciantes del sitio. Al ingresar
          al sitio asumo toda la responsabilidad de la interacción en el mismo
          eximiendo de responsabilidad a los responsables de EvasdelEden.
        </p>

        <div className="flex justify-center items-center gap-4 mt-1">
          <label
            htmlFor="provinceSelect"
            className="text-purple-500 text-sm font-text lg:text-base xl:text-lg"
          >
            Elegí tu provincia
          </label>
          <select
            id="provinceSelect"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-lg pl-3 pr-9 py-1.5  text-sm border border-purple-500  bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 text-zinc-200 focus:outline-none focus:border-purple-600 focus:bg-purple-950 lg:text-base xl:text-lg"
          >
            {Object.keys(locations).map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        <p className="text-lg font-text mt-1 font-medium text-zinc-200 lg:text-lg xl:text-xl 2xl:text-2xl">
          ¿Eres mayor de edad?
        </p>
        <div className="flex justify-evenly items-center gap-4 font-text text-base mt-2 xl:text-lg lg:gap-6 2xl:gap-10 2xl:text-xl">
          <button
            className="rounded-xl px-7 py-[4px] border border-purple-500 lg:px-10 text-zinc-200  shadow-lg shadow-zinc-900 xl:px-14"
            onClick={handleConfirm}
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Sí, soy mayor.
          </button>
          <button
            className="rounded-xl px-7 py-[4px] border border-purple-500 lg:px-10 text-zinc-200  shadow-lg shadow-zinc-900 xl:px-14"
            onClick={handleNo}
          >
            No, soy menor.
          </button>
        </div>
      </article>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-0 text-zinc-700 w-full pr-3 lg:w-[90%] lg:pr-[5%] ">
        <i className="bx bx-copyright text-2xl" aria-hidden="true"></i>
        <p className="text-xs md:text-sm font-text italic lg:text-base">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </section>
  );
};

export default AgeVerification;
