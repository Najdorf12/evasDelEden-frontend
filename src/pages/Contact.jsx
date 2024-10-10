import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <section
        
        className="relative flex flex-col items-center w-full h-[100dvh] overflow-hidden lg:bg-zinc-300"
      >
        <nav className="w-full flex justify-between items-center pr-2 mt-2 z-50 lg:px-[4%]">
          <div>
            <img src={imgLogo} alt="logo" className="w-14 lg:w-16 xl:w-20" />
          </div>
          <Link to={"/"}>
            <button className="pl-2 text-lg border-l-[3px] border-zinc-600 font-text2 text-whiteCustom xl:text-xl 2xl:text-2xl">
              Volver
            </button>
          </Link>
        </nav>
        <section
          id="contact"
          className="w-full h-screen absolute inset-0 "
        ></section>
        <article
          /* id="box-glass4" */
          className="flex flex-col justify-center font-text2 items-center z-50  w-[98%] rounded-2xl  mt-8  max-w-[600px] lg:ml-[30%] xl:mt-0 2xl:mt-12"
        >
          <h6
            style={{ filter: "drop-shadow(3px 6px 6px rgb(24 24 27))" }}
            className="text-8xl text-primary Custom font-title font-semibold xl:text-9xl 2xl:text-[9rem]"
          >
            CONTACTO
          </h6>
          <p
            style={{ filter: "drop-shadow(3px 3px 3px rgb(24 24 27))" }}
            className="mt-2 text-stone-100 text-base font-semibold text-center text-balance lg:text-lg 2xl:text-xl "
          >
            Contact us to learn about pricing, deployment options and the lorem
            impsum.
          </p>
        </article>
        {/* FORM */}
        <section className="z-50 font-text2 mt-3 lg:ml-[30%] 2xl:mt-8">
          <div
            /* id="box-glass2" */
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            class="max-w-md w-full rounded-2xl  overflow-hidden py-6 space-y-4 lg:py-3"
          >
            <p
              className="text-stone-400 px-4 text-base font-semibold text-center text-balance xl:px-2"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              condimentum nisi lorem, ut congue metus efficitur id.
            </p>
            <form method="POST" action="#" className="mt-3 space-y-8 px-6 xl:space-y-4 2xl:space-y-8 ">
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="john@example.com"
                  className="peer h-10 w-full my-1 border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary  lg:text-stone-600 2xl:mt-6 lg:border-primary lg:focus:border-zinc-800"
                  required=""
                  id="email"
                  name="email"
                  type="email"
                />
                <label
                  className=" absolute left-0 my-1 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 peer-focus:text-base font-normal lg:text-stone-400 lg:peer-placeholder-shown:text-stone-600 2xl:mt-6"
                  for="email"
                >
                  Email address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white lg:text-stone-600 bg-transparent placeholder-transparent focus:outline-none focus:border-primary lg:border-primary lg:focus:border-zinc-800"
                  required=""
                  id="password"
                  name="password"
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 peer-focus:text-base font-normal lg:peer-placeholder-shown:text-stone-600 "
                >
                  WhatsApp
                </label>
              </div>
              <textarea
                name=""
                id="box-glass4"
                placeholder="Escribe tu consulta aquí"
                className="border border-whiteCustom rounded-2xl w-full h-[150px] placeholder:text-whiteCustom p-2 "
              ></textarea>

              <button
                className="w-full py-2 px-4  rounded-full shadow-lg shadow-zinc-900 border border-zinc-600 text-zinc-800 font-semibold transition duration-200 text-base bg-primary lg:border-[2px]"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </section>

        <footer className="absolute bottom-0 text-white font-medium lg:text-zinc-500">
          <Footer />
        </footer>
      </section>
    </>
  );
};
export default Contact;
