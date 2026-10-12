import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { locations } from "../api/locations";
import { preloadData, getCachedData } from "../api/preload";
const Footer = lazy(() => import("../components/Footer"));
const AgeVerification = lazy(() => import("../components/AgeVerification"));
import CardEva from "../components/CardEva";
import CustomSelect from "../components/CustomSelect";
import logo from "/0004.png";
import { getEvasByProvince } from "../api/handlers";
import icon from "/icon14.png";
import PageLoader from "../components/PageLoader";
import usePageLoader from "../hooks/usePageLoader";

const Home2 = () => {
  // Se lee de sessionStorage desde el primer render para que, al volver
  // desde otra página, no aparezca un instante la verificación de edad.
  const [isVerified, setIsVerified] = useState(
    () => sessionStorage.getItem("isVerified") === "true",
  );
  const [selectedProvince, setSelectedProvince] = useState(
    () => sessionStorage.getItem("userProvince") || "Mendoza",
  );
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allEvas, setAllEvas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Loader: visible mientras carga o hasta cumplir el tiempo mínimo
  const showLoader = usePageLoader(isLoading);

  useEffect(() => {
    getEvasByProvince(selectedProvince).then((data) => {
      setAllEvas(data);
    });
  }, [selectedProvince]);

  useEffect(() => {
    const verifyAndLoad = async () => {
      const storedVerification = sessionStorage.getItem("isVerified");
      const storedProvince = sessionStorage.getItem("userProvince");
      if (storedVerification === "true") {
        setIsVerified(true);
        if (storedProvince) setSelectedProvince(storedProvince);
        await loadData();
      }
    };

    verifyAndLoad();

    return () => {};
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const cachedData = getCachedData();
      if (cachedData) {
        setAllEvas(cachedData);
        return;
      }
      const data = await preloadData();
      setAllEvas(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const filteredEvas = useMemo(() => {
    // Primero filtramos por provincia
    const evasFromProvince = allEvas?.filter(
      (eva) => eva.detailLocation.province === selectedProvince,
    );

    // Si no hay región seleccionada o es la primera carga, mostrar todas
    if (!selectedRegion) return evasFromProvince;

    // Si hay región seleccionada, filtrar por región
    const evasFromRegion = evasFromProvince?.filter(
      (eva) => eva.detailLocation.region === selectedRegion,
    );

    // Si no hay ciudad seleccionada o es la primera ciudad de la región, mostrar todas de la región
    const firstCity =
      selectedRegion && locations[selectedProvince][selectedRegion][0];
    if (!selectedCity || selectedCity === firstCity) return evasFromRegion;

    // Finalmente, filtrar por ciudad si está seleccionada
    return evasFromRegion?.filter(
      (eva) => eva.detailLocation.city === selectedCity,
    );
  }, [allEvas, selectedProvince, selectedRegion, selectedCity]);

  const evasByCategory = useMemo(() => {
    const grouped = {
      Platinum: [],
      Gold: [],
      Silver: [],
    };

    filteredEvas?.forEach((eva) => {
      if (eva?.category === "Platinum") {
        grouped.Platinum?.push(eva);
      } else if (eva?.category === "Gold") {
        grouped.Gold?.push(eva);
      } else {
        grouped.Silver?.push(eva);
      }
    });

    return grouped;
  }, [filteredEvas]);

  // La provincia no se puede "limpiar" (clearable={false}), por eso no llega vacía
  const handleProvinceChange = (province) => {
    if (!province) return;
    setSelectedProvince(province);
    setSelectedRegion(null);
    setSelectedCity(null);
  };

  // Si llega vacío ("Todas las regiones") se limpian región y ciudad
  const handleRegionChange = (region) => {
    if (!region) {
      setSelectedRegion(null);
      setSelectedCity(null);
      return;
    }
    setSelectedRegion(region);
    setSelectedCity(locations[selectedProvince][region][0]);
  };

  // Si llega vacío ("Todas las ciudades") se muestran todas las de la región
  const handleCityChange = (city) => {
    setSelectedCity(city || null);
  };

  const handleVerification = (province) => {
    setIsVerified(true);
    if (province) setSelectedProvince(province);
    sessionStorage.setItem("isVerified", "true");
  };

  const scrollToCategory = (category) => {
    const sectionId = `${category.toLowerCase()}-section`;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      element.classList.add("highlight");
      setTimeout(() => {
        element.classList.remove("highlight");
      }, 2000);
    }
  };

  if (!isVerified) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-zinc-800" />}>
        <AgeVerification onConfirm={handleVerification} />
      </Suspense>
    );
  }
  return (
    <div className="flex flex-col min-h-[100dvh] bg-zinc-800 w-full overflow-hidden">
      <PageLoader show={showLoader} />
      <main className="bg-gradient-to-r from-zinc-900 via-purple-950 to-zinc-900  relative overflow-hidden min-h-[100dvh] pb-28 lg:pb-44">
        <section className="w-full flex flex-col items-center z-50 pb-3 xl:pb-4 ">
          <nav className="w-full flex justify-end xl:pr-12  -mt-1 z-50  xl:-mt-5">
            <img
              src={logo}
              className="w-36 xl:w-52 absolute -left-0 -top-1.5 lg:left-12"
              alt="logo"
              loading="eager"
              width="224"
              height="auto"
              fetchpriority="high"
            />
            <div className="flex items-center justify-center gap-3 pt-5 pr-2 lg:gap-6 lg:pt-12">
              <Link to={"/modelo/login"}>
                <button
                  className="w-full font-text py-1.5 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white text-xs transition duration-200  lg:px-10 lg:text-base 3xl:text-lg"
                  style={{
                    boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                  }}
                >
                  Iniciar Sesión
                </button>
              </Link>
              <Link to={"/contacto"}>
                <button
                  className="w-full font-text py-1.5 px-5 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white text-xs transition duration-200 lg:px-10 lg:text-base 3xl:text-lg"
                  style={{
                    boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                  }}
                >
                  Contacto
                </button>
              </Link>
            </div>
          </nav>

          <article className="w-full lg:px-10 xl:px-12">
            <div className="self-start pl-3 flex flex-col items-start mt-9 xl:mt-12 2xl:mt-6 z-50 w-full ">
              <h1 className="font-title relative text-whiteCustom text-7xl lg:text-[10rem] xl:text-[11rem] 2xl:text-[13rem]">
                Evas del Eden{" "}
                <div className="absolute top-5 -right-16 z-100 w-12 h-12 lg:h-36 lg:w-36 lg:-right-[200px] lg:top-4">
                  <img src={icon} alt="icon-home" className="w-full h-full" />
                </div>
              </h1>

              <h2 className="text-zinc-400  text-2xl font-text2 lg:text-3xl xl:text-4xl 2xl:text-5xl flex items-center gap-3 lg:gap-6 lg:-mt-1">
                Escorts - Argentina{" "}
                <div className="w-20 h-[1px] bg-purple-700 lg:w-[420px]"></div>
              </h2>
            </div>

            {/* ---------- FILTROS DE UBICACIÓN ---------- */}
            <div className="mt-7 w-full font-text3 flex flex-col md:flex-row items-start justify-start gap-3 px-4 lg:mt-9 max-w-[900px] self-start ">
              {/* Provincia */}
              <div className="flex w-full gap-1 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
                <label
                  htmlFor="home-province"
                  className="block text-zinc-500 text-sm w-[80px] lg:text-base"
                >
                  Provincia
                </label>
                <div className="relative inline-block text-left w-[250px]">
                  <CustomSelect
                    id="home-province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    options={Object.keys(locations)}
                    placeholder="Selecciona tu provincia"
                    clearable={false}
                  />
                </div>
              </div>

              {/* Región */}
              <div className="flex w-full gap-1 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
                <label
                  htmlFor="home-region"
                  className="block text-zinc-500 text-sm w-[80px] lg:text-base"
                >
                  Región
                </label>
                <div className="relative inline-block text-left w-[250px]">
                  <CustomSelect
                    id="home-region"
                    value={selectedRegion || ""}
                    onChange={handleRegionChange}
                    options={Object.keys(locations[selectedProvince] || {})}
                    placeholder="Selecciona tu región"
                    clearLabel="Todas las regiones"
                  />
                </div>
              </div>

              {/* Ciudad */}
              <div className="flex w-full gap-1 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
                <label
                  htmlFor="home-city"
                  className="block text-zinc-500 text-sm w-[80px] lg:text-base"
                >
                  Ciudad
                </label>
                <div className="relative inline-block text-left w-[250px]">
                  <CustomSelect
                    id="home-city"
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                    options={
                      selectedRegion
                        ? locations[selectedProvince]?.[selectedRegion] || []
                        : []
                    }
                    placeholder="Selecciona tu ciudad"
                    clearLabel="Todas las ciudades"
                    disabled={!selectedRegion}
                  />
                </div>
              </div>
            </div>
            <ul className="font-text2 text-sm w-full flex items-start justify-start gap-[9px] mt-7 lg:mt-9 lg:gap-6 pl-3 overflow-hidden lg:pl-4 lg:text-base 3xl:text-lg">
              <li
                onClick={() => scrollToCategory("platinum")}
                className="border-[2px] border-teal-800 pl-2 py-[1px] w-[122px] md:w-[150px] text-teal-600 rounded-lg hover:text-whiteCustom cursor-pointer flex items-center gap-2 lg:w-[200px] xl:w-[230px]"
              >
                <i className="bx bxs-cube-alt text-xl lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl text-teal-700"></i>
                Platinum
              </li>
              <li
                onClick={() => scrollToCategory("gold")}
                className="border-[2px] text-amber-500 border-amber-700 pl-2 py-[1px] w-[122px] md:w-[150px] rounded-lg hover:text-whiteCustom cursor-pointer flex items-center gap-2 lg:w-[200px] xl:w-[230px]"
              >
                <i className="bx bxs-cube-alt text-xl lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl text-amber-700"></i>
                Gold
              </li>
              <li
                onClick={() => scrollToCategory("silver")}
                className="border-[2px] border-slate-600 pl-2 py-[1px] w-[122px] md:w-[150px] text-slate-400 rounded-lg hover:text-whiteCustom cursor-pointer flex items-center gap-2 lg:w-[200px] xl:w-[230px]"
              >
                <i className="bx bxs-cube-alt text-xl lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl text-slate-600"></i>
                Silver
              </li>
            </ul>
          </article>

          {evasByCategory?.Platinum?.length > 0 && (
            <div
              id="platinum-section"
              className="mt-10 flex flex-col w-full px-2 min-h-[300px]  items-center justify-center  lg:mt-12 lg:px-12"
            >
              <div className="text-base text-teal-600 ml-2 font-text2 self-start pl-2 w-48 border-[2px] border-teal-800 rounded-lg flex justify-start items-center gap-2 lg:self-start lg:ml-4  lg:mb-2 xl:w-56 lg:py-[3px] xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-xl 2xl:text-2xl text-teal-700"></i>
                Platinum
                <div className="w-32 h-[1px] bg-teal-800"></div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-1 md:gap-3 lg:mt-3">
                {evasByCategory.Platinum?.map((eva) => (
                  <CardEva key={eva._id} eva={eva} />
                ))}
              </div>
            </div>
          )}

          {evasByCategory?.Gold?.length > 0 && (
             <div
              id="gold-section"
              className="mt-10 flex flex-col w-full px-2 min-h-[300px]  items-center justify-center  lg:mt-12 lg:px-12"
            >
              <div className="text-base text-amber-600 ml-2 font-text2 self-start pl-2 w-48 border-[2px] border-amber-800 rounded-lg flex justify-start items-center gap-2 lg:self-start lg:ml-4  lg:mb-2 xl:w-56 lg:py-[3px] xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-xl 2xl:text-2xl text-amber-700"></i>
                Gold
                <div className="w-32 h-[1px] bg-amber-700"></div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-1 md:gap-3 ">
                {evasByCategory.Gold?.map((eva) => (
                  <CardEva key={eva._id} eva={eva} />
                ))}
              </div>
            </div>
          )}

          {evasByCategory.Silver?.length > 0 && (
              <div
              id="silver-section"
              className="mt-10 flex flex-col w-full px-2 min-h-[300px]  items-center justify-center  lg:mt-12 lg:px-12"
            >
              <div className="text-base text-slate-400 ml-2 font-text2 self-start pl-2 w-48 border-[2px] border-slate-600 rounded-lg flex justify-start items-center gap-2 lg:self-start lg:ml-4  lg:mb-2 xl:w-56 lg:py-[3px] xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-xl 2xl:text-2xl text-slate-600"></i>
                Silver
                <div className="w-32 h-[1px] bg-slate-500"></div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-1 md:gap-3 ">
                {evasByCategory.Silver?.map((eva) => (
                  <CardEva key={eva._id} eva={eva} />
                ))}
              </div>
            </div>
          )}

          {filteredEvas?.length === 0 && !isLoading && (
            <div className="text-whiteCustom mt-12">
              No se encontraron Evas en esta ubicación
            </div>
          )}
        </section>

        <div className="absolute bottom-10 text-lg font-title text-zinc-200 flex items-center justify-center w-full gap-6 lg:gap-12 lg:text-3xl lg:bottom-12  ">
          <div className="w-28 h-[1px] bg-purple-600 lg:w-1/3"></div>
          <div className="flex gap-4  text-4xl lg:gap-4 xl:gap-8 xl:text-6xl 2xl:text-7xl 2xl:gap-10">
            <i className="bx bxs-cube-alt  text-zinc-200"></i>
            <i className="bx bxs-cube-alt  text-purple-900"></i>
            <i className="bx bxs-cube-alt  text-zinc-200"></i>
          </div>
          <div className="lg:w-1/3 w-28 h-[1px] bg-purple-600"></div>
        </div>
      </main>

      <Suspense fallback={<div className="h-32 bg-zinc-800" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home2;
