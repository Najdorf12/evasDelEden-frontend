import { Link } from "react-router-dom";
import alternativeImage from "../assets/bg/imgWoman.jpeg"; // Import a default image if needed

const CardEva = ({ eva }) => {
  const { _id, name, detailLocation, description, images } = eva;
  const locationString = `${detailLocation.city}, ${detailLocation.region}`;

  return (
    <Link
      to={`/${name}/${_id}`}
      className="relative min-w-[200px] w-[48%] min-h-[400px] h-[400px] md:h-[500px] lg:w-[30%] max-w-[450px] lg:min-w-[380px] lg:h-[580px]"
    >
      <figure className="w-full h-full">
        {images?.length > 0 ? (
          <img
            src={images[0]?.secure_url}
            alt="Eva imagen"
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-lg">
            <img
              src={alternativeImage}
              alt="Imagen alternativa"
              loading="lazy"
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        )}
      </figure>
      <article className="absolute inset-0 flex flex-col items-center justify-between font-text2">
        <div
          className="flex flex-col items-center justify-center text-balance text-base font-medium w-[90%] md:w-[60%] py-[2px]"
        >
          <p id="box-glass3" className="w-full flex text-sm  items-center justify-between px-4 py-[1px] mt-[6px] rounded-lg text-white border border-white xl:text-base">
            {name}
            <span className="rounded-full text-white">{description?.edad}</span>
          </p>
        </div>
        <p className="mb-2 text-sm text-white font-medium px-3 text-center text-balance lg:text-base lg:max-w-[60%]">
          {locationString}
        </p>
      </article>
    </Link>
  );
};

export default CardEva;
