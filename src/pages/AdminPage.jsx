import CardAdminEva from "../components/CardAdminEva";
import imgLogo from "/0003.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getEvas } from "../api/handlers";
import LocationSelector from "../components/LocationSelector";
import axios from "../api/axios";

const AdminPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      detailLocation: {
        province: "Mendoza",
        region: "",
        city: "",
      },
    },
  });

  const [allEvas, setAllEvas] = useState([]);
  const [evaSelected, setEvaSelected] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const navigate = useNavigate();

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
    verifyAuth();

    const fetchEvas = async () => {
      try {
        const evasData = await getEvas();
        setAllEvas(evasData.filter((eva) => eva != null));
      } catch (error) {
        console.error("Failed to fetch evas:", error);
        setAllEvas([]);
      }
    };
    fetchEvas();
  }, []);

  useEffect(() => {
    if (evaSelected) {
      reset({
        _id: evaSelected._id,
        name: evaSelected.name,
        wttp: evaSelected.wttp,
        location: evaSelected.location,
        detailLocation: evaSelected.detailLocation || {
          province: "Mendoza",
          region: "",
          city: "",
        },
        category: evaSelected.category,
        edad: evaSelected.description?.edad,
        altura: evaSelected.description?.altura,
        peso: evaSelected.description?.peso,
        medidas: evaSelected.description?.medidas,
        depilacion: evaSelected.description?.depilacion,
        servicio: evaSelected.description?.servicio,
        horario: evaSelected.description?.horario,
        extendDescription: evaSelected.description?.extendDescription,
        isActive: evaSelected.isActive,
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
        detailLocation: {
          province: "Mendoza",
          region: "",
          city: "",
        },
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
  }, [evaSelected, reset]);

  const logout = () => {
    axios
      .post("/auth/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  const deleteEva = (id) => {
    axios
      .delete(`/evas/${id}`)
      .then(() => {
        setAllEvas((prevEvas) => prevEvas.filter((eva) => eva._id !== id));
      })
      .catch((error) => console.error(error));
  };

  async function handleImage(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoadingImage(true);

    const formData = new FormData();
    formData.append("image", files[0]);

    try {
      const response = await axios.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImage = response.data;
      setImages((prev) => [...prev, uploadedImage]);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen");
    } finally {
      setLoadingImage(false);
    }
  }

  const handleDeleteImage = async (img) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      return;
    }
    try {
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
      }

      await axios.delete(`/upload/image/${encodeURIComponent(img.public_id)}`);

      console.log("Imagen eliminada de R2");

      setAllEvas((prevEvas) =>
        prevEvas.map((evas) => ({
          ...evas,
          images: evas.images.filter(
            (image) => image.public_id !== img.public_id
          ),
        }))
      );
    } catch (error) {
      console.error("Error al eliminar imagen de R2", error);
      setImages(images);
      if (evaSelected) {
        setEvaSelected(evaSelected);
      }
      alert("Error al eliminar la imagen");
    }
  };

  async function handleVideo(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoadingVideo(true);

    const formData = new FormData();
    formData.append("video", files[0]);

    try {
      const response = await axios.post("/upload/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedVideo = response.data;
      setVideos((prev) => [...prev, uploadedVideo]);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error al subir el video");
    } finally {
      setLoadingVideo(false);
    }
  }

  const handleDeleteVideo = async (video) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      return;
    }
    try {
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

      await axios.delete(
        `/upload/video/${encodeURIComponent(video.public_id)}`
      );

      console.log("Video eliminado de R2");

      setAllEvas((prevEvas) =>
        prevEvas.map((evas) => ({
          ...evas,
          videos: evas.videos.filter((v) => v.public_id !== video.public_id),
        }))
      );
    } catch (error) {
      console.error("Error al eliminar video de R2", error);
      setVideos(videos);
      if (evaSelected) {
        setEvaSelected(evaSelected);
      }
      alert("Error al eliminar el video");
    }
  };
  const formatUrl = (url) => {
    if (!url) return imgWoman;

    const newUrl = url.replace(
      "https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket",
      "https://media.evasdeleden.com"
    );

    return newUrl.includes("media.evasdeleden.com") ? newUrl : "";
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
        const response = await axios.put(`/evas/${evaSelected._id}`, evaData);
        const updatedEva = response.data;
        setAllEvas((prevEvas) =>
          prevEvas.map((eva) => (eva._id === updatedEva._id ? updatedEva : eva))
        );
      } else {
        const response = await axios.post("/evas", evaData);
        const newEva = response.data;
        setAllEvas((prevEvas) => [...prevEvas, newEva]);
      }

      setEvaSelected(null);
      reset();
      setImages([]);
      setVideos([]);
      alert("Eva guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la Eva:", error);

      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;

        if (
          errorMessage.includes("duplicate key error") &&
          errorMessage.includes("wttp")
        ) {
          const dupValueMatch = errorMessage.match(/wttp: "([^"]+)"/);
          const dupValue = dupValueMatch ? dupValueMatch[1] : "";

          alert(
            `Error: El número de WhatsApp ${dupValue} ya está registrado. Por favor, usa otro número.`
          );

          setError("wttp", {
            type: "manual",
            message: "Este WhatsApp ya está registrado",
          });

          return;
        }
      }

      alert("Error al guardar la Eva. Por favor intenta nuevamente.");
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
                {errors?.name && (
                  <p className="text-red-500 text-xs mt-1 absolute right-6">
                    {errors.name.message}
                  </p>
                )}
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
                {errors?.wttp && (
                  <p className="text-red-500 text-xs mt-1 absolute right-6">
                    {errors.wttp.message}
                  </p>
                )}
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
                {errors?.category && (
                  <p className="text-red-500 text-xs mt-1 absolute right-6">
                    {errors.category.message}
                  </p>
                )}
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
            </div>

            <LocationSelector
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />

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
                <div className="text-zinc-400">Cargando imagen...</div>
              ) : (
                <div className="flex flex-wrap justify-center items-center  gap-3 xl:gap-7">
                  {images?.map((img) => (
                    <div key={img?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        className="absolute right-0 px-2 border-2 border-gray-400 flex items-center rounded-sm font-bold text-white bg-red-700"
                      >
                        X
                      </button>
                      <img
                        className="w-32 h-32 object-cover 2xl:w-36 2xl:h-36"
                        src={formatUrl(images[0]?.secure_url)}
                        alt=""
                        width="300px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-3 font-text">
              <label
                htmlFor="videoUpload"
                className="font-light text-gray-400 text-xl"
              >
                Videos
              </label>
              <div className="relative">
                <input
                  id="videoUpload"
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={(e) => handleVideo(e)}
                  className="hidden"
                />
                <label
                  htmlFor="videoUpload"
                  className="rounded-lg flex-1 appearance-none w-full max-w-[400px] py-3 px-12 border border-zinc-500 text-white placeholder-white text-sm focus:outline-none focus:border-transparent cursor-pointer bg-zinc-700"
                >
                  Seleccionar archivo
                </label>
              </div>
              {loadingVideo ? (
                <div className="text-zinc-400">Cargando video...</div>
              ) : (
                <div className="flex flex-wrap justify-center items-center gap-3 xl:gap-7">
                  {videos?.map((video) => (
                    <div key={video?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(video)}
                        className="absolute right-0 px-2 border-2 border-gray-400 flex items-center rounded-sm font-bold text-white bg-red-700 z-50"
                      >
                        X
                      </button>
                      <video
                        className="w-32 h-32 object-cover 2xl:w-36 2xl:h-36"
                        src={formatUrl(video[0]?.secure_url)}
                        controls
                      />
                    </div>
                  ))}
                </div>
              )}
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
      </section>
    </section>
  );
};
export default AdminPage;
