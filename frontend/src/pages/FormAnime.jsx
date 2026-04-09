import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarAnime, atualizarAnime, buscarAnimePorId } from "../api/anime";
import styles from "./FormAnime.module.css";

const GENEROS = ["Shounen", "Shoujo", "Seinen", "Josei", "Slice of Life", "Isekai", "Mecha", "Mahou Shoujo", "Romance", "Horror", "Psychological", "Adventure", "Comedy", "Dark Fantasy", "Sports", "Mystery"];
const DEMOGRAFICOS = ["Shounen", "Shoujo", "Seinen", "Josei", "Kodomomuke"];
const TEMPORADAS = ["Inverno", "Primavera", "Verão", "Outono"];

const camposIniciais = {
  titulo: "",
  estudio: "",
  ano_lancamento: "",
  temporada: "",
  genero: "",
  demografico: "",
};

export default function FormAnime() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = Boolean(id);

  const [form, setForm] = useState(camposIniciais);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!isEdicao) return;
    buscarAnimePorId(id)
      .then((res) => setForm(res.data))
      .catch(() => setErro("Erro ao carregar dados do anime."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const { titulo, estudio, ano_lancamento, temporada, genero, demografico } = form;
    if (!titulo || !estudio || !ano_lancamento || !temporada || !genero || !demografico) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }
    const ano = parseInt(ano_lancamento);
    if (isNaN(ano) || ano < 1900 || ano > 2100) {
      setErro("Ano de lançamento inválido.");
      return;
    }

    setCarregando(true);
    try {
      if (isEdicao) {
        await atualizarAnime(id, form);
      } else {
        await criarAnime(form);
      }
      navigate("/");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao salvar anime.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>{isEdicao ? "Editar Anime" : "Novo Anime"}</h2>

      {erro && <p className={styles.erro}>{erro}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.campo}>
          <label>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ex: Cardcaptor Sakura" />
        </div>

        <div className={styles.campo}>
          <label>Estúdio</label>
          <input name="estudio" value={form.estudio} onChange={handleChange} placeholder="Ex: Madhouse" />
        </div>

        <div className={styles.linha}>
          <div className={styles.campo}>
            <label>Ano de Lançamento</label>
            <input name="ano_lancamento" type="number" value={form.ano_lancamento} onChange={handleChange} placeholder="Ex: 1998" />
          </div>

          <div className={styles.campo}>
            <label>Temporada</label>
            <select name="temporada" value={form.temporada} onChange={handleChange}>
              <option value="">Selecione</option>
              {TEMPORADAS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.linha}>
          <div className={styles.campo}>
            <label>Gênero</label>
            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="">Selecione</option>
              {GENEROS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div className={styles.campo}>
            <label>Demográfico</label>
            <select name="demografico" value={form.demografico} onChange={handleChange}>
              <option value="">Selecione</option>
              {DEMOGRAFICOS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.botoes}>
          <button type="button" className={styles.btnCancelar} onClick={() => navigate("/")}>
            Cancelar
          </button>
          <button type="submit" className={styles.btnSalvar} disabled={carregando}>
            {carregando ? "Salvando..." : isEdicao ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
