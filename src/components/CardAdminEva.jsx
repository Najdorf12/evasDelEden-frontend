import imgWoman from "../assets/woman.jpg";
import { Link } from "react-router-dom";
import axios from "../api/axios.js";
import {getEvas} from "../api/handlers.js"

const CardAdminEva = ({ eva, selectEva, deleteEva }) => {
  const {
    _id,
    name,
    wttp,
    age,
    category,
    location,
    description,
    images,
    isActive,
  } = eva;

  
  return (
    <>
      <section className="relative p-[6px] bg-[#212121] w-full border border-[#92856e]  max-w-[320px] rounded-3xl flex flex-col justify-center items-center hover:scale-105 duration-500">
        <picture className="w-full h-72">
          <Link to={`/${_id}`}>
            <img
              loading="lazy"
              className="w-full h-full rounded-2xl object-cover"
              src={!images[0]?.secure_url ? imgWoman : images[0]?.secure_url }
            />
          </Link>
        </picture>

        <article className="h-full mt-3 flex flex-col gap-1 ">
          <p className="text-2xl  font-text text-center font-semibold text-white leading-5 border-b border-[#92856e] py-2">
            {name.toUpperCase()}
          </p>
          
          <span className="mt-2 px-2 font-text font-semibold text-xl text-[#ad648f] tracking-wide rounded-lg flex justify-between items-center">
            {category.toUpperCase()}
            <p className="text-white text-lg">
              {isActive ? "Activa" : "Inactiva"}
            </p>
          </span>
          <p className="pl-2 font-semibold text-lg text-white">
            EDAD :   {age}
          </p>
          <div className="flex justify-between px-2 font-semibold text-lg text-stone-400">
            <p>{location}</p>
            <p className="flex items-center gap-1">
              <i className="bx bxl-whatsapp text-xl"></i>
              {wttp}
            </p>
          </div>
          <div className="text-stone-600 pl-2 ">
            <div className="flex justify-between items-center pr-2">
              <p className="">- {description?.medidas}</p>
            </div>

            <p className="">- {description?.detail}</p>
            <p className="">
              - {description?.more} Lorem ipsum dolor sit, amet consect
              adipisicing elit.
            </p>
          </div>

          <div className="w-full  mt-4 mb-1">
            <section className="flex justify-evenly items-center text-[#ad648f]  mr-2 ">
              <div className="flex items-center gap-2 text-[1rem]">
                <i
                  onClick={() => selectEva(eva, _id)}
                  className="bx bxs-edit-alt cursor-pointer hover:scale-110 hover:text-gray-100 duration-300 text-3xl"
                ></i>
                Editar
              </div>
              <div className="flex items-center gap-2 text-[1rem]">
                <i
                  onClick={() => deleteEva(_id)}
                  className="bx bxs-trash-alt  cursor-pointer hover:scale-110 hover:text-gray-100 duration-300 text-3xl"
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
