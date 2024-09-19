import { useEffect, useState } from "react";
import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";

const Home = ({ allEvas }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const categories = ["Todas", "Platinum", "Gold", "Silver"];
  return (
    <main className="bg-zinc-800 relative overflow-hidden">
     {/*  <div className="absolute -right-[50%] top-[60%] w-[110%] h-[1px] bg-primary rotate-[130deg]"></div>
      <div className="absolute -right-[50%] top-[60%] w-[70%] h-[1px] bg-primary rotate-[130deg]"></div> */}
      <section className="w-full h-[100dvh] flex flex-col items-center">
        <nav className=" w-full flex justify-between items-center pr-1 mt-2">
          <div>
            <img src={imgLogo} alt="logo" className="w-16" />
          </div>
          <button className="pl-3 text-base border-l-[3px] border-zinc-600 font-text2 text-whiteCustom">
            Contacto
          </button>
        </nav>
        <article className="self-start pl-3 flex flex-col items-start mt-4">
          <h2 className="font-title text-zinc-700 text-7xl ">Evas del Eden</h2>
          <h3 className="text-whiteCustom text-2xl font-text2">
            Escorts - Mendoza
          </h3>
        </article>
        <ul className="flex gap-6 text-base font-text2 text-zinc-500 mt-6 self-start">
          <li className="relative flex flex-col justify-start items-start">
            <div className="relative pr-3 pb-[2px] border-b border-zinc-600 flex items-center ml-8">
              <i className="bx bxs-doughnut-chart text-lg absolute -left-6"></i>
              Categorias
            </div>
            <div className="flex gap-4 w-full pl-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`mt-3 rounded-full px-4 text-sm ${
                    selectedCategory === category
                      ? "bg-zinc-700 text-primary"
                      : "border border-zinc-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </section>
      <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
