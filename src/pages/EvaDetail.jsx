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
    <section className="relative bg-zinc-800 pb-10  w-full pt-2  flex flex-col items-center  overflow-hidden xl:pt-4 min-h-screen">
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
        <div className="mt-8 lg:mt-8 flex flex-col items-center">
          <article
            style={{
              boxShadow: "8px 8px 16px #171718, -8px -8px 16px #37373c",
            }}
            className="relative font-text3 text-stone-500   w-[90%] pl-4 pr-2 pt-2 pb-3 flex flex-col justify-center items-start text-balance rounded-2xl border border-stone-700"
          >
            <div className="absolute top-1 left-2">
            <i className='bx bxs-cube-alt text-3xl'></i>
            </div>
            <div className="absolute bottom-1 right-2">
            <i className='bx bxs-cube-alt text-3xl'></i>
            </div>
            <Link
              to={`https://api.whatsapp.com/send/?phone=${evaDetail.wttp}`}
              target="blank"
              className="self-end"
            >
              <button
                id="btn-evadetail"
                className="px-6 py-1  flex items-center justify-center gap-1 text-base xl:text-xl font-semibold"
              >
                CONTACTO
              </button>
            </Link>
            <h5
              className="text-3xl mt-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-200  to-purple-300 xl:text-4xl 2xl:text-5xl"
            >
              {evaDetail.name}
            </h5>
            <div className="h-[1px] w-[100%] bg-zinc-700 mt-3"></div>
            <p className="font-text2 text-lg mt-1 xl:text-xl xl:mt-2 2xl:text-2xl text-stone-500 ">
              {evaDetail.location}
            </p>
            <p
              className="font-text3 font-medium text-stone-500 pr-6 text-balance mt-2  text-transparent bg-clip-text bg-gradient-to-tr from-zinc-100 to-purple-200"
            >
              {evaDetail.description?.servicio}{" "}
            </p>
          </article>

          <div className="mt-3 xl:mt-8 2xl:mt-12 w-full flex justify-center object-cover items-center overflow-hidden ">
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
            <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3 shadow-md shadow-zinc-900">
              Horario: <span>{evaDetail.description?.horario} </span>
            </li>
            <div className="flex items-center gap-2">
              <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3 shadow-md shadow-zinc-900">
                Edad: <span>{evaDetail.description?.edad} </span>
              </li>
              <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3 shadow-md shadow-zinc-900">
                Altura: <span>{evaDetail.description?.altura} </span>
              </li>
              <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3 shadow-md shadow-zinc-900">
                Peso: <span>{evaDetail.description?.peso} </span>
              </li>
            </div>
            <div className="flex items-center">
              <li className="border border-stone-700 rounded-full px-3 flex items-center gap-3 shadow-md shadow-zinc-900">
                Medidas: <span>{evaDetail.description?.medidas} </span>
              </li>
            </div>

            <li className="text-balance font-medium text-center mt-3  text-transparent bg-clip-text bg-gradient-to-tr from-purple-200 to-zinc-500">
              <span>{evaDetail.description?.extendDescription} </span>
            </li>
          </ul>
        </article>
      </section>

      <div className="flex mt-5 text-8xl">
        <i className='bx bxs-cube-alt  text-zinc-700'></i>
        <i className='bx bxs-cube-alt  text-zinc-100'></i>
        <i className='bx bxs-cube-alt  text-zinc-700'></i>
      </div>

      <footer className="absolute bottom-0 text-zinc-700 font-medium lg:text-zinc-500 ">
        <Footer />
      </footer>
    </section>
  );
};

export default EvaDetail;
