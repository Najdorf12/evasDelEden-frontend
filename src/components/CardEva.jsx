const CardEva = ({ eva }) => {
  const { name, location, description, images } = eva;
  console.log(eva);
  return (
    <div className="h-[23rem] relative">
      <figure className="w-52 h-full ">
        <img
          src={images[0]?.secure_url}
          alt=""
          className="w-full h-full rounded-2xl object-cover"
        />
      </figure>
      <article className="absolute inset-0 flex flex-col items-center justify-between  z-[150] text-white font-text2">
        <div className="flex flex-col items-center justify-center text-base font-medium w-[95%]">
          <p
            id="box-glass"
            className="w-full flex items-center justify-between px-4 mt-[6px] rounded-full text-zinc-800 border border-white"
          >
            {name}
            <span className=" rounded-full text-zinc-600">
              {description.edad}
            </span>
          </p>
        </div>
        <p className="mb-2 text-lg text-white font-normal">{location}</p>
      </article>
    </div>
  );
};

export default CardEva;
