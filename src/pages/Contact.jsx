import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "/0004.png";
import axios from "../api/axios";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/send-email", data);
      console.log("Correo enviado:", response.data);
    } catch (err) {
      console.error(
        "Error al enviar el correo:",
        err.response?.data || err.message
      );
    }
  };
  const wttp = "+54 9 3534 41-6561";
  const wttp2 = "+54 9 ";

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
        <article
          /* id="box-glass4" */
          className="flex flex-col justify-center font-text2 items-center z-50 w-[98%] rounded-2xl mt-5 max-w-[600px] lg:ml-[30%] lg:-mt-12 xl:mt-0 2xl:max-w-[800px]"
        >
          <h6
            style={{ filter: "drop-shadow(3px 6px 6px rgb(24 24 27))" }}
            className="text-8xl text-stone-100 font-title font-semibold lg:text-white xl:text-9xl 2xl:text-[10rem]"
          >
            CONTACTO
          </h6>
          <p
            id="box-glass3"
            /*   style={{ filter: "drop-shadow(3px 3px 3px rgb(24 24 27))" }} */
            className="mt-5 py-3 rounded-lg text-stone-400 text-base font-semibold text-center px-2 w-[90%] border border-stone-600 text-balance max-w-[500px]  lg:mt-3 lg:border-[0px] lg:text-stone-500 2xl:max-w-[700px] 2xl:text-xl "
          >
            Contactate para publicarte con nosotros y conocer nuestros
            servicios, productos disponibles como así también promociones de
            publicación.
          </p>
          <ul
            id="box-glass2"
            className="mt-14 border rounded-lg border-purple-400 text-stone-200 text-base flex flex-col gap-2 px-2 py-3 text-balance w-[90%] lg:border-[0px] max-w-[500px] lg:max-w-[900px] lg:text-nowrap lg:mt-6 lg:text-stone-400   2xl:text-xl "
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
              EvasDelEden no es una agencia por tal motivo no se  responsabiliza
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

        {/* FORM */}
        {/*  <section className="z-50 w-full font-text2 mt-3 flex justify-center items-center lg:mt-0 lg:ml-[30%]  ">
          <div
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            class="max-w-md w-full rounded-2xl  overflow-hidden space-y-4 lg:py-3"
          >
           
            <form  onSubmit={handleSubmit(onSubmit)}  className="mt-3 w-full space-y-7 px-6 xl:space-y-4 2xl:space-y-8 font-medium 2xl:mt-0 ">
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="john@example.com"
                  className="peer h-10 w-full my-1 border-b-2 border-purple-500 text-white bg-transparent placeholder-transparent focus:outline-none   lg:text-stone-600 2xl:mt-6  lg:focus:border-zinc-800"
                  required=""
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                />
                <label
                  className=" absolute left-0 my-1 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 peer-focus:text-base lg:peer-focus:text-stone-400  lg:text-stone-400 lg:peer-placeholder-shown:text-stone-600 2xl:mt-6"
                  for="email"
                >
                  Email address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  placeholder="wttp"
                  className="peer h-10 w-full border-b-2  text-white lg:text-stone-600 bg-transparent placeholder-transparent focus:outline-none  border-purple-500 lg:focus:border-zinc-800"
                  required=""
                  id="wttp"
                  name="wttp"
                  {...register("wttp")}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 lg:peer-focus:text-stone-400 peer-focus:text-base  lg:peer-placeholder-shown:text-stone-600 "
                >
                  WhatsApp
                </label>
              </div>
              <textarea
                name=""
                id="box-glass4"
                placeholder="Escribe tu consulta aquí"
                className="border-[2px] border-whiteCustom text-white rounded-2xl w-full h-[190px] placeholder:text-whiteCustom lg:placeholder:text-stone-400 p-2 focus:outline-none  focus:border-purple-600 lg:border-purple-600 lg:focus:border-whiteCustom "
                {...register("message")}
              ></textarea>

              <button
                className="w-full py-2 px-4  rounded-full shadow-lg shadow-zinc-900 border-[2px] border-purple-500 text-whiteCustom font-semibold transition duration-200 text-base bg-zinc-800 lg:shadow-none lg:border-[2px] xl:py-1 2xl:py-2"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>
        </section> */}

        <footer className="fixed bottom-0 text-white font-medium lg:text-zinc-500">
          <Footer />
        </footer>
      </section>
    </>
  );
};
export default Contact;
