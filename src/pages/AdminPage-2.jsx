import CardAdminEva from "../components/CardAdminEva";
import imgLogo from "/0003.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { getEvas } from "../api/handlers";
import LocationSelector from "../components/LocationSelector";
import axios from "../api/axiosRender";
import icon from "/icon14.png";

const PendingEvaCard = ({ eva, onApprove, onReject, formatUrl }) => (
  <div className="w-[280px] bg-gradient-to-tr from-zinc-900 via-purple-950 to-zinc-900 border border-purple-600 rounded-xl overflow-hidden shadow-lg">
    <div className="relative">
      {eva.images?.[0]?.secure_url ? (
        <img
          src={formatUrl(eva.images[0].secure_url)}
          alt={eva.name}
          className="w-full h-52 object-cover"
        />
      ) : (
        <div className="w-full h-42 bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm font-text">
          Sin foto
        </div>
      )}
      <span className="absolute top-2 left-2 bg-yellow-500 text-zinc-800 text-xs font-bold px-5 py-1 rounded-full font-text">
        Pendiente
      </span>
    </div>
    <div className="p-4 space-y-1 font-text">
      <p className="text-white text-lg font-semibold">{eva.name}</p>
      <p className="text-zinc-400 text-sm">
        {eva.detailLocation?.province} {eva.detailLocation?.city || "-"}
      </p>
      <p className="text-zinc-400 text-sm">Categoría: {eva.category}</p>
      <p className="text-purple-500 text-base">Whatsapp: {eva.wttp}</p>

      <div className="flex gap-2 pt-3">
        <button
          onClick={() => onApprove(eva._id)}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2 rounded-md transition-colors"
        >
          Aprobar
        </button>
        <button
          onClick={() => onReject(eva._id)}
          className="flex-1 bg-red-700 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-md transition-colors"
        >
          Rechazar
        </button>
      </div>
    </div>
  </div>
);
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
  const pendingEvas = useMemo(
    () => allEvas.filter((eva) => eva?.status === "pending"),
    [allEvas],
  );

  const approvedEvas = useMemo(
    () => allEvas.filter((eva) => eva?.status !== "pending"),
    [allEvas],
  );
  const pendingStories = useMemo(() => {
    const list = [];
    allEvas.forEach((eva) => {
      (eva.stories || []).forEach((story) => {
        if (story.status === "pending") {
          list.push({ eva, story });
        }
      });
    });
    return list;
  }, [allEvas]);

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
        console.log("EVAS RECIBIDAS:", evasData); // ← temporal
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
  const approveEva = (id) => {
    axios
      .patch(`/evas/${id}/approve`)
      .then((res) => {
        setAllEvas((prevEvas) =>
          prevEvas.map((eva) => (eva._id === id ? res.data : eva)),
        );
      })
      .catch((error) => console.error(error));
  };

  async function handleImage(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoadingImage(true);

    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            console.log(`Progreso: ${percentCompleted}%`);
          }
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      const uploadedImage = response.data;
      setImages((prev) => [...prev, uploadedImage]);
    } catch (error) {
      console.error("Error subiendo imagen:", error);

      let errorMsg = "Error al subir la imagen";
      if (error.response) {
        if (error.response.status === 413) {
          errorMsg = "El archivo es demasiado grande (máximo 120MB)";
        } else {
          errorMsg = error.response.data?.message || errorMsg;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }

      alert(errorMsg);
    } finally {
      setLoadingImage(false);
    }
  }
  const handleSetCoverImage = async (img) => {
    if (!evaSelected) return;
    if (images[0]?.public_id === img.public_id) return;

    try {
      const response = await axios.patch(
        `/evas/${evaSelected._id}/cover-image`,
        { public_id: img.public_id },
      );
      setImages(response.data.images);
      setEvaSelected(response.data);
      setAllEvas((prev) =>
        prev.map((e) => (e._id === response.data._id ? response.data : e)),
      );
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al fijar la portada");
    }
  };
  const handleDeleteImage = async (img) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      return;
    }
    if (!evaSelected) return;

    try {
      const response = await axios.delete(`/evas/${evaSelected._id}/image`, {
        params: { public_id: img.public_id },
      });
      setImages(response.data.images);
      setEvaSelected(response.data);
      setAllEvas((prev) =>
        prev.map((e) => (e._id === response.data._id ? response.data : e)),
      );
    } catch (error) {
      console.error("Error al eliminar imagen", error);
      alert(error.response?.data?.message || "Error al eliminar la imagen");
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
    if (!evaSelected) return;

    try {
      const response = await axios.delete(`/evas/${evaSelected._id}/video`, {
        params: { public_id: video.public_id },
      });
      setVideos(response.data.videos);
      setEvaSelected(response.data);
      setAllEvas((prev) =>
        prev.map((e) => (e._id === response.data._id ? response.data : e)),
      );
    } catch (error) {
      console.error("Error al eliminar video", error);
      alert(error.response?.data?.message || "Error al eliminar el video");
    }
  };
  const formatUrl = (url) => {
    if (!url) return "";

    const newUrl = url.replace(
      "https://cdd7ac2c93559289745bebf529967fc9.r2.cloudflarestorage.com/evas-bucket",
      "https://media.evasdeleden.com",
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
          prevEvas.map((eva) =>
            eva._id === updatedEva._id ? updatedEva : eva,
          ),
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
            `Error: El número de WhatsApp ${dupValue} ya está registrado. Por favor, usa otro número.`,
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

  const approveStory = (evaId, storyId) => {
    axios
      .patch(`/evas/${evaId}/story/${storyId}/approve`)
      .then((res) => {
        setAllEvas((prev) =>
          prev.map((e) => (e._id === res.data._id ? res.data : e)),
        );
      })
      .catch((error) => {
        console.error(error);
        alert("Error al aprobar la historia");
      });
  };

  const rejectStory = (evaId, storyId) => {
    if (!window.confirm("¿Rechazar y eliminar esta historia?")) return;
    axios
      .delete(`/evas/${evaId}/story/${storyId}`)
      .then((res) => {
        setAllEvas((prev) =>
          prev.map((e) => (e._id === res.data._id ? res.data : e)),
        );
      })
      .catch((error) => {
        console.error(error);
        alert("Error al rechazar la historia");
      });
  };
  return (
    <section className="relative w-full bg-gradient-to-r from-zinc-900 via-purple-950 to-zinc-900 min-h-[140vh] flex flex-col items-center  pb-10">
      <div className="font-text text-base  relative flex justify-between items-center w-full  mt-2 px-3 xl:mt-3 xl:px-12 2xl:text-lg">
        <picture className=" flex items-center justify-center w-[120px] lg:w-[150px] 2xl:w-[180px] ">
          <img src={imgLogo} alt="logo" />
        </picture>

        <ul className="flex gap-4 xl:gap-8 2xl:gap-12 text-sm lg:text-base 2xl:text-lg">
          <li className="text-zinc-100 border-l-2 border-purple-500 pl-2 py-1 hover:scale-105 hover:text-white duration-500 ">
            <Link to={"/"}>Home</Link>
          </li>

          <li
            onClick={() => logout()}
            className="text-purple-700 border-l-2 pl-2 py-1 border-purple-700 cursor-pointer  hover:scale-105 hover:text-white duration-500"
          >
            Cerrar Sesión
          </li>
        </ul>
      </div>

      <article className="self-start lg:text-center lg:self-center pl-5 mt-6 lg:mt-2 relative w-full">
        <div className="text-zinc-200 text-4xl font-title lg:text-6xl ">
          Panel de Control
        </div>
        <p className="text-zinc-400 mt-2 lg:text-xl lg:mt-3">
          Crea, edita y organiza el contenido de forma sencilla
        </p>
      </article>

      {/* PERFILES */}
      {pendingEvas.length > 0 && (
        <section className="w-full flex flex-col items-center gap-6 mt-7 xl:mt-20 xl:px-[10%] ">
          <div className="text-center w-full ">
            <h6 className="font-title text-2xl text-zinc-200 xl:text-5xl">
              Perfiles Pendientes de aprobación
            </h6>
            <p className="text-purple-600 text-sm font-text mt-1">
              {pendingEvas.length}{" "}
              {pendingEvas.length === 1 ? "perfil nuevo" : "perfiles nuevos"}{" "}
              esperando revisión
            </p>
          </div>
          <div className="w-full flex  items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {pendingEvas.map((eva) => (
              <PendingEvaCard
                key={eva._id}
                eva={eva}
                onApprove={approveEva}
                onReject={deleteEva}
                formatUrl={formatUrl}
              />
            ))}
          </div>
        </section>
      )}
      {/* HISTORIAS */}
      {pendingStories.length > 0 && (
      <section className="w-full flex flex-col items-center gap-6 mt-7 xl:mt-20 xl:px-[10%] ">
          <div className="text-center w-full ">
            <h6 className="font-title text-2xl text-zinc-200 xl:text-5xl">
              Historias Pendientes de aprobación
            </h6>
            <p className="text-purple-600 text-sm font-text mt-1">
              {pendingStories.length}{" "}
              {pendingStories.length === 1 ? "historia" : "historias"} esperando
              revisión
            </p>
          </div>
          <div className="w-full gap-3 px-2 flex items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {pendingStories.map(({ eva, story }) => (
              <PendingStoryCard
                key={story._id}
                eva={eva}
                story={story}
                onApprove={approveStory}
                onReject={rejectStory}
                formatUrl={formatUrl}
              />
            ))}
          </div>
        </section>
      )}
      <section className="mt-12 w-full flex flex-col items-center px-4   bg-gradient-r from-zinc-900 via-purple-950 to-zinc-900">
        <section className="relative max-w-md w-full  rounded-xl bg-gradient-tr from-zinc-900 via-purple-950 to-zinc-900 border border-purple-600 overflow-hidden py-8 px-4 flex flex-col gap-4 lg:max-w-[880px] xl:max-w-[1100px] ">
          <img src={icon} alt="icon" className="w-10 absolute top-3 right-3" />
          <img src={icon} alt="icon" className="w-10 absolute top-3 left-3" />

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
                <label className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
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
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Horario
                </label>
              </div>
              <div className="relative font-text flex gap-6 items-center">
                <p className="text-zinc-400">Is Active?</p>
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
            <div className="relative font-text text-zinc-400  flex gap-2 flex-col justify-center items-center">
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
                className="font-light text-zinc-300 text-xl"
              >
                Imágenes
              </label>
              <div className="relative mt-3">
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
                  className="rounded-lg flex-1 appearance-none w-full max-w-[400px] py-3 px-12 border border-purple-300 text-white placeholder-white text-sm focus:outline-none focus:border-transparent cursor-pointer bg-purple-900"
                >
                  Seleccionar archivo
                </label>
              </div>
              {loadingImage ? (
                <div className="text-zinc-400">Cargando imagen...</div>
              ) : (
                <div className="flex flex-wrap justify-center items-center mt-6  gap-3 xl:gap-7">
                  {images?.map((img, index) => (
                    <div key={img?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img)}
                        className="absolute right-0 px-2 border-2 border-zinc-400 flex items-center rounded-md font-semibold text-white bg-red-700"
                      >
                        X
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetCoverImage(img)}
                        title={
                          index === 0 ? "Portada actual" : "Usar como portada"
                        }
                        className={`absolute left-0 px-2 border-2 flex items-center rounded-sm text-sm font-bold z-10 ${
                          index === 0
                            ? "bg-amber-400 border-amber-400 text-zinc-900"
                            : "bg-zinc-800 border-zinc-400 text-amber-400"
                        }`}
                      >
                        ★
                      </button>
                      <img
                        className={`w-32 h-32 object-cover 2xl:w-36 2xl:h-36 border border-purple-600 rounded-md ${
                          index === 0 ? "ring-2 ring-amber-400" : ""
                        }`}
                        src={formatUrl(img?.secure_url)}
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
                className="font-light text-zinc-300 text-xl"
              >
                Videos
              </label>
              <div className="relative mt-3">
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
                  className="rounded-lg flex-1 appearance-none w-full max-w-[400px] py-3 px-12 border border-purple-300 text-white placeholder-white text-sm focus:outline-none focus:border-transparent cursor-pointer bg-purple-900"
                >
                  Seleccionar archivo
                </label>
              </div>
              {loadingVideo ? (
                <div className="text-zinc-400">Cargando video...</div>
              ) : (
                <div className="flex flex-wrap justify-center items-center gap-3 mt-6 xl:gap-7">
                  {videos?.map((video) => (
                    <div key={video?.public_id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(video)}
                        className="absolute right-0 px-2 border-2 border-zinc-400 flex items-center rounded-sm font-bold text-white bg-red-700 z-50"
                      >
                        X
                      </button>
                      <video
                        className="w-32 h-32 object-cover 2xl:w-36 2xl:h-36 rounded-md border border-purple-600"
                        src={formatUrl(video?.secure_url)}
                        controls
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="w-full font-text py-2 px-4 border-[1px] border-purple-500 bg-purple-950 rounded-md shadow-lg text-purple-200 font-semibold transition duration-200 lg:py-4 hover:bg-purple-900"
                type="submit"
                style={{
                  boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                }}
              >
                CARGAR EVA
              </button>
            </div>
          </form>
        </section>

        <div className="mt-14 text-3xl font-title text-zinc-200 lg:text-5xl flex items-center justify-center w-full gap-6 xl:mt-20">
          <div className="w-16 h-[1px] bg-purple-600 lg:w-1/3"></div>
          <div className="lg:w-1/3 text-center">TODAS LAS EVAS</div>
          <div className="lg:w-1/3 w-16 h-[1px] bg-purple-600"></div>
        </div>
        <section className=" w-full grid md:grid-cols-2 lg:grid-cols-3  gap-y-6 gap-x-4  justify-center items-center mt-9 md:gap-y-10 xl:mt-12 xl:gap-x-6 xl:gap-y-6 xl:px-[10%]">
          {approvedEvas && approvedEvas.length > 0 ? (
            approvedEvas.map((eva, index) =>
              eva ? (
                <div key={eva._id || index}>
                  <CardAdminEva
                    eva={eva}
                    onEdit={() => setEvaSelected(eva)}
                    onDelete={() => deleteEva(eva._id)}
                  />
                </div>
              ) : null,
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

const PendingStoryCard = ({ eva, story, onApprove, onReject, formatUrl }) => (
  <div className="w-[280px] bg-gradient-to-tr from-zinc-900 via-purple-950 to-zinc-900 border border-purple-600 rounded-xl overflow-hidden shadow-lg lg:w-[270px]">
    <div className="relative">
      {story.type === "video" ? (
        <video
          className="w-full h-52 object-cover"
          src={formatUrl(story.secure_url)}
          controls
        />
      ) : (
        <img
          src={formatUrl(story.secure_url)}
          alt={eva.name}
          className="w-full h-52 object-cover lg:h-64"
        />
      )}
      <span className="absolute top-2 left-2 bg-yellow-500 border text-zinc-800 text-xs font-bold px-3 py-1 rounded-full font-text">
        Pendiente
      </span>
    </div>
    <div className="p-3 space-y-2 font-text">
      <p className="text-white text-base font-semibold truncate lg:text-lg">{eva.name}</p>
      <p className="text-zinc-400 text-xs lg:text-base">Categoría: <span className="text-purple-500">{eva.category}</span>  </p>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onApprove(eva._id, story._id)}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold py-2 rounded-md transition-colors border"
        >
          Aprobar
        </button>
        <button
          onClick={() => onReject(eva._id, story._id)}
          className="flex-1 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-md transition-colors border"
        >
          Rechazar
        </button>
      </div>
    </div>
  </div>
);
