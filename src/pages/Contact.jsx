import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(to left, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
        }}
        className="relative flex flex-col items-center w-full h-[100dvh] overflow-hidden lg:bg-zinc-00"
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
          /* id="box-glass2" */
          className="flex flex-col justify-center font-text2 items-center z-50  w-[98%] rounded-2xl mt-12 lg:shadow-gray-400  max-w-[600px] lg:ml-[20%] xl:mt-0 2xl:mt-12"
        >
          <h6 className="text-7xl text-zinc-900 Custom font-title font-semibold xl:text-9xl 2xl:text-[9rem]">
            CONTACTO
          </h6>
          <p className="mt-2 text-stone-500 text-base font-semibold text-center text-balance lg:text-lg 2xl:text-xl ">
            Contact us to learn about pricing, deployment options and the lorem
            impsum.
          </p>
        </article>
        {/* FORM */}
        <section className="z-50 font-text2 lg:ml-[20%] 2xl:mt-8">
          <div
            /* id="box-glass2" */
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            class="max-w-md w-full rounded-2xl  overflow-hidden py-6 space-y-4"
          >
            <h2
              style={{ animation: "appear 2s ease-out" }}
              class="text-center text-[3rem]  font-extrabold text-white 2xl:text-[4rem]"
            >
              Welcome
            </h2>
            <p
              style={{ animation: "appear 3s ease-out" }}
              className="text-stone-500 text-base font-semibold text-center text-balance xl:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
              impsum.
            </p>
            <form method="POST" action="#" className="space-y-8 px-6 2 ">
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="john@example.com"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary  lg:text-stone-600 2xl:mt-6"
                  required=""
                  id="email"
                  name="email"
                  type="email"
                />
                <label
                  className=" absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-500 peer-focus:text-base font-normal lg:text-stone-400 lg:peer-placeholder-shown:text-stone-600 2xl:mt-6"
                  for="email"
                >
                  Email address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white lg:text-stone-600 bg-transparent placeholder-transparent focus:outline-none focus:border-primary "
                  required=""
                  id="password"
                  name="password"
                />
                <label className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-500 peer-focus:text-base font-normal lg:peer-placeholder-shown:text-stone-600 ">
                  WhatsApp
                </label>
              </div>

              <button
                className="w-full py-2 px-4  rounded-full shadow-lg text-zinc-800 font-semibold transition duration-200 text-base bg-primary"
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
