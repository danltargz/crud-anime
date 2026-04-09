import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarAnimePorId, deletarAnime } from "../api/anime";
import styles from "./DetalhesAnime.module.css";

export default function DetalhesAnime() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarAnimePorId(id)
      .then((res) => setAnime(res.data))
      .catch(() => setErro("Anime não encontrado."));
  }, [id]);

  const handleDeletar = async () => {
    if (!confirm(`Deseja remover "${anime.titulo}"?`)) return;
    try {
      await deletarAnime(id);
      navigate("/");
    } catch {
      setErro("Erro ao remover anime.");
    }
  };

  if (erro) return <p className={styles.erro}>{erro}</p>;
  if (!anime) return <p className={styles.msg}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <button className={styles.btnVoltar} onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className={styles.card}>
        <h2 className={styles.titulo}>{anime.titulo}</h2>

        <div className={styles.tags}>
          <span className={styles.tag}>{anime.genero}</span>
          <span className={styles.tag}>{anime.demografico}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.label}>Estúdio</span>
            <span>{anime.estudio}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Ano de Lançamento</span>
            <span>{anime.ano_lancamento}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Temporada</span>
            <span>{anime.temporada}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Gênero</span>
            <span>{anime.genero}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Demográfico</span>
            <span>{anime.demografico}</span>
          </div>
        </div>

        <div className={styles.botoes}>
          <button className={styles.btnEditar} onClick={() => navigate(`/editar/${anime.id}`)}>
            Editar
          </button>
          <button className={styles.btnDeletar} onClick={handleDeletar}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
