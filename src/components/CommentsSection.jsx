import { useState, useEffect } from "react";
import { getCommentsByEva, postComment } from "../api/comments";

const CommentsSection = ({ evaId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!evaId) return;
    getCommentsByEva(evaId)
      .then(setComments)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [evaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSending(true);
    try {
      const newComment = await postComment(evaId, { name, text });
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al enviar el comentario");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto space-y-8 font-text mt-9 px-4 lg:max-w-3xl lg:mt-10">
      <h3 className="font-title text-4xl text-white text-center lg:text-5xl">
        Comentarios
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          className="w-full rounded-lg px-4 py-2 bg-black/30 border border-purple-600 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 lg:py-3"
        />
        <textarea
          placeholder="Dejá tu comentario..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full rounded-lg px-4 py-2 bg-black/30 border border-purple-600 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 lg:h-36 lg:py-3"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="cursor-pointer px-6 py-2 rounded-md border border-purple-500 text-purple-200 hover:bg-purple-900 transition-colors disabled:opacity-[0.5] lg:px-12"
        >
          {sending ? "Enviando..." : "Comentar"}
        </button>
      </form>

      {loading ? (
        <p className="text-zinc-500 text-center">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="text-zinc-500 text-center">
          Todavía no hay comentarios. ¡Sé el primero!
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-black/20 border border-purple-800 rounded-lg p-3 lg:p-5"
            >
              <div className="flex justify-between items-baseline">
                <p className="text-purple-400 text-sm font-semibold lg:text-base">
                  {c.name}
                </p>
                <p className="text-zinc-500 text-xs md:text-sm ">
                  {new Date(c.createdAt).toLocaleDateString("es-AR")}
                </p>
              </div>
              <p className="text-zinc-300 text-sm mt-2 text-balance font-text whitespace-pre-wrap lg:text-base lg:mt-3">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsSection;