import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import logo from "/0004.png";
import imgAgeVerification from "../assets/bg/bg1-removebg.png";

const AgeVerification = ({ onConfirm }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    onConfirm();
    navigate("/");
  };

  const handleNo = () => {
    alert("Lo siento, debes ser mayor de edad para acceder al sitio.");
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(to left, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
      }}
      className="relative flex flex-col items-center pt-24 w-full h-[100dvh] overflow-hidden lg:bg-zinc-300 lg:pt-[10%]"
    >
      <nav className="absolute -top-6 right-2 z-50  lg:w-full lg:flex lg:justify-end  lg:top-3 ">
        <div className=" lg:mr-[3%] flex justify-center items-center ">
          <img src={logo} className="w-52 2xl:w-56 " alt="img-verification" />
        </div>
      </nav>
      <section
        id="verification"
        className="w-full h-screen absolute inset-0 lg:flex lg "
      >
        <img
          src={imgAgeVerification}
          alt=""
          className="object-cover object-center w-full max-w-[400px] lg:w-[30%]"
        />
      </section>
      <article
        id="box-glass"
        className="flex flex-col justify-center border border-purple-200 font-text items-center gap-2 z-50 py-6 px-2 w-[95%] rounded-3xl max-w-[650px] 2xl:max-w-[750px] lg:gap-4 shadow-xl shadow-zinc-700 lg:shadow-xl lg:shadow-gray-400"
      >
        <h6 className="text-[2.70rem] text-zinc-800 font-title font-semibold lg:text-5xl xl:text-6xl">
          Verificación de Edad
        </h6>
        <p className="text-stone-800 text-sm text-center text-balance lg:text-base lg:px-12">
          Sitio para mayores de 18 años. Contenido explicito solo para adultos.
          La interaccion de los usuarios con la plataforma es exclusiva
          responsabilidad de los mismos y los anunciantes del sitio. Al ingresar
          al sitio asumo toda la responsabilidad de la interacción en el mismo
          eximiendo de responsabilidad a los responsables de EvasdelEden.
        </p>
        <p className="text-lg font-text mt-1 font-medium text-stone-800 lg:text-lg 2xl:text-2xl">
          ¿Eres mayor de edad?
        </p>
        <div className="flex justify-evenly items-center gap-4 font-text font-medium text-base mt-2 l xl:text-lg lg:gap-6 2xl:gap-10 2xl:text-xl">
          <button
            className="rounded-full px-7 py-[2px] border border-purple-300 lg:px-10 text-purple-300 bg-zinc-700 shadow-lg shadow-zinc-900 2xl:px-12"
            onClick={handleYes}
          >
            Sí, soy mayor.
          </button>
          <button
            className="rounded-full px-7 py-[2px] border border-purple-300 lg:px-10 text-stone-800 shadow-lg shadow-zinc-900 2xl:px-12"
            onClick={handleNo}
          >
            No, soy menor.
          </button>
        </div>
      </article>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-2 text-stone-400 w-full pr-3 lg:w-[90%] lg:pr-[5%] ">
        <i className="bx bx-copyright text-2xl" aria-hidden="true"></i>
        <p className="text-base font-text italic">EVAS DEL EDEN - 2025</p>
      </div>
    </section>
  );
};

export default AgeVerification;
