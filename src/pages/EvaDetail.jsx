import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import imgLogo from "../assets/logo-removebg.png";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "../components/Footer";

const EvaDetail = () => {
  const { id } = useParams();
  const [evaDetail, setEvaDetail] = useState({});
  const images2 = [
    {
      original: evaDetail?.images
        ? evaDetail?.images[0]?.secure_url
        : evaDetail?.image?.secure_url,
      thumbnail: evaDetail?.images
        ? evaDetail?.images[0]?.secure_url
        : evaDetail?.image?.secure_url,
    },
    {
      original: evaDetail?.images
        ? evaDetail?.images[1]?.secure_url
        : evaDetail?.image?.secure_url,
      thumbnail: evaDetail?.images
        ? evaDetail?.images[1]?.secure_url
        : evaDetail?.image?.secure_url,
    },
    {
      original: evaDetail?.images
        ? evaDetail?.images[2]?.secure_url
        : evaDetail?.image?.secure_url,
      thumbnail: evaDetail?.images
        ? evaDetail?.images[2]?.secure_url
        : evaDetail?.image?.secure_url,
    },
  ];

  useEffect(() => {
    const fetchEvaData = async () => {
      try {
        const productResponse = await axios.get(`/evas/${id}`);
        console.log(productResponse);
        setEvaDetail(productResponse?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvaData();
  }, [id]);

  return (
    <section className="relative bg-zinc-800 pb-12  w-full pt-2  flex flex-col items-center  overflow-hidden lg:pb-12 xl:pb-20 2xl:pb-24 xl:pt-4 min-h-screen">
      <nav className="w-full flex justify-between items-center pr-3 mt-2 z-50 lg:px-[4%]">
        <div>
          <img src={imgLogo} alt="logo" className="w-14 lg:w-16 xl:w-20" />
        </div>
        <Link to={"/"}>
          <button className="pl-2 text-lg border-l-[3px] border-zinc-600 font-text2 text-whiteCustom xl:text-xl xl:pl-3 2xl:text-2xl">
            Volver
          </button>
        </Link>
      </nav>

      <section className=" relative flex flex-col items-center lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-12 2xl:gap-20 ">
        <div className="mt-5 lg:mt-8 flex flex-col items-center">
          <article
            style={{
              boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
            }}
            className="relative font-text3 text-stone-500   w-[95%] pl-4 pr-2 pt-6 pb-3 flex flex-col justify-center items-start text-balance rounded-2xl border border-stone-700 lg:w-[520px] lg:pr-3 lg:pt-3 lg:pl-5 xl:w-[620px] xl:pl-6 2xl:pr-4 2xl:pt-4 2xl:w-[700px]"
          >
            <div className="absolute top-1 left-2 xl:top-2 xl:left-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute top-1 right-2 xl:bottom-2 xl:right-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            <div className="absolute bottom-1 left-2 xl:bottom-2 xl:right-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>
            {/*  <div className="absolute bottom-1 right-2 xl:bottom-2 xl:right-3">
              <i className="bx bxs-cube-alt text-3xl xl:text-4xl 2xl:text-5xl"></i>
            </div>  */}
            <h5 className="text-3xl mt-5 font-medium text-transparent bg-clip-text bg-gradient-to-b from-white  to-purple-400 lg:text-4xl xl:text-5xl xl:mt-4 2xl:mt-6 2xl:text-6xl">
              {evaDetail?.name}
            </h5>
            <div className="h-[1px] w-[100%] bg-zinc-700 mt-3"></div>
            <p className="font-text2 w-full text-lg mt-1 xl:text-2xl xl:mt-2 2xl:mt-3 2xl:text-3xl text-stone-500 flex justify-between items-center">
              {evaDetail?.location}
              <div className="flex items-center gap-2 mr-2">
                <i className="bx bxs-phone text-lg"></i> {evaDetail?.wttp}
              </div>
            </p>
            <p
              style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
              className="font-text3 font-medium text-stone-500 pr-8 text-balance mt-2  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-100 to-purple-200 text-base lg:text-lg lg:mt-3 xl:text-xl xl:pr-[200px] 2xl:pr-[220px] 2xl:mt-4 2xl:text-2xl"
            >
              {evaDetail.description?.servicio}{" "}
            </p>
            <Link
              to={`https://api.whatsapp.com/send/?phone=${evaDetail?.wttp}`}
              target="blank"
              className="self-end mt-3 mr-2"
            >
              <button
                style={{
                  boxShadow: "8px 8px 16px #171718, -3px -3px 3px #37373c",
                }}
                className="pr-6 pl-2  rounded-full flex items-center justify-start gap-1 text-sm xl:text-lg font-semibold 2xl:text-xl border-[2px] border-purple-300 text-whiteCustom"
              >
                <i className="bx bxl-whatsapp text-2xl text-purple-400"></i>
                CONTACTO
              </button>
            </Link>
          </article>

          <div className="mt-5 lg:mt-8 2xl:mt-12 w-full flex justify-center object-cover items-center overflow-hidden ">
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
        <article className="mt-8 px-3 max-w-[450px] lg:-mt-12 xl:-mt-16 xl:max-w-[580px] 2xl:-mt-20 2xl:max-w-[680px]">
          <ul className="font-text2 text-stone-400 flex flex-col gap-2 text-base lg:text-lg xl:text-2xl 2xl:text-2xl lg:gap-4">
            <li className="border border-stone-700 rounded-full px-3 lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900">
              Horario: <span>{evaDetail.description?.horario} </span>
            </li>
            <div className="flex items-center gap-2 xl:gap-3">
              <li className="border border-stone-700 rounded-full px-3 lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Edad: <span>{evaDetail.description?.edad} </span>
              </li>
              <li className="border border-stone-700 rounded-full px-3 lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Altura: <span>{evaDetail.description?.altura} </span>
              </li>
              <li className="border border-stone-700 rounded-full px-3 lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Peso: <span>{evaDetail.description?.peso} </span>
              </li>
            </div>
            <div className="flex items-center">
              <li className="border border-stone-700 rounded-full px-3 lg:py-1  flex items-center gap-3 shadow-md shadow-zinc-900 lg:px-4 xl:px-6 2xl:px-10">
                Medidas: <span>{evaDetail.description?.medidas} </span>
              </li>
            </div>

            <li
              style={{ filter: "drop-shadow(2px 3px 3px rgb(24 24 27))" }}
              className="text-balance font-medium text-center mt-3  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-200 to-purple-100 lg:text-xl lg:mt-4 xl:mt-6 xl:text-2xl 2xl:mt-8 2xl:text-3xl"
            >
              <span>{evaDetail.description?.extendDescription} </span>
            </li>
          </ul>
        </article>
      </section>

      <div className="flex gap-3 mt-6 text-7xl lg:mt-8 lg:gap-4 xl:gap-8 xl:mt-16 2xl:mt-20 xl:text-8xl 2xl:text-9xl 2xl:gap-12">
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
