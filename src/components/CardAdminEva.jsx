import imgWoman from "../assets/bg/imgWoman.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardAdminEva = ({ eva, onDelete, onEdit }) => {
  const formatUrl = (url) => {
    if (!url) return imgWoman;
    
    const newUrl = url.replace(
      'https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket',
      'https://media.evasdeleden.com'
    );
    
    return newUrl.includes('media.evasdeleden.com') ? newUrl : imgWoman;
  };

  if (!eva) {
    return <div className="text-white">Cargando datos...</div>;
  }

  const {
    _id = "",
    name = "",
    wttp = "",
    category = "",
    location = "",
    detailLocation = {},
    description = {},
    images = [],
    isActive = false,
  } = eva;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + "...";
  };

  return (
    <>
      <section className="relative min-w-[370px] border border-purple-600 bg-gradient-to-tl from-zinc-900 via-purple-950 to-zinc-900 min-h-[560px] max-w-96  rounded-3xl flex flex-col justify-start items-center hover:scale-105 duration-500 shadow-lg shadow-zinc-900 xl:min-h-[560px] ">
        <picture className="w-full h-[12rem] mt-2 object-cover ">
          <Link to={`/${name}/${_id}`}>
            <img
              loading="lazy"
              className="w-full h-full rounded-2xl object-cover"
              src={formatUrl(images[0]?.secure_url)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = imgWoman; // Tu imagen de respaldo
              }}
              alt={`Imagen de ${name}`}
            />
          </Link>
        </picture>

        <article className="h-full font-text mt-3 flex flex-col text-sm w-full px-3">
          <p className="text-3xl font-title text-center  text-white leading-5 border-b border-purple-600 py-2 ">
            {name}
          </p>

          <div className="mt-2 font-semibold font-text text-white tracking-wide rounded-lg flex justify-between items-center ">
            {category?.toUpperCase()}
            <p className="text-white ">{isActive ? "Activa" : "Inactiva"}</p>
          </div>
          <div className="flex justify-between text-zinc-300 py-2">
            {detailLocation ? (
              <>
                <p>{detailLocation.province || location}</p>
                <p>{detailLocation.city || "Ciudad "}</p>
                <p>{detailLocation.region || "Región "}</p>
              </>
            ) : (
              <p className="col-span-3">Ubicación no disponible</p>
            )}
          </div>
          <ul className="flex flex-col text-sm text-zinc-300">
            <li className="flex items-center gap-1">
              <i className="bx bxl-whatsapp text-xl"></i>
              {wttp}
            </li>
            <div className="flex justify-between items-center">
              <li className="">
                <span className="text-purple-700 ">Edad:</span>{" "}
                {description?.edad}{" "}
              </li>
              <li className="">
                <span className="text-purple-700 ">Altura:</span>{" "}
                {description?.altura}
              </li>
              <li className="">
                <span className="text-purple-700">Peso:</span>{" "}
                {description?.peso}
              </li>
            </div>

            <div className="flex justify-between items-center">
              <li className="">
                <span className="text-purple-700">Medidas:</span>{" "}
                {description?.medidas}
              </li>
              <li className="">
                <span className="text-purple-700">Depilacion:</span>{" "}
                {description?.depilacion}
              </li>
            </div>
            <li className="">
              <span className="text-purple-700">Horario:</span>{" "}
              {description?.horario}
            </li>
            <div className="flex flex-col ">
              <li>
                <span className="text-purple-700">Servicio:</span>{" "}
                {description?.servicio}
              </li>
              <li>
                <span className="text-purple-700 z-50 relative">
                  Descripción:
                </span>{" "}
                {isExpanded
                  ? description?.extendDescription
                  : truncateText(description?.extendDescription, 100)}
                {description?.extendDescription?.length > 100 && (
                  <span
                    onClick={toggleExpand}
                    className="cursor-pointer text-purple-400 ml-1 hover:underline "
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </span>
                )}
              </li>
            </div>
          </ul>

          <div
            className={`w-full absolute ${
              isExpanded ? "relative mt-7" : "absolute"
            } bottom-4  left-0 font-normal flex justify-center items-center gap-12`}
          >
            <div className="flex items-center gap-2 text-[1rem] text-white">
              <i
                onClick={onEdit}
                className="bx bxs-edit-alt cursor-pointer text-purple-500 hover:scale-110 hover:text-gray-100 duration-300 text-2xl"
              ></i>
              Editar
            </div>
            <div className="flex items-center gap-2 text-[1rem] text-white">
              <i
                onClick={onDelete}
                className="bx bxs-trash-alt  cursor-pointer text-red-600 hover:scale-110 hover:text-gray-100 duration-300 text-2xl"
              ></i>
              Eliminar
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default CardAdminEva;
