import icon from "/icon14.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-l from-zinc-900 via-purple-900 to-zinc-900  text-stone-400 py-8 px-4 relative pb-24 lg:pb-16 border-t border-purple-400 ">
      <div className="mt-14 w-full flex justify-center flex-col items-start gap-10 lg:mt-16 ">
        <article
          className="relative text-center font-text2 text-zinc-200 self-center min-h-[330px] max-w-[700px] md:self-center lg:min-h-[250px] xl:max-w-[850px] w-full px-4 pt-12 pb-8 flex flex-col justify-center items-center gap-3 text-balance rounded-2xl border border-purple-400 xl:py-12 2xl:py-16 bg-gradient-to-tl from-zinc-900 via-purple-900 to-zinc-900"
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

          <h6 className="text-xl text-purple-400 lg:text-2xl 2xl:text-3xl ">
            Guía de las mejores escorts independientes en Argentina
          </h6>
          <p className="text-base xl:leading-7 2xl:text-lg">
            Todas los anuncios y publicaciones de productos o servicios son
            independientes.{" "}
            <strong className="text-purple-400">
              EvasdelEden no posee relación ni vinculación laboral con los
              anunciantes
            </strong>
            . Sólo publicamos fotografías y textos a expresa voluntad de los
            anunciantes. El sitio es un medio visual publicitario.
          </p>
          <div className="flex justify-center items-center gap-2">
            <Link to={"/modelo/login"}>
              <button
                className="w-full mt-6 font-text py-1.5 px-9 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-zinc-200 transition duration-200 text-sm lg:px-14 md:text-base 3xl:text-lg"
                style={{
                  boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                }}
              >
                Quiero publicarme
              </button>
            </Link>
          </div>
        </article>

        <nav aria-label="Términos y condiciones" className="self-center">
          <ul className="mt-3 text-sm font-text2 text-balance text-purple-200 w-full flex flex-col gap-2 xl:gap-0 lg:items-center lg:text-base">
            <li className="flex items-start ">
              <i
                className="bx bx-chevrons-right text-lg text-purple-400 -mt-[3px] lg:text-2xl"
                aria-hidden="true"
              ></i>
              <span className="ml-1">
                Portal para visitantes y clientes anunciantes mayores de 18 años
              </span>
            </li>
            <li className="flex items-start">
              <i
                className="bx bx-chevrons-right text-lg text-purple-400 -mt-[3px] lg:text-2xl"
                aria-hidden="true"
              ></i>
              <span className="ml-1">
                EvasDelEden no es una agencia por tal motivo no se
                responsabiliza por las publicaciones de las escorts
              </span>
            </li>
            <li className="flex items-start">
              <i
                className="bx bx-chevrons-right text-lg text-purple-400 -mt-[3px] lg:text-2xl"
                aria-hidden="true"
              ></i>
              <span className="ml-1">
                EvasDelEden presta el servicio de publicación y asesoría gráfica
              </span>
            </li>
            <li className="flex items-start">
              <i
                className="bx bx-chevrons-right text-lg text-purple-400 -mt-[3px] lg:text-2xl"
                aria-hidden="true"
              ></i>
              <span className="ml-1">
                Todas las fotografías son certificadas y verificadas como reales
                antes de ser publicadas
              </span>
            </li>
            <li className="flex items-start">
              <i
                className="bx bx-chevrons-right text-lg text-purple-400 -mt-[3px] lg:text-2xl"
                aria-hidden="true"
              ></i>
              <span className="ml-1">
                Nuestro portal se reserva el derecho de publicación
              </span>
            </li>
            <div className="w-full flex items-center justify-center">
              <Link to={"/contacto"}>
                <button
                  className="mt-6 font-text py-1.5 px-16 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-purple-400 transition duration-200 text-sm md:text-base lg:mt-3 xl:mt-5 lg:px-24 3xl:text-lg "
                  style={{
                    boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                  }}
                >
                  Contacto
                </button>
              </Link>
            </div>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-2 right-2 z-100 w-12 h-12 lg:h-20 lg:w-20 lg:right-4 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <p className="absolute lg:right-12 text-2xl text-zinc-300 bottom-2 w-full text-center lg:text-3xl"></p>
      <div className="absolute bottom-2 left-2 rotate-[90deg] z-100 w-12 h-12 lg:h-20 lg:w-20 lg:left-3 lg:bottom-3">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <div className="absolute top-2 right-2 z-100 w-12 h-12 lg:h-20 lg:w-20 lg:right-4 lg:top-4">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <p className="absolute lg:right-12 text-2xl text-zinc-300 bottom-2 w-full text-center lg:text-3xl"></p>
      <div className="absolute top-2 left-2 rotate-[90deg] z-100 w-12 h-12 lg:h-20 lg:w-20 lg:left-3 lg:top-4">
        <img src={icon} alt="icon-home" className="w-full h-full" />
      </div>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-400"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
