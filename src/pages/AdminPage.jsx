import Footer from "../components/Footer";
import CardAdminEva from "../components/CardAdminEva";
import imgLogo from "/0003.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getEvas } from "../api/handlers";
import axios from "../api/axios";

const AdminPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [allEvas, setAllEvas] = useState([]);
  const [evaSelected, setEvaSelected] = useState(null);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    const fetchEvas = async () => {
      try {
        const evasData = await getEvas();
        // Filtrar elementos undefined/null
        setAllEvas(evasData.filter((eva) => eva != null));
      } catch (error) {
        console.error("Failed to fetch evas:", error);
        setAllEvas([]); // Establecer array vacío en caso de error
      }
    };
    fetchEvas();
  }, []);

  const verifyAuth = async () => {
    try {
      const res = await axios.get("/auth/verify").catch((error) => {
        if (error) {
          navigate("/login");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (evaSelected) {
      reset({
        _id: evaSelected._id,
        name: evaSelected.name,
        wttp: evaSelected.wttp,
        location: evaSelected.location,
        category: evaSelected.category,
        edad: evaSelected.description?.edad,
        altura: evaSelected.description?.altura,
        peso: evaSelected.description?.peso,
        medidas: evaSelected.description?.medidas,
        depilacion: evaSelected.description?.depilacion,
        servicio: evaSelected.description?.servicio,
        horario: evaSelected.description?.horario,
        extendDescription: evaSelected.description?.extendDescription,
        isActive: false,
        images: evaSelected.images,
        videos: evaSelected.videos,
      });
      setImages(evaSelected.images || []);
      setVideos(evaSelected.videos || []);
    } else {
      reset({
        name: "",
        wttp: "",
        location: "",
        category: "",
        isActive: false,
        edad: "",
        altura: "",
        peso: "",
        medidas: "",
        depilacion: "",
        servicio: "",
        horario: "",
        extendDescription: "",
      });
      setImages([]);
      setVideos([]);
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
  const createEva = async (data) => {
    try {
      const response = await axios.post("/evas", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear la Eva:", error);
      throw error;
    }
  };
  const deleteEva = (id) => {
    axios
      .delete(`/evas/${id}`)
      .then(() => {
        setAllEvas((prevEvas) => prevEvas.filter((eva) => eva._id !== id));
      })
      .catch((error) => console.error(error));
  };

  const editEva = async (data) => {
    try {
      const response = await axios.put(`/evas/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al editar la Eva:", error);
      throw error;
    }
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
  const handleDeleteImage = (img) => {
    const newImages = images.filter(
      (image) => image.public_id !== img.public_id
    );
    setImages(newImages);

    if (evaSelected) {
      setEvaSelected({
        ...evaSelected,
        images: evaSelected.images.filter(
          (image) => image.public_id !== img.public_id
        ),
      });
    } // 3. Eliminar de Cloudinary y MongoDB
    axios
      .delete(`evas/delete-image/${encodeURIComponent(img.public_id)}`)
      .then(() => {
        console.log("Imagen eliminada de Cloudinary");
        // 4. Actualizar la lista de eventos
        setAllEvas((prevEvas) =>
          prevEvas.map((evas) => ({
            ...evas,
            images: evas.images.filter(
              (image) => image.public_id !== img.public_id
            ),
          }))
        );
      })
      .catch((error) => {
        console.error("Error al eliminar imagen de Cloudinary", error);
        // Revertir cambios si falla
        setImages(images);
        if (evaSelected) {
          setEvaSelected(evaSelected);
        }
      });
  };

  async function handleVideo(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "evasDelEdenVideos");
    data.append("folder", "evasDelEdenVideos"); // Carpeta diferente para videos

    setLoadingVideo(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/najdorf/video/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setVideos([
        ...videos,
        {
          public_id: file.public_id,
          secure_url: file.secure_url,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVideo(false);
    }
  }

  const handleDeleteVideo = (video) => {
    const newVideos = videos.filter((v) => v.public_id !== video.public_id);
    setVideos(newVideos);

    if (evaSelected) {
      setEvaSelected({
        ...evaSelected,
        videos: evaSelected.videos.filter(
          (v) => v.public_id !== video.public_id
        ),
      });
    }

    // Eliminar de Cloudinary y MongoDB
    axios
      .delete(`evas/delete-video/${encodeURIComponent(video.public_id)}`)
      .then(() => {
        console.log("Video eliminado de Cloudinary");
        // Actualizar la lista de evas
        setAllEvas((prevEvas) =>
          prevEvas.map((evas) => ({
            ...evas,
            videos: evas.videos.filter((v) => v.public_id !== video.public_id),
          }))
        );
      })
      .catch((error) => {
        console.error("Error al eliminar video de Cloudinary", error);
        // Revertir cambios si falla
        setVideos(videos);
        if (evaSelected) {
          setEvaSelected(evaSelected);
        }
      });
  };
  const submit = async (data) => {
    try {
      const evaData = {
        ...data,
        description: {
          edad: data.edad,
          altura: data.altura,
          peso: data.peso,
          medidas: data.medidas,
          depilacion: data.depilacion,
          servicio: data.servicio,
          horario: data.horario,
          extendDescription: data.extendDescription,
        },
        images: images.length > 0 ? images : evaSelected?.images || [],
        videos: videos.length > 0 ? videos : evaSelected?.videos || [],
      };

      if (evaSelected) {
        // Editar Eva existente
        const response = await axios.put(`/evas/${evaSelected._id}`, evaData);
        const updatedEva = response.data;

        setAllEvas((prevEvas) =>
          prevEvas.map((eva) => (eva._id === updatedEva._id ? updatedEva : eva))
        );
      } else {
        // Crear nueva Eva
        const response = await axios.post("/evas", evaData);
        const newEva = response.data;

        setAllEvas((prevEvas) => [...prevEvas, newEva]);
      }

      // Reset después de éxito
      setEvaSelected(null);
      reset();
      setImages([]);
      setVideos([]);
      alert("Eva guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la Eva:", error);
      alert("Error al guardar la Eva");
    }
  };

  return (
    <section className="relative w-full bg-zinc-800 min-h-[140vh] flex flex-col items-center  pb-10">
      <div className="font-text text-base  relative flex justify-between items-center w-full  mt-2 px-3 xl:mt-3 xl:px-12 2xl:text-lg">
        <picture className=" flex items-center justify-center w-[120px] lg:w-[150px] 2xl:w-[180px] ">
          <img src={imgLogo} alt="logo" />
        </picture>
        <ul className="flex gap-6 xl:gap-8 2xl:gap-12">
          <li className="text-gray-50 border-l-2 pl-2 py-1 hover:scale-105 hover:text-white duration-500 ">
            <Link to={"/"}>Home</Link>
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
              "linear-gradient(to right top, #426d89, #3f637a, #3c596b, #394f5d, #36454f, #344149, #333c43, #31383d, #31383d, #31383d, #31383d, #31383d)",
          }}
          className="max-w-md w-full  rounded-xl shadow-2xl shadow-black overflow-hidden py-8 px-4 space-y-8 xl:max-w-[900px]"
        >
          <h6 className="text-center font-title text-6xl font-extrabold text-white xl:text-8xl">
            ADMIN FORM
          </h6>
          <p className="text-center text-gray-200 font-text text-base xl:text-xl ">
            Create your bitch
          </p>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="flex flex-col gap-8 xl:flex xl:flex-row ">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
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
                  autoComplete="off"
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
                <label className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Whatsapp
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row  ">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
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
                  autoComplete="off"
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
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="edad"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="edad"
                  {...register("edad", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Edad
                </label>
              </div>
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="altura"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="altura"
                  {...register("altura", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Altura
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row xl:gap-6">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
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
                  autoComplete="off"
                  placeholder="peso"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="peso"
                  {...register("peso", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Peso
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row xl:gap-6">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="depilacion"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="depilacion"
                  {...register("depilacion", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Depilación
                </label>
              </div>
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="servicio"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="servicio"
                  {...register("servicio", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Servicio
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row xl:gap-6">
              <div className="relative font-text xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="horario"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white"
                  name="horario"
                  {...register("horario", {
                    required: {
                      value: false,
                    },
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Horario
                </label>
              </div>
              <div className="relative font-text flex gap-6 items-center">
                <p className="text-gray-400">Is Active?</p>
                <label className="container-checkbox">
                  <input type="checkbox" {...register("isActive")} />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <div className="relative font-text text-gray-400  flex gap-2 flex-col justify-center items-center">
              <p className="self-start text-base">Descripción</p>{" "}
              <textarea
                placeholder=""
                className=" text-white bg-transparent border-[2px]  w-full xl:text-base rounded-lg p-2"
                name="extendDescription"
                id="extendDescription"
                {...register("extendDescription")}
                rows="5"
                cols="30"
              />
            </div>
            <div className="flex flex-col items-center gap-3 font-text">
              <label
                htmlFor="imageUpload"
                className="font-light text-gray-400 text-xl"
              >
                Imágenes
              </label>
              <div className="relative">
                <input
                  id="imageUpload"
                  type="file"
                  name="image"
                  accept=".jpg, .png, .jpeg"
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="rounded-lg flex-1 appearance-none w-full max-w-[400px] py-3 px-12 border border-zinc-500 text-white placeholder-white text-sm focus:outline-none focus:border-transparent cursor-pointer bg-zinc-700"
                >
                  Seleccionar archivo
                </label>
              </div>
              {loadingImage ? (
                <h3>Cargando imagen...</h3>
              ) : (
                <div className="flex flex-wrap justify-center items-center  gap-3 xl:gap-7">
                  {images?.map((img) => (
                    <div key={img?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        className="absolute right-0 px-2 border-2 border-gray-400  flex items-center rounded-sm font-bold text-white bg-red-700"
                      >
                        X
                      </button>
                      <img
                        className="w-32 h-32 object-cover  2xl:w-36 2xl:h-36"
                        src={img?.secure_url}
                        alt=""
                        width="300px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative font-text flex flex-col justify-center items-center gap-3">
              <label
                htmlFor="videoUpload"
                className="font-light text-gray-400 text-lg"
              >
                Videos
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="videoUpload"
                  accept="video/*"
                  onChange={handleVideo}
                  className="hidden"
                />
                <label
                  htmlFor="videoUpload"
                  className="rounded-lg flex-1 appearance-none w-full max-w-[400px] py-3 px-12 border border-zinc-500 bg-zinc-700 text-white placeholder-white text-sm focus:outline-none focus:border-transparent cursor-pointer "
                >
                  Seleccionar archivo
                </label>
              </div>
              {loadingVideo && <p>Cargando video...</p>}
            </div>
            {/* Mostrar videos cargados */}
            <div className="flex flex-wrap justify-center items-center gap-3 xl:gap-7">
              {videos?.map((video) => (
                <div
                  key={video?.public_id}
                  className="flex items-center relative"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(video)}
                    className="absolute right-0 top-0 px-2 border-2 border-gray-400 flex items-center rounded-sm font-bold text-white bg-red-700 z-50"
                  >
                    X
                  </button>
                  <video
                    src={video?.secure_url}
                    controls
                    className="w-32 h-32 object-cover 2xl:w-36 2xl:h-36"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="w-full font-text mt-2 py-2 px-4 border-[1px] border-slate-100 hover:bg-gray-300 rounded-md shadow-lg text-white font-semibold transition duration-200 hover:text-gray-500 xl:w-[70%] xl:self-center "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>

        <section className="flex flex-wrap  gap-y-6 gap-x-4 my-16 justify-center items-center md:gap-y-10 xl:mt-24 xl:gap-x-10 xl:gap-y-8 xl:px-[10%]">
          {allEvas && allEvas.length > 0 ? (
            allEvas.map((eva, index) =>
              eva ? ( // Verificación adicional
                <div key={eva._id || index}>
                  <CardAdminEva
                    eva={eva}
                    onEdit={() => setEvaSelected(eva)}
                    onDelete={() => deleteEva(eva._id)}
                  />
                </div>
              ) : null
            )
          ) : (
            <div className="text-white">No hay Evas disponibles</div>
          )}
        </section>

        <div className="absolute bottom-0 text-zinc-700 font-normal">
          <Footer />
        </div>
      </section>
    </section>
  );
};
export default AdminPage;
