const db = require("../db");

const listarAnime = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query("SELECT COUNT(*) AS total FROM anime", (err, countResult) => {
    if (err) return res.status(500).json({ erro: "Erro ao contar anime." });

    const total = countResult[0].total;

    db.query("SELECT * FROM anime LIMIT ? OFFSET ?", [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao listar anime." });

      res.json({ total, page, limit, data: results });
    });
  });
};

const buscarAnimePorId = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM anime WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar anime." });
    if (results.length === 0) return res.status(404).json({ erro: "Anime não encontrado." });

    res.json(results[0]);
  });
};

const criarAnime = (req, res) => {
  const { titulo, estudio, ano_lancamento, temporada, genero, demografico } = req.body;

  if (!titulo || !estudio || !ano_lancamento || !temporada || !genero || !demografico) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  if (isNaN(ano_lancamento) || ano_lancamento < 1900 || ano_lancamento > 2100) {
    return res.status(400).json({ erro: "Ano de lançamento inválido." });
  }

  db.query(
    "INSERT INTO anime (titulo, estudio, ano_lancamento, temporada, genero, demografico) VALUES (?, ?, ?, ?, ?, ?)",
    [titulo, estudio, ano_lancamento, temporada, genero, demografico],
    (err, result) => {
      if (err) return res.status(500).json({ erro: "Erro ao cadastrar anime." });
      res.status(201).json({ mensagem: "Anime cadastrado com sucesso.", id: result.insertId });
    }
  );
};

const atualizarAnime = (req, res) => {
  const { id } = req.params;
  const { titulo, estudio, ano_lancamento, temporada, genero, demografico } = req.body;

  if (!titulo || !estudio || !ano_lancamento || !temporada || !genero || !demografico) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  if (isNaN(ano_lancamento) || ano_lancamento < 1900 || ano_lancamento > 2100) {
    return res.status(400).json({ erro: "Ano de lançamento inválido." });
  }

  db.query(
    "UPDATE anime SET titulo = ?, estudio = ?, ano_lancamento = ?, temporada = ?, genero = ?, demografico = ? WHERE id = ?",
    [titulo, estudio, ano_lancamento, temporada, genero, demografico, id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: "Erro ao atualizar anime." });
      if (result.affectedRows === 0) return res.status(404).json({ erro: "Anime não encontrado." });

      res.json({ mensagem: "Anime atualizado com sucesso." });
    }
  );
};

const deletarAnime = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM anime WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao deletar anime." });
    if (result.affectedRows === 0) return res.status(404).json({ erro: "Anime não encontrado." });

    res.json({ mensagem: "Anime deletado com sucesso." });
  });
};

module.exports = { listarAnime, buscarAnimePorId, criarAnime, atualizarAnime, deletarAnime };
