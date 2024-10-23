import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Resend } from 'resend';
import logo from "/0004.png"

/* const resend = new Resend('re_gcgSBD6n_NHfcokuaS34gDp7Rc4bm2yKp'); */

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://evas-del-eden-backend.vercel.app/api/email/send-email', {  // Asegúrate de que sea la URL correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Correo enviado:', result);
        reset();  // Resetea el formulario después de enviar el correo
      } else {
        console.error('Error al enviar el correo:', result.error);
      }
    } catch (err) {
      console.error('Error en la solicitud:', err);
    }
  };
  
  return (
    <>
      <section
        className="relative flex flex-col items-center w-full h-[100dvh] overflow-hidden lg:bg-zinc-300"
      >
        <nav className="w-full flex justify-between items-center pr-2 -mt-7 z-50 lg:px-[4%]">
          <div>
          <img src={logo} className="w-52 2xl:w-56 " alt="logo" />
          </div>
          <Link to={"/"}>
            <button
              id="btn-evadetail"
              className="px-6 py-1  flex items-center justify-center gap-1 text-sm xl:text-lg font-semibold 2xl:text-xl"
            >
              Volver al Inicio
            </button>
          </Link>
        </nav>
        <section
          id="contact"
          className="w-full h-screen absolute inset-0 "
        ></section>
        <article
          /* id="box-glass4" */
          className="flex flex-col justify-center font-text2 items-center z-50  w-[98%] rounded-2xl  mt-6  max-w-[600px] lg:ml-[30%] lg:-mt-2  2xl:mt-0"
        >
          <h6
            style={{ filter: "drop-shadow(3px 6px 6px rgb(24 24 27))" }}
            className="text-8xl text-stone-100 font-title font-semibold xl:text-9xl 2xl:text-[9rem]"
          >
            CONTACTO
          </h6>
          <p
          /*   style={{ filter: "drop-shadow(3px 3px 3px rgb(24 24 27))" }} */
            className="mt-2 text-stone-600 text-base font-semibold text-center px-2 text-balance lg:text-lg 2xl:text-xl "
          >
            Contactate para publicarte con nosotros y conocer nuestros servicios, productos disponibles como así también promociones de publicación. 
          </p>
        </article>
        {/* FORM */}
        <section className="z-50 w-full font-text2 mt-3 lg:ml-[30%] 2xl:mt-8">
          <div
            /* id="box-glass2" */
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            class="max-w-md w-full rounded-2xl  overflow-hidden space-y-4 lg:py-3"
          >
           
            <form  onSubmit={handleSubmit(onSubmit)}  className="mt-3 w-full space-y-7 px-6 xl:space-y-4 2xl:space-y-8 ">
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
                  className=" absolute left-0 my-1 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 peer-focus:text-base font-normal lg:text-stone-400 lg:peer-placeholder-shown:text-stone-600 2xl:mt-6"
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
                  className="absolute left-0 -top-3.5 text-gray-800 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-stone-300 peer-focus:text-base font-normal lg:peer-placeholder-shown:text-stone-600 "
                >
                  WhatsApp
                </label>
              </div>
              <textarea
                name=""
                id="box-glass4"
                placeholder="Escribe tu consulta aquí"
                className="border-[2px] border-whiteCustom text-white rounded-2xl w-full h-[190px] placeholder:text-whiteCustom p-2 focus:outline-none  focus:border-purple-600 "
                {...register("message")}
              ></textarea>

              <button
                className="w-full py-2 px-4  rounded-full shadow-lg shadow-zinc-900 border-[2px] border-purple-500 text-whiteCustom font-semibold transition duration-200 text-base bg-zinc-800 lg:border-[2px] xl:py-1 2xl:py-2"
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
