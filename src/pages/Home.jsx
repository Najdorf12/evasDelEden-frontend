import { useEffect } from "react";
import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";

const Home = ({ allEvas }) => {
 

  return (
    <main className="bg-zinc-800">
        <section className="w-full h-[100dvh] flex flex-col items-center">
          <nav className=" w-full flex  justify-between items-center pr-1 mt-2">   
            <div>
              <img src={imgLogo} alt="logo" 
              className="w-16"
              />
            </div>
            <button className="px-5 text-base rounded-full border border-zinc-600  font-text2 text-whiteCustom">Contacto</button>
          </nav>
          <article className="self-start pl-3 flex flex-col items-start mt-4">
          <h2 className="font-title text-zinc-700 text-7xl sm:text-8xl">Evas del Eden</h2>
          <h3 className="text-whiteCustom text-2xl font-text2">Escorts Mendoza</h3>
          </article>
          <ul className="flex gap-6 text-base font-text2 text-zinc-500 mt-6 self-start pl-3">
              <li className="px-2 pb-1 border-b border-zinc-300">Categorias</li>
              <li className="px-2 pb-1 ">Ubicacion</li>
            </ul>
        </section>
        <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
