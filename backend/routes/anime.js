const express = require("express");
const router = express.Router();
const {
  listarAnime,
  buscarAnimePorId,
  criarAnime,
  atualizarAnime,
  deletarAnime,
} = require("../controllers/animeController");

router.get("/", listarAnime);
router.get("/:id", buscarAnimePorId);
router.post("/", criarAnime);
router.put("/:id", atualizarAnime);
router.delete("/:id", deletarAnime);

module.exports = router;
