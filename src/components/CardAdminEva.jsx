import imgWoman from "../assets/woman.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardAdminEva = ({ eva, selectEva, deleteEva }) => {
  const { _id, name, wttp, category, location, description, images, isActive } =
    eva;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };
  return (
    <>
      <section className="relative p-[6px]  min-w-[280px] border border-[#92856e]  max-w-[330px] rounded-3xl flex flex-col justify-center items-center hover:scale-105 duration-500 shadow-lg shadow-zinc-900">
        <picture className="w-full h-[15rem] object-cover">
          <Link to={`/${_id}`}>
            <img
              loading="lazy"
              className="w-full h-full rounded-2xl object-cover"
              src={!images[0]?.secure_url ? imgWoman : images[0]?.secure_url}
            />
          </Link>
        </picture>

        <article className="h-full mt-3 flex flex-col text-base w-full px-2">
          <p className="text-xl  font-text text-center  text-white leading-5 border-b border-[#92856e] py-2 ">
            {name}
          </p>

          <div className="mt-1 font-semibold font-text text-white tracking-wide rounded-lg flex justify-between items-center ">
            {category.toUpperCase()}
            <p className="text-white ">{isActive ? "Activa" : "Inactiva"}</p>
          </div>

          <div className="flex justify-between text-stone-400 font-semibold">
            <p>{location}</p>
            <p className="flex items-center gap-1">
              <i className="bx bxl-whatsapp text-xl"></i>
              {wttp}
            </p>
          </div>
          <ul className="flex flex-col text-sm text-stone-400">
            <div className="flex justify-between items-center">
              <li className="">
                <span className="text-stone-600 ">Edad:</span>{" "}
                {description?.edad}{" "}
              </li>
              <li className="">
                <span className="text-stone-600 ">Altura:</span>{" "}
                {description?.altura}
              </li>
              <li className="">
                <span className="text-stone-600">Peso:</span>{" "}
                {description?.peso} 
              </li>
            </div>
           
            <div className="flex justify-between items-center">
              <li className="">
                <span className="text-stone-600">Medidas:</span>{" "}
                {description?.medidas}
              </li>
              <li className="">
                <span className="text-stone-600">Depilacion:</span>{" "}
                {description?.depilacion}
              </li>
            </div>
            <li className="">
              <span className="text-stone-600">Horario:</span>{" "}
              {description?.horario}
            </li>
            <div className="flex flex-col ">
              <li>
                <span className="text-stone-600">Servicio:</span>{" "}
                {description?.servicio}
              </li>
              <li>
                <span className="text-stone-600">Descripción:</span>{" "}
                {isExpanded
                  ? description?.extendDescription
                  : truncateText(description?.extendDescription, 100)}
                {description?.extendDescription?.length > 100 && (
                  <span
                    onClick={toggleExpand}
                    className="cursor-pointer text-[#426d89] ml-1 hover:underline"
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </span>
                )}
              </li>
            </div>
          </ul>

          <div className="w-full  mt-4 mb-1 font-normal">
            <section className="flex justify-evenly items-center  mr-2 ">
              <div className="flex items-center gap-2 text-[1rem] text-white">
                <i
                  onClick={() => selectEva(eva, _id)}
                  className="bx bxs-edit-alt cursor-pointer text-[#426d89] hover:scale-110 hover:text-gray-100 duration-300 text-2xl"
                ></i>
                Editar
              </div>
              <div className="flex items-center gap-2 text-[1rem]  text-white">
                <i
                  onClick={() => deleteEva(_id)}
                  className="bx bxs-trash-alt  cursor-pointer text-[#426d89] hover:scale-110 hover:text-gray-100 duration-300 text-2xl"
                ></i>
                Eliminar
              </div>
            </section>
          </div>
        </article>
      </section>
    </>
  );
};

export default CardAdminEva;
