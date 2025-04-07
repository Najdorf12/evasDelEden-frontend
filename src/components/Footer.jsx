const Footer = () => {
    return (
      <footer className="bg-zinc-800 text-stone-400 py-8 px-4">
        <div className="mt-14 w-full flex justify-center flex-col items-start gap-16 lg:mt-16 xl:gap-24 ">
          <article 
            className="relative text-center font-text2 text-stone-500 self-center min-h-[320px] max-w-[700px] md:self-center lg:min-h-[250px] xl:max-w-[850px] w-full px-6 py-9 flex flex-col justify-center items-center gap-3 text-balance rounded-2xl border border-purple-400 xl:py-12 2xl:py-16"
            aria-label="Aviso legal"
          >
            <div className="absolute top-1 left-2 xl:top-2 xl:left-3 text-stone-700" aria-hidden="true">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute top-1 right-2 xl:bottom-2 xl:right-3 text-stone-700" aria-hidden="true">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute bottom-1 left-2 xl:bottom-2 xl:left-3 text-stone-700" aria-hidden="true">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute bottom-1 right-2 xl:left text-stone-700" aria-hidden="true">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
  
            <h6 className="text-xl text-whiteCustom lg:text-2xl 2xl:text-3xl ">
              Guía de las mejores escorts independientes en Argentina
            </h6>
            <p className="text-base 2xl:text-lg">
              Todas los anuncios y publicaciones de productos o servicios son
              independientes.{" "}
              <strong className="text-purple-300">
                EvasdelEden no posee relación ni vinculación laboral con los
                anunciantes
              </strong>. Sólo publicamos fotografías y textos a expresa voluntad de los
              anunciantes. El sitio es un medio visual publicitario.
            </p>
          </article>
  
          <nav aria-label="Términos y condiciones">
            <ul className="text-sm font-text2 text-balance text-stone-500 w-full flex flex-col gap-2 lg:text-base">
              <li className="flex items-start ">
                <i className="bx bx-chevrons-right text-lg text-purple-600 -mt-[3px] lg:text-2xl" aria-hidden="true"></i>
                <span className="ml-1">
                  Portal para visitantes y clientes anunciantes mayores de 18 años
                </span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-chevrons-right text-lg text-purple-600 -mt-[3px] lg:text-2xl" aria-hidden="true"></i>
                <span className="ml-1">
                  EvasDelEden no es una agencia por tal motivo no se responsabiliza
                  por las publicaciones de las escorts
                </span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-chevrons-right text-lg text-purple-600 -mt-[3px] lg:text-2xl" aria-hidden="true"></i>
                <span className="ml-1">
                  EvasDelEden presta el servicio de publicación y asesoría gráfica
                </span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-chevrons-right text-lg text-purple-600 -mt-[3px] lg:text-2xl" aria-hidden="true"></i>
                <span className="ml-1">
                  Todas las fotografías son certificadas y verificadas como reales
                  antes de ser publicadas
                </span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-chevrons-right text-lg text-purple-600 -mt-[3px] lg:text-2xl" aria-hidden="true"></i>
                <span className="ml-1">
                  Nuestro portal se reserva el derecho de publicación
                </span>
              </li>
            </ul>
          </nav>
        </div>
  
        <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-2 w-full pr-3 lg:w-[90%] lg:pr-[5%] ">
          <i className="bx bx-copyright text-2xl" aria-hidden="true"></i>
          <p className="text-base font-text italic">
            EVAS DEL EDEN - 2025
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;