import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../assets/logo-removebg.png";
import Carrusel from "../components/Carrusel";
import Footer from "../components/Footer";
import AgeVerification from "../components/AgeVerification";
import CardEva from "../components/CardEva";
import { getEvas } from "../api/handlers";
import {
  Carousel,
  CarouselButtons,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselNextButton,
  CarouselPrevButton,
  CarouselSlides,
} from "keep-react";
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
                    ? "text-purple-300"
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
                    ? "text-purple-300"
                    : "text-zinc-500"
                }`}
              ></i>
              Ubicacion
            </div>
          </li>
        </ul>
        {selectedMenu === "Categorias" ? (
          <div className="flex gap-4 w-full  pl-3 lg:gap-6 lg:mt-1 2xl:mt-2  z-50">
            <ul className="flex gap-5  font-text2 font-medium">
              <li
                style={{
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                }}
                className="flex justify-center items-center mt-3 rounded-full min-w-24  px-[18px] py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 font-medium border border-zinc-700 text-whiteCustom"
              >
                Platinum
              </li>
              <li
                style={{
                  background:
                    "linear-gradient(to right,#77530a,#ffd277,#77530a,#77530a,#ffd277,#77530a)",
                }}
                className="mt-3 rounded-full  min-w-24 px-[10px]  flex justify-center items-center py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 font-medium border border-zinc-700 text-whiteCustom"
              >
                Gold
              </li>
              <li
                style={{
                  background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                }}
                className="mt-3 rounded-full  min-w-24 px-[10px]  flex justify-center items-center py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 font-medium border border-zinc-700 text-whiteCustom"
              >
                Silver
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-4 w-full pl-3  lg:gap-6 lg:mt-1 2xl:mt-2 z-50">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={` mt-3 rounded-full  px-[10px] py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 md:font-medium ${
                  selectedLocation === location
                    ? "text-purple-600 border border-whiteCustom bg-white"
                    : "border text-zinc-400  border-purple-400"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="w-full  mt-6 p-1 sm:p-2 flex justify-center items-center">
        <Carousel options={{ slidesToScroll: 2 }}>
          <CarouselSlides className="flex">
            {allEvas?.map((eva) => (
              <CarouselItem
                key={eva._id}
                className="flex-[0_0_50%] h-[23rem] pl-2 rounded-sm max-w-[300px] md:h-[25rem] 2xl:h-[28rem]"
              >
                <Link
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20 rounded-sm"
                >
                  <CardEva eva={eva} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselSlides>
          <CarouselControl>
            <CarouselButtons>
              <CarouselPrevButton />
              <CarouselNextButton />
            </CarouselButtons>
            <CarouselIndicators />
          </CarouselControl>
        </Carousel>
      </section>
      <div className="flex gap-6 mt-5 text-8xl w-full justify-center ">
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
        <i className="bx bxs-cube-alt  text-zinc-100"></i>
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
      </div>
      <section className="w-full  mt-10 p-1 sm:p-2 flex justify-center items-center">
        <Carousel options={{ slidesToScroll: 2 }}>
          <CarouselSlides className="flex">
            {allEvas?.map((eva) => (
              <CarouselItem
                key={eva._id}
                className="flex-[0_0_50%] h-[23rem] pl-2 rounded-sm max-w-[300px] md:h-[25rem] 2xl:h-[28rem]"
              >
                <Link
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20 rounded-sm"
                >
                  <CardEva eva={eva} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselSlides>
          <CarouselControl>
            <CarouselButtons>
              <CarouselPrevButton />
              <CarouselNextButton />
            </CarouselButtons>
            <CarouselIndicators />
          </CarouselControl>
        </Carousel>
      </section>
      <div className="flex gap-6 mt-5 text-8xl w-full justify-center">
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
        <i className="bx bxs-cube-alt  text-zinc-100"></i>
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
      </div>
      <section className="w-full  mt-6 p-1 sm:p-2 flex justify-center items-center">
        <Carousel options={{ slidesToScroll: 2 }}>
          <CarouselSlides className="flex">
            {allEvas?.map((eva) => (
              <CarouselItem
                key={eva._id}
                className="flex-[0_0_50%] h-[23rem] pl-2 rounded-sm max-w-[300px] md:h-[25rem] 2xl:h-[28rem]"
              >
                <Link
                  to={`/${eva._id}`}
                  className="block w-full h-full relative z-20 rounded-sm"
                >
                  <CardEva eva={eva} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselSlides>
          <CarouselControl>
            <CarouselButtons>
              <CarouselPrevButton />
              <CarouselNextButton />
            </CarouselButtons>
            <CarouselIndicators />
          </CarouselControl>
        </Carousel>
      </section>
      <div className="flex gap-6 mt-5 text-8xl justify-center">
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
        <i className="bx bxs-cube-alt  text-zinc-100"></i>
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
      </div>

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
