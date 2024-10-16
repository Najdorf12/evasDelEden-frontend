import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../assets/logo-removebg.png";
import Carrusel from "../components/Carrusel";
import Footer from "../components/Footer";
import AgeVerification from "../components/AgeVerification";
import CardEva from "../components/CardEva";
import { getEvasFilterByCategoryAndLocation } from "../api/handlers";
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
  const locations = ["Mendoza", "Cordoba", "Santa Fe", "Buenos Aires"];

  const categoryRefPlatinum = useRef(null);
  const categoryRefGold = useRef(null);
  const categoryRefSilver = useRef(null);

  const [isVerified, setIsVerified] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Categorias");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLocation, setSelectedLocation] = useState("Mendoza");

  const [allEvas, setAllEvas] = useState([]);
  console.log(allEvas);

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
        const evasData = await getEvasFilterByCategoryAndLocation(
          selectedLocation
        );

        // Ordenar las evas por la categoría en el orden deseado
        const orderedEvas = evasData.sort((a, b) => {
          const order = { Platinum: 1, Gold: 2, Silver: 3 };
          return order[a._id] - order[b._id];
        });

        setAllEvas(orderedEvas);
      } catch (error) {
        console.error("Failed to fetch evas:", error);
      }
    };

    fetchEvas();
  }, [selectedLocation]);

  if (!isVerified) {
    return <AgeVerification onConfirm={handleVerification} />;
  }

  return (
    <main className="bg-zinc-800 relative overflow-hidden min-h-[100dvh] pb-24 lg:px-14 xl:px-24 2xl:pb-40">
      <section className="w-full flex flex-col items-center z-50">
        <nav className="w-full flex justify-between items-center pr-2 mt-2 xl:mt-3 z-50">
          <div>
            <img src={imgLogo} alt="logo" className="w-14 xl:w-16  2xl:w-20" />
          </div>
          <Link to={"/contacto"}>
            <button
              id="btn-evadetail"
              className="px-6 py-1  flex items-center justify-center gap-1 text-sm xl:text-lg font-semibold 2xl:text-xl"
            >
              Publicar
            </button>
          </Link>
        </nav>

        <article className="self-start pl-3 flex flex-col items-start mt-6 xl:mt-8 2xl:mt-12  z-50 w-full">
          <h2 className="font-title text-zinc-700 text-7xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]">
            Evas del Eden
          </h2>

          <h3 className="text-whiteCustom -mt-2 text-2xl font-text2 lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Escorts - {selectedLocation}
          </h3>
        </article>

        <ul className="flex gap-6 text-base font-text2 text-zinc-500 mt-6 self-start lg:text-lg lg:mt-10  xl:mt-12 xl:gap-12 2xl:gap-14 2xl:text-xl 2xl:mt-16  z-50">
          <li className="relative flex flex-col justify-start items-start ">
            <div
              onClick={(e) => {
                setSelectedMenu("Categorias");
              }}
              className={`relative flex items-center ml-8 cursor-pointer text-base lg:text-lg  xl:text-2xl 2xl:text-3xl duration-400  px-1 xl:pb-1 ${
                selectedMenu === "Categorias"
                  ? "text-whiteCustom  border-b-[1px] xl:border-b-[2px] border-zinc-500"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-doughnut-chart text-lg absolute text-primary -left-6 xl:-left-[28px] lg:text-lg xl:text-xl 2xl:-left-[32px] 2xl:text-2xl ${
                  selectedMenu === "Categorias"
                    ? "text-purple-300 "
                    : "text-zinc-500"
                }`}
              ></i>
              Categorias
            </div>
          </li>
          <li className="relative flex flex-col justify-start items-start ">
            <div
              onClick={() => setSelectedMenu("Ubicacion")}
              className={`relative  flex items-center ml-8 cursor-pointer text-base lg:text-lg  xl:text-2xl 2xl:text-3xl duration-400  px-1 xl:pb-1 ${
                selectedMenu === "Ubicacion"
                  ? "text-whiteCustom  border-b-[1px] xl:border-b-[2px] border-zinc-500"
                  : "text-zinc-500"
              }`}
            >
              <i
                className={`bx bxs-map text-lg absolute text-primary -left-6 xl:-left-[28px] lg:text-lg xl:text-2xl 2xl:-left-[32px] 2xl:text-3xl  ${
                  selectedMenu === "Ubicacion"
                    ? "text-purple-300 "
                    : "text-zinc-500"
                }`}
              ></i>
              Ubicacion
            </div>
          </li>
        </ul>
        {selectedMenu === "Categorias" ? (
          <div className="flex gap-4 w-full  pl-3 mt-1 lg:gap-6  xl:mt-3 2xl:mt-4  z-50">
            <ul className="flex gap-5  font-text3  font-medium lg:gap-8 2xl:gap-12">
              <li
                onClick={() =>
                  categoryRefPlatinum.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center", // Coloca la sección en el centro de la vista
                  })
                }
                style={{
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                  boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
                }}
                className="flex justify-center items-center mt-3 rounded-full min-w-24  px-[18px] py-[2px] text-sm lg:text-base  lg:w-32 2xl:w-40  2xl:text-lg shadow-lg shadow-zinc-900 font-medium border border-zinc-500 text-whiteCustom"
              >
                Platinum
              </li>

              <li
                onClick={() =>
                  categoryRefGold.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center", // Coloca la sección en el centro de la vista
                  })
                }
                style={{
                  background:
                    "linear-gradient(to right,#77530a,#ffd277,#77530a,#77530a,#ffd277,#77530a)",
                  boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
                }}
                className="mt-3 rounded-full  min-w-24 px-[10px]  flex justify-center items-center py-[2px] text-sm lg:text-base  lg:w-32 2xl:w-40 2xl:text-lg shadow-lg shadow-zinc-900 font-medium border border-zinc-500 text-whiteCustom "
              >
                Gold
              </li>

              <li
                onClick={() =>
                  categoryRefSilver.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center", // Coloca la sección en el centro de la vista
                  })
                }
                style={{
                  background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                  boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
                }}
                className="mt-3 z-50 rounded-full  min-w-24 px-[10px]  flex justify-center items-center py-[2px] text-sm lg:text-base lg:px-[24px] 2xl:text-lg  lg:w-32 2xl:w-40 shadow-lg shadow-zinc-900 font-medium border border-zinc-500 text-whiteCustom"
              >
                Silver
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex font-text3 gap-4 w-full pl-3  lg:gap-6 mt-1 xl:mt-3 xl:gap-8 2xl:gap-10 2xl:mt-4 z-50">
            {locations.map((location) => (
              <button
                style={{
                  boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
                }}
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={` mt-3 rounded-full  px-[10px] py-[2px] text-[12px] lg:text-base lg:px-[24px] xl:px-[28px] 2xl:text-lg 2xl:px-[32px] shadow-lg shadow-zinc-900 font-medium ${
                  selectedLocation === location
                    ? "text-purple-600 border border-zinc-500 bg-white"
                    : "border text-zinc-400  border-purple-400"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="w-full mt-6 p-1 sm:p-2 flex flex-col items-center">
        {allEvas?.map((category) => {
          let categoryRef;

          // Asignar la referencia correcta según el nombre de la categoría
          switch (category?._id) {
            case "Platinum":
              categoryRef = categoryRefPlatinum;
              break;
            case "Gold":
              categoryRef = categoryRefGold;
              break;
            case "Silver":
              categoryRef = categoryRefSilver;
              break;
            default:
              categoryRef = null;
          }

          return (
            <div
              ref={
                category?._id === "Platinum"
                  ? categoryRefPlatinum
                  : category?._id === "Gold"
                  ? categoryRefGold
                  : categoryRefSilver
              }
              id={category?._id}
              key={category?._id}
              className="w-full flex flex-col"
            >
              <h5
                style={{
                  boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
                }}
                className="text-base text-stone-500 mb-4 ml-2 font-medium font-text2 self-start pl-2 min-w-32  border border-stone-600 rounded-lg flex justify-start items-center gap-2"
              >
                <i className="bx bxs-cube-alt text-xl xl:text-2xl 2xl:text-3xl text-purple-400"></i>
                {category?._id}
              </h5>
              <Carousel options={{ slidesToScroll: 2 }}>
                <CarouselSlides className="flex">
                  {category?.evas?.map((eva) => (
                    <CarouselItem
                      key={eva?._id}
                      className="flex-[0_0_50%] h-[23rem] pl-2 rounded-sm max-w-[300px] md:h-[25rem] 2xl:h-[28rem]"
                    >
                      <Link
                        to={`/${eva?._id}`}
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
              <div className="w-full mt-5 mb-10 xl:my-8 h-6 flex justify-center items-center">
                <div className="loader">
                  <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                  </div>
                  <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                  </div>
                  <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                  </div>
                  <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="w-full flex justify-center mt-6">
        <article
          style={{
            boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
          }}
          className="relative text-center font-text3 text-stone-500  self-center w-[95%] pl-4 pr-2 py-6 flex flex-col justify-center items-start gap-3 text-balance rounded-2xl border border-purple-400 lg:w-[520px]  xl:w-[620px] 2xl:w-[700px]"
        >
          <div className="absolute top-1 left-2 xl:top-2 xl:left-3 text-stone-700">
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div className="absolute top-1 right-2 xl:bottom-2 xl:right-3  text-stone-700">
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div className="absolute bottom-1 left-2 xl:top-2 xl:left-3 text-stone-700">
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <div className="absolute bottom-1 right-2 xl:bottom-2 xl:right-3  text-stone-700">
            <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
          </div>
          <h6 className="text-lg text-whiteCustom">
            Guía de las mejores escorts independientes.
          </h6>
          <p className="text-base">
            Todas los anuncios y publicaciones de productos o servicios son
            independientes. EvasdelEden NO posee relación ni vinculación laboral
            con los anunciantes. Sólo publicamos Fotografías y textos a expresa
            voluntad de los anunciantes. El sitio es un medio Visual
            Publicitario. Sitio sólo para mayores, en publicación y usuarios
            visitantes.
          </p>
        </article>
      </section>
      <footer className="absolute bottom-0 text-zinc-700 flex justify-center font-medium w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
