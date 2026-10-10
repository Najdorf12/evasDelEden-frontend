import icon from "/icon14.png";
import logo from "/0004.png";
import { Link } from "react-router-dom";

const Contact = () => {
  const wttp = "+54 9 353 441-6561";

  return (
    <section className="text-balance h-[100dvh] w-full bg-gradient-to-l from-zinc-900 via-purple-900 to-zinc-900  text-stone-400 flex flex-col gap-4 px-6 items-center pt-24  relative border-t border-purple-400 ">
      <nav className="absolute top-0 font-text2 text-lg px-2 flex justify-between items-center w-full mt-1 lg:px-12 xl:mt-3 xl:text-xl">
        <picture className=" flex items-center justify-center rounded-full w-[126px] lg:w-[150px] 2xl:w-[180px]">
          <Link to={"/"}>
            <img src={logo} className="rounded-full" alt="logo" />
          </Link>
        </picture>
        <div className="flex gap-2 lg:gap-4">
          <Link to={"/modelo/login"}>
            <button
              className="w-full font-text py-1.5 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white text-xs transition duration-200  lg:px-10 lg:text-base 3xl:text-lg"
              style={{
                boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
              }}
            >
              Iniciar Sesión
            </button>
          </Link>
          <Link to={"/contacto"}>
            <button
              className="w-full font-text py-1.5 px-5 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white text-xs transition duration-200 lg:px-10 lg:text-base 3xl:text-lg"
              style={{
                boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
              }}
            >
              Contacto
            </button>
          </Link>
        </div>
      </nav>

      <div className="text-center text-zinc-100 font-title text-6xl lg:text-8xl">
        CONTACTO
      </div>
      <div className="w-full flex justify-center flex-col items-start gap-10 ">
        <article
          className="relative text-center font-text2 text-zinc-200 self-center min-h-[330px] max-w-[700px] md:self-center lg:min-h-[250px] xl:max-w-[880px] w-full px-4 py-10 flex flex-col justify-center items-center gap-3 text-balance rounded-2xl border border-purple-400 xl:pt-12 xl:pb-8 2xl:py-16 bg-gradient-to-tl from-zinc-900 via-purple-900 to-zinc-900"
          aria-label="Aviso legal"
        >
          <div
            className="absolute top-1 left-2 xl:top-2 xl:left-3 text-purple-700"
            aria-hidden="true"
          >
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div
            className="absolute top-1 right-2 xl:bottom-2 xl:right-3 text-purple-700"
            aria-hidden="true"
          >
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div
            className="absolute bottom-1 left-2 xl:bottom-2 xl:left-3 text-purple-700"
            aria-hidden="true"
          >
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div
            className="absolute bottom-1 right-2 xl:left text-purple-700"
            aria-hidden="true"
          >
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>

          <h6 className="text-base text-purple-400 lg:text-xl 2xl:text-2xl ">
            Contactate para publicarte con nosotros y conocer nuestros
            servicios, productos disponibles como así también promociones de
            publicación
          </h6>
          <div className="text-xs sm:text-sm mt-3 flex flex-col text-start pl-3 gap-2 lg:text-base lg:mt-3">
            <div className="max-w-[500px] ">
              Portal para visitantes y clientes anunciantes mayores de 18 años
            </div>
            <div className="max-w-[500px]">
              Nuestro portal se reserva el derecho de publicación
            </div>
            <div className="max-w-[500px]">
              EvasDelEden no es una agencia por tal motivo no se responsabiliza
              por las publicaciones de las escorts
            </div>
          </div>
          <div className="flex justify-center items-center gap-2"></div>
        </article>
      </div>
      <Link
        to={`https://api.whatsapp.com/send/?phone=${wttp}&text=${encodeURIComponent(
          `Hola, me gustaría publicarme en evasdeleden.com y conocer más sobre sus servicios.`,
        )}`}
        target="_blank"
      >
        <button
          className="mt-6 font-text py-1.5 px-16 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-purple-400 transition duration-200 text-sm lg:mt-6  lg:px-10 md:text-base 3xl:text-lg"
          style={{
            boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
          }}
        >
          Escribenos al WhatsApp
        </button>
      </Link>
      <div className="absolute bottom-2 right-2 z-100 w-12 h-12 lg:h-20 lg:w-20 lg:right-4 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <p className="absolute lg:right-12 text-2xl text-zinc-300 bottom-2 w-full text-center lg:text-3xl"></p>
      <div className="absolute bottom-2 left-2 rotate-[90deg] z-100 w-12 h-12 lg:h-20 lg:w-20 lg:left-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      {/*   <div className="absolute top-2 right-2 z-100 w-12 h-12 lg:h-20 lg:w-20 lg:right-4 lg:top-4">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div> */}
      <p className="absolute lg:right-12 text-2xl text-zinc-300 bottom-2 w-full text-center lg:text-3xl"></p>
      {/*  <div className="absolute top-2 left-2 rotate-[90deg] z-100 w-12 h-12 lg:h-20 lg:w-20 lg:left-3 lg:top-4">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div> */}
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-400"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </section>
  );
};

export default Contact;

/* import logo from "/0004.png";
import { Link } from "react-router-dom";

const Contact = () => {
  const wttp = "+54 9 353 441-6561"
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
 */
