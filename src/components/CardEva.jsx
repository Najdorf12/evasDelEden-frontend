import { Link } from "react-router-dom";

const CardEva = ({ eva }) => {
  const { _id, name, location, description, images } = eva;

  return (
    <div className="h-full relative w-full">
      <figure className="w-full h-full">
        {images?.length > 0 ? (
          <img
            src={images[0]?.secure_url}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </figure>
      <article className="absolute inset-0 flex flex-col items-center justify-between  font-text2">
        <div className="flex flex-col items-center justify-center text-base font-medium w-[95%]">
          <p
            id="box-glass"
            className="w-full flex text-sm items-center justify-between px-3 mt-[6px] rounded-full text-white  border border-white"
          >
            {name}
            <span className="rounded-full text-zinc-700">
              {description.edad}
            </span>
          </p>
        </div>
        <p className="mb-2 text-lg text-white font-medium">{location}</p>
      </article>
    </div>
  );
};

export default CardEva;
