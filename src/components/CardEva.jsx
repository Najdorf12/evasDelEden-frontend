import { Link } from "react-router-dom";

const CardEva = ({ eva }) => {
  const { _id, name, location, description, images } = eva;
  return (
    
    <div className="h-[23rem] relative xl:h-[25rem]">
    <figure className="w-52 h-full xl:w-64">
      <img
        src={images[0]?.secure_url}
        alt=""
        className="w-full h-full rounded-2xl object-cover"
      />
    </figure>
    <article className="absolute inset-0 flex flex-col items-center justify-between text-white font-text2">
      <div className="flex flex-col items-center justify-center text-base font-medium w-[95%]">
        <p
          id="box-glass"
          className="w-full flex items-center justify-between px-4 mt-[6px] rounded-full text-zinc-800 border border-white"
        >
          {name}
          <span className="rounded-full text-zinc-600">{description.edad}</span>
        </p>
      </div>
      <p className="mb-2 text-lg text-white font-normal">{location}</p>
    </article>
  </div>
  

  );
};

export default CardEva;
