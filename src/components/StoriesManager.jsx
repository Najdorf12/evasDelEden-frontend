import { useState, useRef } from "react";
import axios from "../api/axiosRender";

const isExpired = (story) =>
  story.expiresAt && new Date(story.expiresAt) < new Date();

const StoriesManager = ({ stories, setStories, formatUrl, onStorySubmitted }) => {
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const cancelSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const confirmUpload = async () => {
    if (!pendingFile) return;
    const isVideo = pendingFile.type.startsWith("video/");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append(isVideo ? "video" : "image", pendingFile);

      const uploadRes = await axios.post(
        isVideo ? "/upload/video" : "/upload/image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const storyRes = await axios.post("/eva-modelo/story", {
        public_id: uploadRes.data.public_id,
        secure_url: uploadRes.data.secure_url,
        type: isVideo ? "video" : "image",
      });

      setStories(storyRes.data.stories);
      cancelSelection();
      if (onStorySubmitted) onStorySubmitted();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al subir la historia");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (story) => {
    if (!window.confirm("¿Eliminar esta historia?")) return;
    try {
      const res = await axios.delete("/eva-modelo/story", {
        params: { public_id: story.public_id },
      });
      setStories(res.data.stories);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al eliminar la historia");
    }
  };

  const activeStories = stories.filter((s) => !isExpired(s));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Paso 1: elegir archivo */}
      {!pendingFile && (
        <>
          <input
            ref={inputRef}
            id="storyUpload"
            type="file"
            accept="image/*,video/*"
            onChange={handleSelectFile}
            className="hidden"
          />
          <label
            htmlFor="storyUpload"
            className="rounded-lg w-full max-w-[320px] py-3 px-8 border border-purple-500 text-white text-sm text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors font-text hover:bg-purple-900 lg:self-start"
          >
            + Elegir foto o video para historia
          </label>
        </>
      )}

      {/* Paso 2: preview + confirmación explícita */}
      {pendingFile && (
        <div className="flex flex-col items-center gap-3 border border-purple-600 rounded-lg p-4 bg-black/20 w-full max-w-[320px]">
          <p className="text-zinc-300 text-xs font-text text-center">
            Revisá tu historia antes de enviarla. Va a quedar{" "}
            <span className="text-yellow-400">pendiente de aprobación</span>{" "}
            hasta que el admin la revise.
          </p>
          {pendingFile.type.startsWith("video/") ? (
            <video
              src={previewUrl}
              className="w-40 h-56 lg:w-52 lg:h-64 object-cover rounded-lg border-2 border-purple-600"
              controls
            />
          ) : (
            <img
              src={previewUrl}
              alt="preview"
              className="w-40 h-56 lg:w-52 lg:h-64 object-cover rounded-lg border-2 border-purple-600"
            />
          )}
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={cancelSelection}
              disabled={uploading}
              className="flex-1 py-2 rounded-md border border-zinc-500 text-zinc-300 text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmUpload}
              disabled={uploading}
              className="flex-1 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {uploading ? "Subiendo..." : "Subir historia"}
            </button>
          </div>
        </div>
      )}

      {/* Historias ya cargadas */}
      {activeStories.length === 0 ? (
        <p className="text-zinc-500 text-sm font-text">
          No tenés historias activas.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center mt-6 gap-3 xl:gap-4">
          {activeStories.map((story) => {
            const remainingMs = new Date(story.expiresAt) - new Date();
            const remainingHs = Math.max(
              0,
              Math.floor(remainingMs / (1000 * 60 * 60)),
            );
            const isPending = story.status === "pending";
            return (
              <div key={story.public_id} className="relative group">
                <button
                  type="button"
                  onClick={() => handleDelete(story)}
                  className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full font-bold text-white bg-red-600 hover:bg-red-500 text-xs shadow-md z-10"
                >
                  ×
                </button>
                <span
                  className={`absolute top-1 left-1 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 ${
                    isPending
                      ? "bg-yellow-500 text-zinc-900"
                      : "bg-green-500 text-zinc-900"
                  }`}
                >
                  {isPending ? "Pendiente" : "Aprobada"}
                </span>
                {story.type === "video" ? (
                  <video
                    className="w-28 h-40 lg:w-40 lg:h-56 object-cover rounded-lg border-2 border-purple-600"
                    src={formatUrl(story.secure_url)}
                    controls
                  />
                ) : (
                  <img
                    className="w-28 h-40 lg:w-40 lg:h-56 object-cover rounded-lg border-2 border-purple-600"
                    src={formatUrl(story.secure_url)}
                    alt=""
                  />
                )}
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-text">
                  {remainingHs}h restantes
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoriesManager;