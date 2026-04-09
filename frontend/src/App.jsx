import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListaAnime from "./pages/ListaAnime";
import FormAnime from "./pages/FormAnime";
import DetalhesAnime from "./pages/DetalhesAnime";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className={styles.header}>
        <Link to="/">
          <h1 className={styles.logo}>MyAni<span>List</span></h1>
        </Link>
        <Link to="/novo" className={styles.btnNovo}>+ Novo Anime</Link>
        <p className={styles.aluno}>Desenvolvido por Danillo Camargo</p>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<ListaAnime />} />
          <Route path="/novo" element={<FormAnime />} />
          <Route path="/editar/:id" element={<FormAnime />} />
          <Route path="/anime/:id" element={<DetalhesAnime />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
