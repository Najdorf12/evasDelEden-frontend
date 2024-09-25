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
    }  ,
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
    <section className="relative bg-zinc-800 pb-24  w-full pt-2  flex flex-col items-center  overflow-hidden xl:pt-4 min-h-screen">
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

      <section className=" relative flex flex-col items-center lg:flex-row lg:items-center lg:justify-center lg:gap-24  2xl:gap-28 ">
        <div className="mt-6 lg:mt-8">
          <article className="font-text2 text-stone-500   w-full flex flex-col justify-center items-center text-balance pl-3">
            <h5 className="text-3xl text-whiteCustom xl:text-4xl 2xl:text-5xl">
              {evaDetail.name}
            </h5>
            <p className="text-lg xl:text-xl xl:mt-2 2xl:text-2xl text-stone-600">
              {evaDetail.location}
            </p>
            <p className="text-stone-500 text-center text-balance mt-2 ">{evaDetail.description?.servicio} </p>
            <Link
              to={`https://api.whatsapp.com/send/?phone=${evaDetail.wttp}`}
              target="blank"
              className="self-center"
            >
              <button className="rounded-full px-8 border shadow-lg shadow-zinc-900 border-stone-600 mt-4 flex items-center gap-1 text-base xl:text-xl xl:mt-4 text-stone-500 xl:px-8 2xl:px-9 ">
                <i className="bx bxl-whatsapp text-2xl"></i> Contacto
              </button>
            </Link>
          </article>

          <div className="mt-6 sm:mt-8 xl:mt-8 2xl:mt-12 w-full flex justify-center object-cover items-center overflow-hidden ">
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
        <article className="mt-8 px-3 max-w-[450px] xl:max-w-[500px]">
          <ul className="font-text2 text-stone-400 flex flex-col gap-2 text-base xl:text-lg xl:gap-3">
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3">
              Edad: <span>{evaDetail.description?.edad} </span>
            </li>
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3">
              Altura: <span>{evaDetail.description?.altura} </span>
            </li>
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3">
              Medidas: <span>{evaDetail.description?.medidas} </span>
            </li>
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3">
              Peso: <span>{evaDetail.description?.peso} </span>
            </li>
           
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3">
              Horario: <span>{evaDetail.description?.horario} </span>
            </li>
            <li className="text-balance text-center mt-3 text-whiteCustom">
              <span>{evaDetail.description?.extendDescription} </span>
            </li>
          </ul>
        </article>
      </section>
     
      <div className="w-full flex flex-col items-center justify-center lg:mt-16 mt-9">
        <div className="w-[45%] h-2 bg-zinc-600 rounded-sm lg:w-[25%]"></div>
        <div className="w-[30%] h-2 bg-primary rounded-bl-sm rounded-br-sm lg:w-[20%] "></div>
      </div>
     
      <footer className="absolute bottom-0 text-zinc-700 font-medium lg:text-zinc-500 ">
        <Footer />
      </footer>
    </section>
  );
};

export default EvaDetail;
