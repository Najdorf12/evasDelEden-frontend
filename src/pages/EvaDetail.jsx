import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosVercel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import logo from "/0004.png";
import icon from "/icon7.png";
import CommentsSection from "../components/CommentsSection";
import PageLoader from "../components/PageLoader";
import usePageLoader from "../hooks/usePageLoader";

const EvaDetail = () => {
  const { id, name } = useParams();
  const [evaDetail, setEvaDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const showLoader = usePageLoader(isLoading);
  const formatUrl = (url) => {
    if (!url) return logo;

    const newUrl = url.replace(
      "https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket",
      "https://media.evasdeleden.com",
    );

    return newUrl.includes("media.evasdeleden.com") ? newUrl : "";
  };

  const images2 =
    evaDetail?.images?.map((image) => ({
      original: formatUrl(image?.secure_url),
      thumbnail: formatUrl(image?.secure_url),
    })) || [];

  useEffect(() => {
    let isMounted = true;

    const fetchEvaData = async () => {
      setIsLoading(true);

      try {
        const productResponse = await axios.get(`/evas/${id}`);

        if (isMounted) {
          setEvaDetail(productResponse?.data);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEvaData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="relative bg-gradient-to-r from-zinc-900 via-purple-950 to-zinc-900 pb-20 w-full flex flex-col items-center  overflow-hidden lg:pb-12 xl:pb-20 2xl:pb-24  min-h-screen">
      <PageLoader show={showLoader} />
      <nav className="absolute top-0 w-full flex -mt-1 justify-between items-center pr-3.5 z-50 lg:mt-2 lg:px-[5%] ">
        <Link to={"/"}>
          {" "}
          <div>
            <img src={logo} alt="logo" className="w-36 ml-2 lg:w-40" />
          </div>
        </Link>
        <Link to={"/"}>
          <button
            className="w-full font-text py-1.5 px-4 border-[1px] border-purple-500 hover:bg-purple-900 rounded-lg shadow-lg text-white text-xs transition duration-200  lg:px-10 lg:text-base 3xl:text-lg"
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
            }}
          >
            Volver al Inicio
          </button>
        </Link>
      </nav>

      <section className="mt-12 relative flex flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:pl-5 lg:mt-24 w-full 2xl:mt-28 ">
        <div className="mt-7 lg:mt-4 2xl:mt-12 w-full flex justify-center object-cover items-center overflow-hidden lg:w-[40%]">
          <figure
            loading="lazy"
            className="imgs flex items-center justify-center "
          >
            <ImageGallery
              items={images2}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              showBullets={true}
            />
          </figure>
        </div>

        <article className="mt-4 px-4 w-full lg:w-[50%] flex flex-col justify-center items-center ">
          <div className="mt-5 flex flex-col items-center lg:mt-0 w-full lg:items-start">
            <article
              style={{
                boxShadow: "8px 8px 16px #171718, -8px -8px 16px #6e11b0",
              }}
              className="relative font-text3 text-purple-900 min-w-[380px]  w-full pl-4 pr-2 pt-6 pb-3 flex flex-col justify-center items-start text-balance rounded-2xl border border-purple-500 max-w-[500px]  lg:pr-3 lg:pt-3 lg:pl-5 xl:max-w-[580px] xl:pl-6 2xl:pr-4 2xl:pt-4 xl:pb-4 2xl:pb-5 2xl:max-w-[640px] bg-gradient-to-tr from-zinc-900 via-purple-950 to-zinc-900"
            >
              <div className="absolute top-1 right-2 xl:bottom-2 xl:right-3">
                <i className="bx bxs-cube-alt text-3xl xl:text-3xl 2xl:text-5xl"></i>
              </div>
              <div className="absolute bottom-1 left-2 xl:bottom-2 xl:right-3">
                <i className="bx bxs-cube-alt text-3xl xl:text-3xl 2xl:text-5xl"></i>
              </div>

              <h5 className="text-4xl font-text font-semibold text-transparent bg-clip-text bg-gradient-to-t from-purple-900 to-purple-200 lg:text-4xl xl:mt-3 2xl:mt-4 2xl:text-5xl">
                {evaDetail?.name}
              </h5>
              <div className="h-[1px] w-[100%] bg-zinc-700 mt-3 xl:mt-4"></div>
              <div className="flex items-center mt-3 justify-between w-full text-lg lg:mt-3 xl:text-xl 2xl:text-2xl">
                <p className="font-text2  w-full  text-zinc-200 flex justify-between items-center">
                  {evaDetail?.detailLocation?.province}
                </p>
                <div className="flex items-center gap-1 lg:gap-2 mr-2 text-base text-nowrap lg:text-base xl:text-lg text-purple-600">
                  <i className="bx bxs-phone text-lg"></i> {evaDetail?.wttp}
                </div>
              </div>
              <p className="mt-2 text-purple-600">
                {evaDetail?.detailLocation?.city} -{" "}
                {evaDetail?.detailLocation?.region}
              </p>

              <p
                style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
                className="font-text text-zinc-200 pr-8 text-balance mt-2  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-100 to-purple-200 text-base lg:text-lg lg:mt-3  xl:pr-[100px] 2xl:pr-[220px] 2xl:mt-4 2xl:text-xl"
              >
                {evaDetail.description?.servicio}{" "}
              </p>
              <Link
                to={`https://api.whatsapp.com/send/?phone=${
                  evaDetail?.wttp
                }&text=${encodeURIComponent(
                  `Hola, vi tu anuncio en evasdeleden.com.  Me gustaría conocer sobre tu servicio y disponibilidad.`,
                )}`}
                target="_blank"
                className="self-end mt-5 mr-0 xl:mt-4 relative z-50"
              >
                <button
                  style={{
                    boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                  }}
                  className="w-40 pl-2 rounded-xl flex items-center gap-4 text-sm xl:text-lg lg:w-52  lg:gap-8  2xl:text-xl border-[2px] border-purple-600 text-purple-200 bg-gradient-to-tr from-zinc-900 via-purple-950 to-zinc-900 cursor-pointer"
                >
                  <i className="bx bxl-whatsapp text-2xl text-purple-500 "></i>
                  Contacto
                </button>
              </Link>
            </article>
          </div>

          <div
            style={{
              boxShadow: "8px 8px 16px #6e11b0, -8px -8px 16px #6e11b0",
            }}
            className="text-lg text-purple-800 mt-9 font-medium font-text2 self-start pl-2 pr-4 w-44 py-1  border border-purple-600 rounded-lg flex justify-start items-center gap-2 lg:text-lg lg:w-44 xl:text-xl xl:w-52  "
          >
            <i className="bx bxs-cube-alt text-xl xl:text-2xl 2xl:text-3xl text-purple-900"></i>
            Info
          </div>
          <ul className="font-text2 w-full text-zinc-200 mt-5 flex flex-col gap-3 text-sm md:text-base lg:self-start lg:max-w-[80%] xl:text-lg 2xl:text-xl lg:gap-4 xl:mt-6">
            <li className="border border-purple-700 rounded-lg pl-3 pr-8 py-[4px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900">
              Horario: <span>{evaDetail.description?.horario} </span>
            </li>
            <div className="flex items-center gap-2 xl:gap-3">
              <li className="border border-purple-700 rounded-lg pl-3 pr-8 py-[4px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Edad: <span>{evaDetail.description?.edad} </span>
              </li>
              <li className="border border-purple-700 rounded-lg pl-3 pr-8 py-[4px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Altura: <span>{evaDetail.description?.altura} </span>
              </li>
              <li className="border border-purple-700 rounded-lg pl-3 pr-8 py-[4px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Peso: <span>{evaDetail.description?.peso} </span>
              </li>
            </div>
            <div className="flex items-center">
              <li className="border border-purple-700 rounded-lg pl-3 pr-8 py-[4px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Medidas: <span>{evaDetail.description?.medidas} </span>
              </li>
            </div>

            <li
              style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
              className="text-balance text-start pl-2 mt-4  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-200 to-purple-100 text-sm leading-6 lg:leading-normal lg:text-base lg:mt-4 lg:text-start xl:mt-3  2xl:mt-8 xl:text-lg 2xl:text-xl"
            >
              <span>{evaDetail.description?.extendDescription} </span>
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-9 w-full px-1 flex flex-col justify-center items-center xl:mt-12">
        <div className="text-lg text-zinc-200  font-medium font-text2  py-1 rounded-lg flex justify-start items-center gap-10 lg:gap-20 lg:text-lg xl:text-2xl  ">
          <img src={icon} alt="icon" className="w-12 lg:w-20" />
          Videos
          <img src={icon} alt="icon" className="w-12 lg:w-20" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-1 md:gap-3">
          {evaDetail?.videos?.length > 0 ? (
            evaDetail?.videos?.map((video, index) => (
              <div
                key={index}
                className="relative w-[48%] min-w-[190px] h-[390px] md:h-[500px] max-w-[450px] lg:w-[360px] lg:h-[600px] xl:w-[380px]  "
              >
                <video
                  className="w-full h-full rounded-lg border-[1px] border-purple-900  object-cover object-center "
                  controls
                  src={formatUrl(video?.secure_url)}
                />
              </div>
            ))
          ) : (
            <div className="relative py-2 px-4 border border-purple-600 rounded-xl flex justify-center items-center">
              <p className="text-zinc-500">
                Aún no hay videos disponibles para esta Eva
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="flex gap-6 mt-12 text-7xl lg:mt-8 lg:gap-4 xl:gap-8 xl:mt-16 2xl:mt-20 xl:text-8xl 2xl:text-9xl 2xl:gap-12">
        <i className="bx bxs-cube-alt  text-zinc-200"></i>
        <i className="bx bxs-cube-alt  text-purple-900"></i>
        <i className="bx bxs-cube-alt  text-zinc-200"></i>
      </div>
      <CommentsSection evaId={evaDetail?._id} />
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6  ">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-500"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </section>
  );
};

export default EvaDetail;
