import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../assets/logo-removebg.png";
import Carrusel from "../components/Carrusel";
import Footer from "../components/Footer";
import AgeVerification from "../components/AgeVerification";
import CardEva from "../components/CardEva";
import { getEvas } from "../api/handlers";

/* import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP); */

const Home = () => {
  const categories = ["Todas", "Platinum", "Gold", "Silver"];
  const locations = ["Mendoza", "Córdoba", "Santa Fe", "Buenos Aires"];

  const [isVerified, setIsVerified] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Categorias");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLocation, setSelectedLocation] = useState("Mendoza");

  const [allEvas, setAllEvas] = useState([]);

  useEffect(() => {
    const storedVerification = sessionStorage.getItem("isVerified");
    if (storedVerification === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleVerification = () => {
    setIsVerified(true);
    sessionStorage.setItem("isVerified", "true");
  };

  useEffect(() => {
    const fetchEvas = async () => {
      try {
        const evasData = await getEvas();
        setAllEvas(evasData);
      } catch (error) {
        console.error("Failed to fetch evas:", error);
      }
    };

    fetchEvas();
  }, []);

  if (!isVerified) {
    return <AgeVerification onConfirm={handleVerification} />;
  }

  return (
    <main className="bg-zinc-800 relative overflow-hidden min-h-[100dvh] pb-24 xl:px-32 2xl:pb-40">
      <section className="w-full flex flex-col items-center z-50">
        <nav className="w-full flex justify-between items-center pr-2 mt-2 xl:mt-3 z-50">
          <div>
            <img src={imgLogo} alt="logo" className="w-14 xl:w-16  2xl:w-20" />
          </div>
          <Link to={"/contacto"}>
            <button className="pl-2 text-base border-l-[3px] border-zinc-600 font-text2 text-whiteCustom xl:text-lg 2xl:text-xl">
              Contacto
            </button>
          </Link>
        </nav>

        <article className="self-start pl-3 flex flex-col items-start mt-6 xl:mt-6 2xl:mt-12  z-50 w-full">
          <h2 className="font-title text-zinc-700 text-7xl lg:text-9xl 2xl:text-[10rem]">
            Evas del Eden
          </h2>
          <h3 className="text-whiteCustom -mt-2 text-2xl font-text2 lg:text-3xl 2xl:text-4xl">
            Escorts - Mendoza
          </h3>
        </article>

        <ul className="flex gap-6 text-base font-text2 text-zinc-500 mt-8 self-start lg:text-lg 2xl:text-xl 2xl:mt-10  z-50">
          <li className="relative flex flex-col justify-start items-start ">
            <div
              onClick={(e) => {
                setSelectedMenu("Categorias");
              }}
              className={`relative flex items-center ml-8 cursor-pointer ${
                selectedMenu === "Categorias"
                  ? "text-whiteCustom"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-doughnut-chart text-lg absolute text-primary -left-6 ${
                  selectedMenu === "Categorias"
                    ? "text-primary"
                    : "text-zinc-500"
                }`}
              ></i>
              Categorias
            </div>
          </li>
          <li className="relative flex flex-col justify-start items-start">
            <div
              onClick={() => setSelectedMenu("Ubicacion")}
              className={`relative  flex items-center ml-8 cursor-pointer ${
                selectedMenu === "Ubicacion"
                  ? "text-whiteCustom"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-map text-lg absolute text-primary -left-6 ${
                  selectedMenu === "Ubicacion"
                    ? "text-primary"
                    : "text-zinc-500"
                }`}
              ></i>
              Ubicacion
            </div>
          </li>
        </ul>
        {selectedMenu === "Categorias" ? (
          <div className="flex gap-4 w-full pl-3 lg:gap-6 lg:mt-1 2xl:mt-2  z-50">
            <ul className="flex gap-5 mt-3 font-text2">
              <li
                style={{
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                }}
                className="rounded-lg px-4 py-[1px] flex items-center justify-center text-whiteCustom border-zinc-600 border shadow-lg shadow-zinc-900"
              >
                Platinum
              </li>
              <li
                style={{
                  background: "linear-gradient(to right,#77530a,#ffd277,#77530a,#77530a,#ffd277,#77530a)",
                }}
                className="rounded-lg px-8 py-[1px] flex items-center justify-center text-whiteCustom border-zinc-600 border shadow-lg shadow-zinc-900"
              >
                Gold
              </li>
              <li
                style={{
                  background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                }}
                className="rounded-lg px-7 py-[1px] flex items-center justify-center text-whiteCustom border-zinc-600 border shadow-lg shadow-zinc-900"
              >
                Silver
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-1 flex gap-4 w-full pl-3  lg:gap-6 lg:mt-1 2xl:mt-2 z-50">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={` mt-3 rounded-lg px-[10px] py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 ${
                  selectedLocation === location
                    ? "bg-zinc-700 text-primary"
                    : "border border-zinc-700 text-zinc-400"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="w-full px-3 h-[25rem] mt-9 relative flex justify-start items-start py-2  lg:mt-12 xl:mt-14 2xl:mt-20 ">
        <div className="flex justify-center items-center gap-3 w-fit h-full pl-3 ">
          <div className=" w-fit  z-10 ">
            <Carrusel autoSlide={false}>
              {allEvas.map((eva) => (
                <Link
                  key={eva._id}
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20"
                >
                  <CardEva eva={eva} />
                </Link>
              ))}
            </Carrusel>
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col items-center justify-center lg:mt-16 mt-9">
        <div className="w-[45%] h-2 bg-zinc-600 rounded-sm lg:w-[25%]"></div>
        <div className="w-[30%] h-2 bg-primary rounded-bl-sm rounded-br-sm lg:w-[20%] "></div>
      </div>

      <section className="w-full px-3 h-[25rem] mt-9 relative flex justify-start items-start py-2  lg:mt-12 xl:mt-14 2xl:mt-20 ">
        <div className="flex justify-center items-center gap-3 w-fit h-full pl-3 ">
          <div className=" w-fit  z-10 ">
            <Carrusel autoSlide={false}>
              {allEvas.map((eva) => (
                <Link
                  key={eva._id}
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20"
                >
                  <CardEva eva={eva} />
                </Link>
              ))}
            </Carrusel>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col items-center justify-center lg:mt-16 mt-9">
        <div className="w-[45%] h-2 bg-zinc-600 rounded-sm lg:w-[25%]"></div>
        <div className="w-[30%] h-2 bg-primary rounded-bl-sm rounded-br-sm lg:w-[20%] "></div>
      </div>

      <section className="w-full px-3 h-[25rem] mt-9 relative flex justify-start items-start py-2  lg:mt-12 xl:mt-14 2xl:mt-20 ">
        <div className="flex justify-center items-center gap-3 w-fit h-full pl-3 ">
          <div className=" w-fit  z-10 ">
            <Carrusel autoSlide={false}>
              {allEvas.map((eva) => (
                <Link
                  key={eva._id}
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20"
                >
                  <CardEva eva={eva} />
                </Link>
              ))}
            </Carrusel>
          </div>
        </div>
      </section>
      <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
{
  /* <button
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`z-50 mt-3 rounded-full px-4 py-[1px] text-sm lg:text-base lg:px-[24px] lg:mt-4 2xl:text-lg 2xl:px-[32px] ${
                  selectedCategory === category
                    ? "bg-zinc-700 text-primary"
                    : "border border-zinc-700 text-zinc-500"
                }`}
              >
                {category}
              </button> */
}
