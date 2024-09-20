const CardEva = ({ evaPlatinum }) => {
  const { name, location, description, image } = evaPlatinum;
  console.log(evaPlatinum);
  return (
    <div>
      <figure className="w-48 h-[18rem]">
        <img src={image} alt="" 
        className="w-full h-full rounded-2xl object-cover"
        />
      </figure>
      {/* <article>
        <p className="text-2xl text-white">{name}</p>
      </article> */}
    </div>
  );
};

export default CardEva;
