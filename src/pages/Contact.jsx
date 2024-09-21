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
        className="relative flex flex-col items-center w-full h-[100dvh] overflow-hidden lg:bg-zinc-300"
      >
        <nav className="w-full flex justify-between items-center pr-2 mt-2 z-50">
          <div>
            <img src={imgLogo} alt="logo" className="w-14" />
          </div>
          <Link to={"/"}>
            <button className="pl-2 text-lg border-l-[3px] border-zinc-600 font-text2 text-whiteCustom">
              Volver
            </button>
          </Link>
        </nav>
        <section
          id="verification"
          className="w-full h-screen absolute inset-0 "
        ></section>
        <article
          /* id="box-glass2" */
          className="flex flex-col justify-center font-text2 items-center z-50 py-6 px-2  w-[98%] rounded-2xl mt-12 lg:shadow-gray-400"
        >
          <h6 className="text-7xl text-zinc-900 font-title font-semibold">
            CONTACTO
          </h6>
          <p className="mt-2 text-white text-base font-medium text-center text-balance lg:text-xl">
            Contact us to learn about pricing, deployment options and the lorem
            impsum.
          </p>
        </article>
        {/* FORM */}
        <section className="z-50 font-text2">
          <div
            /* id="box-glass2" */
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            class=" mt-4 max-w-md w-full rounded-2xl  overflow-hidden py-8 space-y-8"
          >
            <h2
              style={{ animation: "appear 2s ease-out" }}
              class="text-center text-[3rem] font-extrabold text-white"
            >
              Welcome
            </h2>
            <p
              style={{ animation: "appear 3s ease-out" }}
              class="text-black text-base font-medium text-center text-balance lg:text-xl"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
              impsum.
            </p>
            <form method="POST" action="#" class="space-y-6 px-6">
              <div class="relative">
                <input
                  autoComplete="off"
                  placeholder="john@example.com"
                  class="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                  required=""
                  id="email"
                  name="email"
                  type="email"
                />
                <label
                  class="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-base font-medium"
                  for="email"
                >
                  Email address
                </label>
              </div>
              <div class="relative">
                <input
                  autoComplete="off"
                  placeholder="Password"
                  class="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
                  required=""
                  id="password"
                  name="password"
                  type="password"
                />
                <label
                  class="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-300 peer-focus:text-base font-medium"
                  for="password"
                >
                  Password
                </label>
              </div>

              <button
                class="w-full py-2 px-4 bg-white rounded-full shadow-lg text-zinc-800 font-semibold transition duration-200 text-base"
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
