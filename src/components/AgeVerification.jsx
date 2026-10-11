import { useState } from "react";
import logo from "/0004.png";
import { preloadData } from "../api/preload";
import { locations } from "../api/locations";
import { Link } from "react-router-dom";
import icon from "/icon14.png";
import CustomSelect from "../components/CustomSelect";
import Loader from "../components/Loader";

const AgeVerification = ({ onConfirm }) => {
  const [province, setProvince] = useState("Mendoza");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await preloadData();

      sessionStorage.setItem("isVerified", "true");
      sessionStorage.setItem("userProvince", province);

      onConfirm(province);
    } catch (error) {
      console.error("Error preloading data:", error);
      alert("No pudimos cargar los perfiles. Intentá nuevamente.");
       setIsLoading(false);  
    }
  };

  const handleNo = () => {
    alert("Lo siento, debes ser mayor de edad para acceder al sitio.");
  };

  return (
    <section className="relative flex flex-col items-center pt-24  w-full h-[100dvh] overflow-hidden bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 lg:pt-[7%]">
      {isLoading && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-5 bg-zinc-950/95">
          <Loader />
          <p className="font-text text-xs mt-12 text-zinc-400">Cargando...</p>
          <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
            <i
              className="bx bx-copyright text-lg xl:text-xl text-purple-400"
              aria-hidden="true"
            ></i>
            <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
              EVAS DEL EDEN - 2026
            </p>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 z-100 w-16 h-16 lg:h-28 lg:w-28 lg:right-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <div className="absolute bottom-2 left-2 rotate-[90deg] z-100 w-16 h-16 lg:h-28 lg:w-28 lg:left-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <nav className="absolute top-0 font-text2 text-lg px-3  flex justify-between items-center w-full mt-1 xl:px-6 xl:mt-3 xl:text-xl">
        <picture className=" flex items-center justify-center rounded-full w-[140px] lg:w-[150px] 2xl:w-[180px]">
          <img src={logo} className="rounded-full" alt="logo" />
        </picture>
      </nav>
      <article
        id="box-glass"
        className="flex flex-col justify-center bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 border-[2px] border-purple-600 font-text items-center gap-3 z-50 py-9 px-2 w-[95%] rounded-3xl max-w-[650px] xl:max-w-[750px] xl:py-12 2xl:max-w-[800px] lg:gap-5 "
      >
        <h6 className="text-[2.70rem] text-zinc-200 font-title font-semibold lg:text-5xl xl:text-6xl">
          Verificación de Edad
        </h6>
        <p className="text-zinc-400 text-sm  text-balance px-2 lg:text-base lg:px-12">
          Sitio para mayores de 18 años. Contenido explicito solo para adultos.
          La interaccion de los usuarios con la plataforma es exclusiva
          responsabilidad de los mismos y los anunciantes del sitio. Al ingresar
          al sitio asumo toda la responsabilidad de la interacción en el mismo
          eximiendo de responsabilidad a los responsables de EvasdelEden.
        </p>

        <div className="flex justify-center items-center gap-4 mt-1 w-full px-3">
          <CustomSelect
            id="age-province"
            label="Seleccioná tu Provincia"
            value={province}
            onChange={setProvince}
            options={Object.keys(locations)}
            placeholder="Seleccioná tu provincia"
          />
        </div>

        <p className="text-lg font-text mt-3 font-medium text-zinc-200 lg:text-lg xl:text-xl 2xl:text-2xl">
          ¿Eres mayor de edad?
        </p>
        <div className="flex justify-evenly items-center gap-2 font-text text-sm mt-2 xl:text-lg lg:gap-6 2xl:gap-10 2xl:text-xl">
          <button
            className="rounded-lg px-10 py-[4px] border border-purple-500 lg:px-10 text-zinc-200  shadow-lg shadow-zinc-900 xl:px-14"
            onClick={handleConfirm}
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Sí, soy mayor
          </button>
          <button
            className="rounded-lg px-10 py-[4px] border border-purple-500 lg:px-10 text-zinc-200  shadow-lg shadow-zinc-900 xl:px-14"
            onClick={handleNo}
          >
            No, soy menor
          </button>
        </div>
      </article>
          <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
            <i
              className="bx bx-copyright text-lg xl:text-xl text-purple-400"
              aria-hidden="true"
            ></i>
            <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
              EVAS DEL EDEN - 2026
            </p>
          </div>
    </section>
  );
};

export default AgeVerification;
