import CardAdminEva from "../components/CardAdminEva";
import imgLogo from "/0003.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { getEvas } from "../api/handlers";
import LocationSelector from "../components/LocationSelector";
import axios from "../api/axiosRender";
import icon from "/icon14.png";
import {
  SectionCard,
  FormInput,
  PhysicalFields,
  DescriptionField,
  DEPILACION_OPTIONS,
  OTRO_LABEL,
} from "../components/ProfileFormFields";

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

// Separa la depilación guardada en { opción, detalle } para el formulario
const splitDepilacion = (value) => {
  const isPreset = DEPILACION_OPTIONS.includes(value);
  return {
    depilacion: isPreset ? value : value ? OTRO_LABEL : "",
    depilacionDetalle: isPreset ? "" : value || "",
  };
};

const AdminPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    setError,
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
        ...splitDepilacion(evaSelected.description?.depilacion),
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
        depilacionDetalle: "",
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
      // depilacionDetalle es solo auxiliar del formulario, no se envía suelto
      const { depilacionDetalle, ...formData } = data;

      const evaData = {
        ...formData,
        description: {
          edad: data.edad,
          altura: data.altura,
          peso: data.peso,
          medidas: data.medidas,
          depilacion:
            data.depilacion === OTRO_LABEL
              ? depilacionDetalle || data.depilacion
              : data.depilacion,
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
        {/* ---------- FORMULARIO ---------- */}
        <section className="relative max-w-md w-full rounded-2xl shadow-2xl border-y border-purple-600 shadow-black overflow-hidden pt-12 pb-9 px-3 space-y-8 md:max-w-[700px] lg:max-w-[850px] xl:max-w-[1100px] xl:px-8">
          <div className="text-center">
            <img
              src={icon}
              alt="icon"
              className="w-10 absolute top-3 right-3"
            />
            <img src={icon} alt="icon" className="w-10 absolute top-3 left-3" />

            <h6 className="font-title text-6xl font-extrabold text-white xl:text-8xl">
              ADMIN FORM
            </h6>
            <p className="text-gray-200 font-text text-base mt-3 xl:text-xl">
              Create your bitch
            </p>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <SectionCard
              title="Datos básicos"
              subtitle="Nombre, contacto y categoría"
            >
              <div className="grid gap-6 xl:grid-cols-2">
                <FormInput
                  label="Nombre"
                  name="name"
                  register={register}
                  error={errors.name}
                  required
                />
                <FormInput
                  label="Whatsapp"
                  name="wttp"
                  register={register}
                  error={errors.wttp}
                  required
                />
                <FormInput
                  label="Categoría"
                  name="category"
                  register={register}
                  error={errors.category}
                  required
                />
                <div className="flex items-center gap-6 font-text">
                  <p className="text-sm text-purple-200">¿Perfil activo?</p>
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
            </SectionCard>

            <SectionCard
              title="Ubicación"
              subtitle="Dónde te van a poder buscar los clientes"
            >
              <LocationSelector
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
            </SectionCard>

            <SectionCard
              title="Datos físicos"
              subtitle="Opcional, pero ayuda a que la encuentren"
            >
              <PhysicalFields
                register={register}
                watch={watch}
                setValue={setValue}
                resetKey={evaSelected?._id || "new"}
              />
            </SectionCard>

            <SectionCard
              title="Descripción"
              subtitle="Contá un poco más sobre ella"
            >
              <DescriptionField
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </SectionCard>

            <SectionCard
              title="Imágenes"
              subtitle="La primera impresión. Subí las mejores fotos"
            >
              <div className="flex flex-col items-center gap-6">
                <input
                  id="imageUpload"
                  type="file"
                  name="image"
                  accept=".jpg,.png,.jpeg"
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                  disabled={loadingImage}
                />
                <label
                  htmlFor="imageUpload"
                  className="rounded-lg w-full max-w-[320px] -mt-2 py-3 px-8 border border-purple-500 text-zinc-300 text-sm text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-text hover:bg-purple-900 lg:self-start"
                >
                  {loadingImage ? "Subiendo..." : "+ Agregar imagen"}
                </label>
                {images?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-6 mt-5 xl:gap-4">
                    {images.map((img, index) => (
                      <div key={img?.public_id} className="relative group">
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img)}
                          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-md font-semibold text-zinc-300 bg-red-600 hover:bg-red-500 text-xs shadow-md z-10"
                        >
                          ×
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetCoverImage(img)}
                          title={
                            index === 0 ? "Portada actual" : "Usar como portada"
                          }
                          className={`absolute -top-2 -left-2 w-9 h-9 flex items-center justify-center rounded-full text-base shadow-md z-10 transition-colors ${
                            index === 0
                              ? "bg-amber-400 text-zinc-900 border border-white"
                              : "text-zinc-900 border border-white"
                          }`}
                        >
                          ★
                        </button>
                        <img
                          className={`w-32 h-44 object-cover rounded-lg xl:w-40 xl:h-56 border-[2px] ${
                            index === 0
                              ? "border-amber-400 "
                              : "border-purple-600"
                          }`}
                          src={formatUrl(img?.secure_url)}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-zinc-500 text-sm">
                La portada solo se puede cambiar al editar una Eva ya guardada.
              </div>
            </SectionCard>

            <SectionCard title="Videos" subtitle="Opcional">
              <div className="flex flex-col items-center gap-4">
                <input
                  id="videoUpload"
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={(e) => handleVideo(e)}
                  className="hidden"
                  disabled={loadingVideo}
                />
                <label
                  htmlFor="videoUpload"
                  className="rounded-lg w-full max-w-[320px] py-3 px-8 border border-purple-500 text-zinc-300 text-sm text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-text hover:bg-purple-900 lg:self-start -mt-2"
                >
                  {loadingVideo ? "Subiendo..." : "+ Agregar video"}
                </label>
                {videos?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 mt-5 xl:gap-4">
                    {videos.map((video) => (
                      <div key={video?.public_id} className="relative group">
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(video)}
                          className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-md font-semibold text-zinc-300 bg-red-600 hover:bg-red-500 text-xs shadow-md z-10"
                        >
                          x
                        </button>
                        <video
                          className="w-32 h-44 object-cover rounded-lg xl:w-40 xl:h-56 border-[2px] border-purple-600"
                          src={formatUrl(video?.secure_url)}
                          controls
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SectionCard>

            <div className="flex items-center justify-center pt-2">
              <button
                className="w-full font-text py-2 px-4 border-[1px] border-purple-500  rounded-md shadow-lg text-purple-200 font-semibold transition duration-200 lg:py-4 hover:bg-purple-900"
                type="submit"
                style={{
                  boxShadow: "8px 8px 16px #6e11b0, -3px -3px 3px #6e11b0",
                }}
              >
                {evaSelected ? "GUARDAR CAMBIOS" : "CARGAR EVA"}
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
      <p className="text-white text-base font-semibold truncate lg:text-lg">
        {eva.name}
      </p>
      <p className="text-zinc-400 text-xs lg:text-base">
        Categoría: <span className="text-purple-500">{eva.category}</span>{" "}
      </p>
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
