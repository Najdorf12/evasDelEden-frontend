import logo from "/0004.png";

const Contact = () => {
  return (
    <>
      <section className="relative flex flex-col items-center w-full h-[100dvh] overflow-hidden lg:bg-zinc-300">
        <nav className="w-full flex justify-between items-center pr-2 -mt-6 z-50 lg:-mt-4 lg:px-[4%]">
          <div>
            <img src={logo} className="w-52 2xl:w-56 " alt="logo" />
          </div>
          <Link to={"/"}>
            <button
              id="btn-evadetail"
              className="px-9 py-1  flex items-center justify-center gap-1 text-sm xl:text-lg xl:px-12 font-semibold 2xl:text-xl "
            >
              Inicio
            </button>
          </Link>
        </nav>
        <section
          id="contact"
          className="w-full h-screen absolute inset-0 "
        ></section>
        <article className="flex flex-col justify-center font-text2 items-center z-50 w-[98%] rounded-2xl mt-5 max-w-[600px] lg:ml-[30%] lg:-mt-12 xl:mt-0 2xl:max-w-[800px]">
          <h6
            style={{ filter: "drop-shadow(3px 6px 6px rgb(24 24 27))" }}
            className="text-8xl text-stone-100 font-title font-semibold lg:text-white xl:text-9xl 2xl:text-[10rem]"
          >
            CONTACTO
          </h6>
          <p
            id="box-glass2"
            className="mt-5 py-3 rounded-lg text-stone-300 text-base font-semibold text-center px-2 w-[90%] border border-stone-400 text-balance max-w-[500px]  lg:mt-3 lg:border-[0px] lg:text-stone-500 2xl:max-w-[700px] 2xl:text-xl "
          >
            Contactate para publicarte con nosotros y conocer nuestros
            servicios, productos disponibles como así también promociones de
            publicación.
          </p>
          <ul
            id="box-glass2"
            className="mt-14 border rounded-lg border-purple-400 text-stone-400 text-base flex flex-col gap-2 px-2 py-3 text-balance w-[90%] lg:border-[0px] max-w-[500px] lg:max-w-[900px] lg:text-nowrap lg:mt-6 lg:text-stone-400   2xl:text-xl "
          >
            <li className="flex items-start gap-3">
              <i className="bx bxs-chevrons-right text-xl text-purple-400"></i>
              Portal para visitantes y clientes anunciantes mayores de 18 años
            </li>
            <li className="flex items-start gap-3">
              <i className="bx bxs-chevrons-right text-xl text-purple-400"></i>
              Nuestro portal se reserva el derecho de publicación.
            </li>
            <li className="flex items-start gap-3 md:w-[500px] lg:text-wrap">
              <i className="bx bxs-chevrons-right text-xl text-purple-400 "></i>
              EvasDelEden no es una agencia por tal motivo no se responsabiliza
              por las publicaciones de las escorts.
            </li>
          </ul>
          <Link
            to={`https://api.whatsapp.com/send/?phone=${wttp}&text=${encodeURIComponent(
              `Hola, me gustaría publicarme en evasdeleden.com y conocer más sobre sus servicios.`
            )}`}
            target="_blank"
          >
            <button
              id="btn-evadetail"
              className="px-9 py-2 mt-12 flex items-center justify-center gap-1 text-sm xl:text-base xl:px-12 font-semibold 2xl:text-lg 2xl:mt-16"
            >
              ESCRIBENOS AL WHATSAPP
            </button>
          </Link>
        </article>

        <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full pr-3">
          <i className="bx bx-copyright text-2xl" aria-hidden="true"></i>
          <p className="text-base font-text italic">EVAS DEL EDEN - 2025</p>
        </div>
      </section>
    </>
  );
};
export default Contact;
