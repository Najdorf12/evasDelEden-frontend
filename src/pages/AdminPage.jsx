import imgLogo from "../assets/logo-removebg.png";
import Footer from "../components/Footer";
import CardAdminEva from "../components/CardAdminEva";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getEvas } from "../api/handlers";
import axios from "../api/axios";

const AdminPage = ({ allEvas }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState({});
  const [evaSelected, setEvaSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState({});
  const [images, setImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
    getEvas();
  }, []);

  useEffect(() => {
    if (evaSelected !== null) {
      reset({
        name: evaSelected.name,
        wttp: evaSelected.wttp,
        location: evaSelected.location,
        age: evaSelected.age,
        category: evaSelected.category,
        detail: evaSelected.description.detail,
        medidas: evaSelected.description.medidas,
        more: evaSelected.description.more,
        isActive: false,
      });
    } else {
      reset({
        name: "",
        wttp: "",
        location: "",
        age: "",
        category: "",
        detail: "",
        medidas: "",
        more: "",
        isActive: false,
      });
    }
  }, [evaSelected]);

  const logout = () => {
    axios
      .post("/auth/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };
  const verifyAuth = async () => {
    try {
      const res = await axios
        .get("/auth/verify")
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          if (error) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const selectEva = (user) => {
    setEvaSelected(user);
  };

  const editEva = (eva) => {
    axios
      .put(`/evas/${eva._id}`, eva)
      .then(() => {
        getEvas();
        setEvaSelected(null);
      })
      .catch((error) => console.error(error));
  };

  async function handleImage(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "evasDelEden");
    data.append("folder", "evasDelEden");

    setLoadingImage(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/najdorf/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      console.log(file)
      setImages([
        ...images,
        {
          public_id: file.public_id,
          secure_url: file.secure_url,
        },
      ]);
    
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingImage(false);
    }
  }
  function handleDelete(event) {
    setImages(images.filter((e) => e !== event));
  }

  const submit = (data) => {
    console.log(data);
    if (evaSelected !== null) {
      editEva(data);
    } else {
      const newEva = {
        name: data.name,
        wttp: data.wttp,
        location: data.location,
        age: data.age,
        category: data.category,
        images: images,
        description: {
          detail: data.detail,
          medidas: data.medidas,
          more: data.more,
        },
        isActive: data.isActive,
      };
      axios
        .post("/evas", newEva)
        .then(() => getEvas())
        .catch((error) => console.error(error));
    }
    alert("EVA CREADA EXITOSAMENTE");
  };
  return (
    <section className="relative w-full bg-[#212121] min-h-[140vh] flex flex-col items-center  pb-10">
      <div className="font-text text-base  relative flex justify-between items-center w-full  mt-2 px-3 xl:mt-3 xl:px-12 2xl:text-lg">
        <picture className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800 border-[1px] border-gray-500 2xl:w-16 2xl:h-16 ">
          <img src={imgLogo} alt="logo" />
        </picture>
        <ul className="flex gap-6 xl:gap-8 2xl:gap-12">
          <li className="text-gray-50 border-l-2 pl-2 py-1 hover:scale-105 hover:text-white duration-500 ">
            <Link to={"/"}>Home </Link>
          </li>
          <li
            onClick={() => logout()}
            className="text-gray-400 border-l-2 pl-2 py-1 border-gray-400 cursor-pointer  hover:scale-105 hover:text-white duration-500"
          >
            Cerrar Sesión
          </li>
        </ul>
      </div>

      <section className="mt-12 w-full flex flex-col items-center px-4  ">
        <section
          style={{
            backgroundImage:
              "linear-gradient(to right top, #242427, #2b2a30, #33303a, #3c3542, #463b4b, #554255, #65495e, #765066, #905a6f, #aa6575, #c37278, #da8078)",
          }}
          className="max-w-md w-full  rounded-xl shadow-2xl shadow-black overflow-hidden py-8 px-4 space-y-8 xl:max-w-[700px]"
        >
          <h2 className="text-center font-title text-6xl font-extrabold text-white xl:text-7xl 2xl:text-8xl">
            ADMIN FORM
          </h2>
          <p className="text-center text-gray-200 font-text text-base xl:text-lg 2xl:text-xl">
            Create your bitch
          </p>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="flex flex-col gap-6 xl:flex xl:flex-row ">
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="Joe Doe"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Name
                </label>
              </div>
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="john@example.com"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white "
                  name="wttp"
                  {...register("wttp", {
                    required: {
                      value: true,
                      message: "Whatsapp is required",
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5  text-sm   transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Whatsapp
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row  ">
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="location"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="location"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Location is required",
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Location
                </label>
              </div>
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="edad"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="edad"
                  {...register("age", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Edad
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row">
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="category"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="category"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Category is required",
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Category
                </label>
              </div>

              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="detail"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="detail"
                  {...register("detail", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Detail
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row xl:gap-6">
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="medidas"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="medidas"
                  {...register("medidas", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Medidas
                </label>
              </div>
              <div className="relative font-text xl:w-1/2">
                <input
                  placeholder="more"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="more"
                  {...register("more", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  More
                </label>
              </div>
            </div>
            <div className="relative font-text flex gap-6 items-center">
              <p className="text-gray-400">Is Active?</p>
              <label className="container-checkbox">
                <input type="checkbox" {...register("isActive")} />
                <svg viewBox="0 0 64 64" height="2em" width="2em">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    class="path"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex flex-col items-center gap-5 ">
              <label className="font-light text-gray-400 text-xl">Imágenes</label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleImage(e)}
                className=" rounded-lg flex-1  appearance-none w-full  max-w-[400px] py-2 px-4 border border-gray-400 text-white placeholder-white text-sm focus:outline-none focus:border-transparent"
              />
              {loadingImage ? (
                <h3>Cargando imagen...</h3>
              ) : (
                <div className="lg:flex gap-5 xl:gap-10">
                  {images?.map((img) => (
                    <div key={img?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDelete(img)}
                        className="absolute right-0 px-2 border-2 border-gray-400  flex items-center rounded-sm font-bold text-white bg-red-700"
                      >
                        X
                      </button>
                      <img
                        className="w-32 h-32 object-cover 2xl:w-36 2xl:h-36"
                        src={img?.secure_url}
                        alt=""
                        width="300px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="w-full font-text  py-2 px-4 border-[1px] border-slate-100 hover:bg-gray-300 rounded-md shadow-lg text-white font-semibold transition duration-200 hover:text-gray-500 xl:w-[70%] xl:self-center "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>

        <section className="flex flex-wrap gap-y-6 gap-x-4 my-16 justify-center items-center xl:mt-24 xl:gap-x-10 xl:gap-y-8">
          {allEvas.map((eva) => (
            <CardAdminEva key={eva._id} eva={eva} selectEva={selectEva} />
          ))}
        </section>

        <div className="absolute bottom-2">
          <Footer />
        </div>
      </section>
    </section>
  );
};
export default AdminPage;
