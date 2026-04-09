const express = require("express");
const cors = require("cors");
const animeRoutes = require("./routes/anime");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/anime", animeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
