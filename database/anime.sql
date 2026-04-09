CREATE DATABASE IF NOT EXISTS anime_db;
USE anime_db;

CREATE TABLE IF NOT EXISTS anime (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  estudio VARCHAR(100) NOT NULL,
  ano_lancamento INT NOT NULL,
  temporada VARCHAR(20) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  demografico VARCHAR(30) NOT NULL
);

INSERT INTO anime (titulo, estudio, ano_lancamento, temporada, genero, demografico) VALUES
('Cardcaptor Sakura', 'Madhouse', 1998, 'Primavera', 'Mahou Shoujo', 'Shoujo'),
('GTO', 'TMS Entertainment', 1999, 'Verão', 'Comedy', 'Shounen'),
('Gakkou Gurashi', 'Lerche', 2015, 'Verão', 'Horror', 'Seinen'),
('Mushoku Tensei', 'Studio Bind', 2021, 'Inverno', 'Isekai', 'Seinen'),
('Barakamon', 'Kinema Citrus', 2014, 'Verão', 'Slice of Life', 'Seinen'),
('NHK ni Youkoso', 'Gonzo', 2006, 'Verão', 'Psychological', 'Seinen'),
('Lucky Star', 'Kyoto Animation', 2007, 'Primavera', 'Slice of Life', 'Seinen'),
('Kino no Tabi', 'A.C.G.T.', 2003, 'Outono', 'Adventure', 'Seinen'),
('School Days', 'TNK', 2007, 'Verão', 'Romance', 'Seinen'),
('Made in Abyss', 'Kinema Citrus', 2017, 'Verão', 'Adventure', 'Seinen');
