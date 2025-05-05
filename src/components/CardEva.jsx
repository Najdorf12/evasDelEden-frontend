import { Link } from "react-router-dom";

const CardEva = ({ eva }) => {
  const { _id, name, detailLocation, description, images } = eva;
  const locationString = `${detailLocation.city}, ${detailLocation.region}`;

  const formatUrl = (url) => {
    if (!url) return null;
    return url.replace(
      "https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket/",
      "https://media.evasdeleden.com/"
    );
  };
  return (
    <Link
      to={`/${name}/${_id}`}
      className="relative w-[48%] min-w-[185px] min-h-[400px] h-[400px] md:h-[500px] lg:w-[30%] max-w-[450px] lg:min-w-[380px] lg:h-[580px]"
    >
      <figure className="w-full h-full">
        {images?.length > 0 ? (
          <img
            src={formatUrl(images[0]?.secure_url)}
            alt="Eva imagen"
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "ruta/a/imagen/por/defecto.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-zinc-700 text-zinc-500 flex items-center justify-center rounded-lg">
            Imagen no disponible
          </div>
        )}
      </figure>
      <article className="absolute inset-0 flex flex-col items-center justify-between font-text2">
        <div className="flex flex-col items-center justify-center text-balance text-base font-medium w-[90%] md:w-[60%] py-[2px]">
          <p
            id="box-glass3"
            className="w-full flex text-sm  items-center justify-between px-4 py-[1px] mt-[6px] rounded-lg text-white border border-white xl:text-base"
          >
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
