import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { locations } from "../api/locations";
import { preloadData, getCachedData } from "../api/preload";
const Footer = lazy(() => import("../components/Footer"));
const AgeVerification = lazy(() => import("../components/AgeVerification"));
import CardEva from "../components/CardEva";
import logo from "/0004.png";
import { getEvasByProvince } from "../api/handlers";

const Home2 = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Mendoza");
  const [selectedRegion, setSelectedRegion] = useState("Gran Mendoza");
  const [selectedCity, setSelectedCity] = useState("Mendoza Capital");
  const [allEvas, setAllEvas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({
    province: false,
    region: false,
    city: false,
  });

  useEffect(() => {
    getEvasByProvince(selectedProvince).then((data) => {
      setAllEvas(data);
    });
  }, [selectedProvince]);
  useEffect(() => {
    const verifyAndLoad = async () => {
      const storedVerification = sessionStorage.getItem("isVerified");
      if (storedVerification === "true") {
        setIsVerified(true);
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
    return allEvas?.filter((eva) => {
      if (eva.detailLocation.region !== selectedRegion) return false;

      const firstCity = locations[selectedProvince][selectedRegion][0];
      if (selectedCity && selectedCity !== firstCity) {
        return eva.detailLocation.city === selectedCity;
      }
      return true;
    });
  }, [allEvas, selectedRegion, selectedCity, selectedProvince]);

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

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    const regions = Object.keys(locations[province]);
    setSelectedRegion(regions[0]);
    setSelectedCity(locations[province][regions[0]][0]);
    setOpenDropdown({ ...openDropdown, province: false });
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedCity(locations[selectedProvince][region][0]);
    setOpenDropdown({ ...openDropdown, region: false });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setOpenDropdown({ ...openDropdown, city: false });
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown({
      ...openDropdown,
      [dropdown]: !openDropdown[dropdown],
    });
  };

  const handleVerification = () => {
    setIsVerified(true);
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
      <main className="bg-zinc-800 relative overflow-hidden min-h-[100dvh] pb-32 lg:px-14 xl:px-24 xl:pb-40 2xl:pb-48">
        <section className="w-full flex flex-col items-center z-50 pb-3 xl:pb-4">
          <nav className="w-full flex justify-between items-center pr-2 -mt-3 z-50 -ml-2 xl:-mt-4">
            <img
              src={logo}
              className="w-44 xl:w-56"
              alt="logo"
              loading="eager"
              width="224"
              height="auto"
              fetchpriority="high"
            />
            <Link to={"/contacto"}>
              <button
                id="btn-evadetail"
                className="px-6 py-1 flex items-center justify-center gap-1 text-sm xl:text-lg  xl:px-10 2xl:text-xl"
              >
                Publicar
              </button>
            </Link>
          </nav>

          <div className="self-start pl-3 flex flex-col items-start mt-2 xl:mt-0 2xl:mt-6 z-50 w-full">
            <h1 className="font-title text-whiteCustom text-7xl lg:text-[10rem] xl:text-[11rem] 2xl:text-[13rem]">
              Evas del Eden
            </h1>

            <h2 className="text-zinc-500 -mt-2 text-2xl font-text2 lg:text-3xl xl:text-4xl 2xl:text-5xl">
              Escorts - Argentina
            </h2>
          </div>

          <div className="mt-7 w-full font-text3 flex flex-col md:flex-row items-start justify-start gap-3 px-4 lg:mt-9 max-w-[900px] self-start ">
            <div className="flex w-full gap-3 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
              <label className="block text-zinc-600 text-sm w-[90px] lg:mb-2 lg:text-base">
                Provincia
              </label>
              <div className="relative inline-block text-left w-[250px]">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-between items-center rounded-md px-3 py-[6px] text-sm  text-zinc-100 shadow-xs ring-1 ring-zinc-600 hover:bg-purple-700 bg-purple-600"
                    onClick={() => toggleDropdown("province")}
                  >
                    {selectedProvince}
                    <svg
                      className={`-mr-1 size-5 text-gray-400 transition-transform ${
                        openDropdown.province ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {openDropdown.province && (
                  <div
                    className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md sha bg-zinc-700dow-lg ring-1 ring-zinc-700 focus:outline-none"
                    role="menu"
                  >
                    <div className="max-h-60 overflow-y-auto" role="none">
                      {Object.keys(locations).map((province) => (
                        <button
                          key={province}
                          className={`block w-full px-4 py-[6px] bg-zinc-700 text-stone-400 text-left text-sm z-50 relative ${
                            selectedProvince === province
                              ? "bg-purple-600 text-white "
                              : "text-purple-300 hover:bg-purple-600"
                          }`}
                          role="menuitem"
                          onClick={() => handleProvinceChange(province)}
                        >
                          {province}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full gap-3 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
              <label className="block text-zinc-600 text-sm w-[90px] lg:mb-2 lg:text-base">
                Región
              </label>
              <div className="relative inline-block text-left w-[250px]">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-between items-center rounded-md px-3 py-[6px] text-sm  text-zinc-100 shadow-xs ring-1 ring-zinc-600 hover:bg-purple-600 "
                    onClick={() => toggleDropdown("region")}
                  >
                    {selectedRegion}
                    <svg
                      className={`-mr-1 size-5 text-gray-400 transition-transform ${
                        openDropdown.region ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {openDropdown.region && (
                  <div
                    className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-zinc-700 focus:outline-none"
                    role="menu"
                  >
                    <div className="py-1 max-h-60 overflow-y-auto" role="none">
                      {selectedProvince &&
                        Object.keys(locations[selectedProvince])?.map(
                          (region) => (
                            <button
                              id="box-glass3"
                              key={region}
                              className={`block w-full px-4 py-[6px] bg-zinc-700 text-stone-400 text-left text-sm z-40 ${
                                selectedRegion === region
                                  ? "bg-purple-600 text-white "
                                  : "text-gray-300 hover:bg-purple-600"
                              }`}
                              role="menuitem"
                              onClick={() => handleRegionChange(region)}
                            >
                              {region}
                            </button>
                          )
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full gap-3 items-center justify-start lg:flex-col lg:items-start lg:gap-0">
              <label className="block text-zinc-600 text-sm w-[90px] lg:mb-2 lg:text-base">
                Ciudad
              </label>
              <div className="relative inline-block text-left w-[250px]">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-between items-center text-sm rounded-md px-3 py-[6px]  text-zinc-100 shadow-xs ring-1 ring-zinc-600 hover:bg-purple-600 "
                    onClick={() => toggleDropdown("city")}
                  >
                    {selectedCity}
                    <svg
                      className={`-mr-1 size-5 text-gray-400 transition-transform ${
                        openDropdown.city ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {openDropdown.city && (
                  <div
                    className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-zinc-700 shadow-lg ring-1 ring-zinc-700 focus:outline-none"
                    role="menu"
                  >
                    <div className="py-1 max-h-60 overflow-y-auto" role="none">
                      {selectedProvince &&
                        selectedRegion &&
                        locations[selectedProvince][selectedRegion]?.map(
                          (city) => (
                            <button
                              id="box-glass3"
                              key={city}
                              className={`block w-full px-4 py-[6px] bg-zinc-700 text-stone-400 text-left text-sm z-30 ${
                                selectedCity === city
                                  ? "bg-purple-600 text-white "
                                  : "text-purple-300 hover:bg-purple-600"
                              }`}
                              role="menuitem"
                              onClick={() => handleCityChange(city)}
                            >
                              {city}
                            </button>
                          )
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ul className="font-text2 text-sm w-full flex items-start justify-start gap-3 mt-7 lg:mt-9 lg:gap-6 pl-3 overflow-hidden">
            <li
              onClick={() => scrollToCategory("platinum")}
              className="border border-teal-700 pl-3 py-[2px] w-[110px] md:w-[150px] text-stone-600 rounded-3xl hover:text-whiteCustom cursor-pointer"
            >
              Platinum
            </li>
            <li
              onClick={() => scrollToCategory("gold")}
              className="border border-amber-500 pl-3 py-[2px] w-[110px] md:w-[150px] text-stone-600 rounded-3xl hover:text-whiteCustom cursor-pointer"
            >
              Gold
            </li>
            <li
              onClick={() => scrollToCategory("silver")}
              className="border border-gray-400 pl-3 py-[2px] w-[110px] md:w-[150px] text-stone-600 rounded-3xl hover:text-whiteCustom cursor-pointer"
            >
              Silver
            </li>
          </ul>

          {evasByCategory?.Platinum?.length > 0 && (
            <div
              id="platinum-section"
              className="mt-10 flex flex-col w-full px-2 min-h-[300px] items-start justify-start lg:mt-12"
            >
              <div className="text-base text-zinc-500 ml-2 font-text2 self-start pl-2 w-40 border border-teal-700 rounded-lg flex justify-start items-center gap-2 lg:mb-2 xl:w-48 xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-xl 2xl:text-2xl text-teal-700"></i>
                Platinum
              </div>
              <div className="mt-6 flex flex-wrap justify-start gap-2 md:gap-6 lg:mt-3">
                {evasByCategory.Platinum?.map((eva) => (
                  <CardEva key={eva._id} eva={eva} />
                ))}
              </div>
            </div>
          )}

          {evasByCategory?.Gold?.length > 0 && (
            <div
              id="gold-section"
              className="mt-16 flex flex-col w-full px-2 bg-red-500 min-h-[300px] items-start justify-start lg:mt-20"
            >
              <div className="text-base text-zinc-500 ml-2 font-text2 self-start pl-2 w-40 border border-amber-500 rounded-lg flex justify-start items-center gap-2  xl:w-48 xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-3xl 2xl:text-4xl text-amber-500"></i>
                Gold
              </div>
              <div className="mt-6 flex flex-wrap justify-start gap-2 md:gap-6">
                {evasByCategory.Gold?.map((eva) => (
                  <CardEva key={eva._id} eva={eva} />
                ))}
              </div>
            </div>
          )}

          {evasByCategory.Silver?.length > 0 && (
            <div
              id="silver-section"
              className="mt-16 flex flex-col w-full px-2 bg-red-500 min-h-[300px] items-start justify-start lg:mt-20"
            >
              <div className="text-base text-zinc-500 ml-2 font-text2 self-start pl-2 w-40 border border-gray-400 rounded-lg flex justify-start items-center gap-2 xl:w-48 xl:gap-3 2xl:w-56 xl:text-lg ">
                <i className="bx bxs-cube-alt text-xl xl:text-3xl 2xl:text-4xl text-gray-400"></i>
                Silver
              </div>
              <div className="mt-6 flex flex-wrap justify-start gap-2 md:gap-6">
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
      </main>

      <Suspense fallback={<div className="h-32 bg-zinc-800" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home2;
