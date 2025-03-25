import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "../components/Footer";
import logo from "/0004.png";

const EvaDetail = () => {
  const { id } = useParams();
  const [evaDetail, setEvaDetail] = useState({});
  const images2 =
    evaDetail?.images?.map((image) => ({
      original: image?.secure_url,
      thumbnail: image?.secure_url,
    })) || [];

  useEffect(() => {
    const fetchEvaData = async () => {
      try {
        const productResponse = await axios.get(`/evas/${id}`);
        setEvaDetail(productResponse?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvaData();
  }, [id]);

  return (
    <section className="relative bg-zinc-800 pb-12 w-full  flex flex-col items-center  overflow-hidden lg:pb-12 xl:pb-20 2xl:pb-24  min-h-screen">
      <nav className="absolute top-0 w-full flex -mt-5 justify-between items-center pr-3 z-50 lg:-mt-3 lg:px-[4%]">
        <div>
          <img src={logo} alt="logo" className="w-48 " />
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

      <section className="mt-16 relative flex flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-3   lg:mt-24 lg:w-full 2xl:mt-28 ">
        <div className="mt-5  flex flex-col items-center lg:mt-0  lg:w-[45%]">
          <article
            style={{
              boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
            }}
            className="relative font-text3 text-stone-500 min-w-[370px]  w-[95%] pl-4 pr-2 pt-6 pb-3 flex flex-col justify-center items-start text-balance rounded-2xl border border-purple-200 max-w-[500px]  lg:pr-3 lg:pt-3 lg:pl-5 xl:max-w-[580px] xl:pl-6 2xl:pr-4 2xl:pt-4 xl:pb-5 2xl:pb-6 2xl:max-w-[640px]"
          >
            <div className="absolute top-1 right-2 xl:bottom-2 xl:right-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute bottom-1 left-2 xl:bottom-2 xl:right-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>

            <h5 className="text-3xl mt-2 font-medium text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 via-purple-300  to-purple-300 lg:text-4xl xl:mt-3 2xl:mt-4 2xl:text-5xl">
              {evaDetail?.name}
            </h5>
            <div className="h-[1px] w-[100%] bg-zinc-700 mt-3 xl:mt-4"></div>
            <p className="font-text2 w-full text-lg mt-1 xl:text-xl xl:mt-2 2xl:mt-3 2xl:text-2xl text-stone-500 flex justify-between items-center">
              {evaDetail?.location}
              <div className="flex items-center gap-2 mr-2">
                <i className="bx bxs-phone text-lg"></i> {evaDetail?.wttp}
              </div>
            </p>
            <p
              style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
              className="font-text3 font-medium text-stone-500 pr-8 text-balance mt-2  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-100 to-purple-200 text-base lg:text-lg lg:mt-3  xl:pr-[100px] 2xl:pr-[220px] 2xl:mt-4 2xl:text-xl"
            >
              {evaDetail.description?.servicio}{" "}
            </p>
            <Link
              to={`https://api.whatsapp.com/send/?phone=${
                evaDetail?.wttp
              }&text=${encodeURIComponent(
                `Hola, vi tu anuncio en evasdeleden.com.  Me gustaría conocer sobre tu servicio y disponibilidad.`
              )}`}
              target="_blank"
              className="self-end mt-3 mr-2 xl:mt-4 relative z-50"
            >
              <button
                style={{
                  boxShadow: "8px 8px 16px #171718, -3px -3px 3px #37373c",
                }}
                className="pr-6 pl-5 rounded-full flex items-center justify-start gap-1 text-sm xl:text-lg xl:gap-2 font-semibold 2xl:text-xl border-[2px] border-purple-300 text-whiteCustom cursor-pointer"
              >
                <i className="bx bxl-whatsapp text-2xl text-purple-400 xl:text-3xl"></i>
                CONTACTO
              </button>
            </Link>
          </article>

          <div className="mt-7 lg:mt-8 2xl:mt-12 w-full flex justify-center object-cover items-center overflow-hidden ">
            <figure
              loading="lazy"
              className="imgs w-full flex items-center justify-center shadow-lg shadow-zinc-900"
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
        </div>

        <article className="mt-4 px-3  lg:w-[50%] flex flex-col justify-center items-center lg:items-start lg:justify-center lg:mt-12 xl:pl-10 ">
          <h5
            style={{
              boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
            }}
            className="text-base text-stone-500 mt-5  font-medium font-text2 self-start pl-2 pr-4 w-36  border border-stone-600 rounded-lg flex justify-start items-center gap-2 lg:text-lg lg:w-44 xl:text-xl xl:w-52 "
          >
            <i className="bx bxs-cube-alt text-xl xl:text-2xl 2xl:text-3xl text-purple-400"></i>
            Info
          </h5>
          <ul className="font-text2 text-stone-400 flex flex-col gap-3 text-base mt-5 lg:max-w-[80%] xl:text-lg  2xl:text-xl lg:gap-4 xl:mt-6">
            <li className="border border-stone-700 rounded-full pl-3 pr-6 py-[2px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900">
              Horario: <span>{evaDetail.description?.horario} </span>
            </li>
            <div className="flex items-center gap-2 xl:gap-3">
              <li className="border border-stone-700 rounded-full pl-3 pr-6 py-[2px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Edad: <span>{evaDetail.description?.edad} </span>
              </li>
              <li className="border border-stone-700 rounded-full pl-3 pr-6 py-[2px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Altura: <span>{evaDetail.description?.altura} </span>
              </li>
              <li className="border border-stone-700 rounded-full pl-3 pr-6 py-[2px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Peso: <span>{evaDetail.description?.peso} </span>
              </li>
            </div>
            <div className="flex items-center">
              <li className="border border-stone-700 rounded-full pl-3 pr-6 py-[2px] lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Medidas: <span>{evaDetail.description?.medidas} </span>
              </li>
            </div>

            <li
              style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
              className="text-balance font-medium text-center mt-4  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-200 to-purple-100 text-base lg:mt-4 lg:text-start xl:mt-6  2xl:mt-8 xl:text-lg 2xl:text-xl"
            >
              <span>{evaDetail.description?.extendDescription} </span>
            </li>
          </ul>
        </article>
      </section>
      <section className="mt-4 px-3 flex flex-col justify-center items-center xl:mt-12 ">
        <h5
          style={{
            boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
          }}
          className="text-base text-stone-500 mt-5  font-medium font-text2  pl-2 pr-4 w-36  border border-stone-600 rounded-lg flex justify-start items-center gap-2  lg:text-lg lg:w-44 xl:text-xl xl:w-52"
        >
          <i className="bx bxs-cube-alt text-xl xl:text-2xl 2xl:text-3xl text-purple-400"></i>
          Videos
        </h5>

        {/* Contenedor de videos */}
        <div className="flex flex-wrap self-center justify-center items-center gap-4 mt-6 w-full lg:mt-12 lg:gap-6 lg:px-[5%] ">
          {evaDetail?.videos?.length > 0 ? (
            evaDetail?.videos?.map((video, index) => (
              <div
                key={index}
                className="w-[90%] max-w-[320px] flex justify-center"
              >
                {/* Video */}
                <video
                  className="w-full h-auto rounded-lg border-[2px] border-stone-700 shadow-lg shadow-zinc-900 object-cover object-center"
                  controls
                  src={video?.secure_url}
                />
              </div>
            ))
          ) : (
            <p className="pl-1 self-start text-stone-500 text-balance max-w-[300px] text-sm -mt-2 md:text-nowrap  xl:text-base xl:mt-2 2xl:text-lg">
              No hay videos disponibles para esta Eva
            </p>
          )}
        </div>
      </section>

      <div className="flex gap-3 mt-12 text-7xl lg:mt-8 lg:gap-4 xl:gap-8 xl:mt-16 2xl:mt-20 xl:text-8xl 2xl:text-9xl 2xl:gap-12">
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
        <i className="bx bxs-cube-alt  text-zinc-100"></i>
        <i className="bx bxs-cube-alt  text-zinc-700"></i>
      </div>

      <footer className="absolute bottom-0 text-zinc-700 font-medium lg:text-zinc-500 ">
        <Footer />
      </footer>
    </section>
  );
};

export default EvaDetail;
