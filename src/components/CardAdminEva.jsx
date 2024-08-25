import imgWoman from "../assets/woman.jpg";

const CardAdminEva = ({ eva, getEvas, selectEva }) => {
  const { name, wttp, category, location, description, images } = eva;

  const deleteProduct = (id) => {
    axios
      .delete(`/evas/${id}`)
      .then(() => getEvas())
      .catch((error) => console.error(error));
  };
  return (
    <>
      <section className="relative bg-[#212121] w-[95%] border border-[#92856e]  sm:w-[400px] xl:w-[400px] rounded-md h-[138px] flex justify-center items-center hover:scale-105 duration-500">
        <picture className="h-full mr-1 sm:mr-3 lg:mr-5">
          <Link to={`/${_id}`}>
            <img
              loading="lazy"
              className="w-[130px] md:max-w-[120px] h-full rounded-md lg:w-full object-cover"
              src={imgWoman}
            />
          </Link>
        </picture>

        <article className="w-[80%] lg:w-[70%] pl-2  h-full pt-2">
          <p className="text-lg  font-text font-semibold text-amber-500 leading-5 mb-1">
            {name?.toUpperCase()?.substring(0, 20)}
          </p>
          <span className="font-text mt-2 font-base text-md  text-gray-400 tracking-wide rounded-lg">
            {category}
          </span>
          <p className="text-sm mt-1 font-text text-gray-200 leading-6">
            {description?.medidas}
          </p>
          <div className="flex justify-between pr-4  w-full items-center mt-2">
            <section className="flex gap-5 text-3xl  text-stone-600">
              <i
                onClick={() => selectEva(eva)}
                className="bx bxs-edit-alt cursor-pointer hover:scale-110 hover:text-gray-100 duration-300"
              ></i>
              <i
                onClick={() => deleteEva(_id)}
                className="bx bxs-trash-alt  cursor-pointer hover:scale-110 hover:text-gray-100 duration-300"
              ></i>
            </section>
            
          </div>
        </article>
      </section>
    </>
  );
};

export default CardAdminEva;
