const CardEva = ({ eva }) => {
  const { name, location, description, images } = eva;

  return (
    <div className="h-[23rem]">
    <figure className="w-52 h-full">
      <img
        src={images[0]?.secure_url}
        alt=""
        className="w-full h-full rounded-2xl object-cover"
      />
    </figure>
  </div>
  );
};

export default CardEva;