import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarAnime, deletarAnime } from "../api/anime";
import styles from "./ListaAnime.module.css";

export default function ListaAnime() {
  const [anime, setAnime] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(true);
  const limit = 10;
  const navigate = useNavigate();

  const fetchAnime = async () => {
    setCarregando(true);
    setErro("");
    try {
      const res = await listarAnime(page, limit);
      setAnime(res.data.data);
      setTotal(res.data.total);
    } catch {
      setErro("Erro ao carregar anime. Verifique se o servidor está rodando.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [page]);

  const handleDeletar = async (id, titulo) => {
    if (!confirm(`Deseja remover "${titulo}"?`)) return;
    try {
      await deletarAnime(id);
      setSucesso("Anime removido com sucesso.");
      setTimeout(() => setSucesso(""), 3000);
      fetchAnime();
    } catch {
      setErro("Erro ao remover anime.");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2 className={styles.titulo}>Todos os Animes <span className={styles.total}>({total})</span></h2>

      {erro && <p className={styles.erro}>{erro}</p>}
      {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

      {carregando ? (
        <p className={styles.msg}>Carregando...</p>
      ) : anime.length === 0 ? (
        <p className={styles.msg}>Nenhum anime cadastrado.</p>
      ) : (
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Estúdio</th>
              <th>Ano</th>
              <th>Temporada</th>
              <th>Gênero</th>
              <th>Demográfico</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {anime.map((item) => (
              <tr key={item.id}>
                <td
                  className={styles.tituloLink}
                  onClick={() => navigate(`/anime/${item.id}`)}
                >
                  {item.titulo}
                </td>
                <td>{item.estudio}</td>
                <td>{item.ano_lancamento}</td>
                <td>{item.temporada}</td>
                <td><span className={styles.tag}>{item.genero}</span></td>
                <td><span className={styles.tag}>{item.demografico}</span></td>
                <td className={styles.acoes}>
                  <button
                    className={styles.btnEditar}
                    onClick={() => navigate(`/editar/${item.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.btnDeletar}
                    onClick={() => handleDeletar(item.id, item.titulo)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className={styles.paginacao}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            ← Anterior
          </button>
          <span>Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}
