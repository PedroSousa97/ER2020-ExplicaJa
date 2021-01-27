-- --------------------------------------------------------
-- Anfitrião:                    127.0.0.1
-- Versão do servidor:           10.5.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for explicaapp
CREATE DATABASE IF NOT EXISTS `explicaapp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `explicaapp`;

-- Dumping structure for table explicaapp.avaliação
CREATE TABLE IF NOT EXISTS `avaliação` (
  `idAvaliação` int(11) NOT NULL AUTO_INCREMENT,
  `Explicador_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Avaliação` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`idAvaliação`),
  KEY `fk_Avaliação_Explicador1_idx` (`Explicador_Pessoa_idPessoa`),
  CONSTRAINT `fk_Avaliação_Explicador1` FOREIGN KEY (`Explicador_Pessoa_idPessoa`) REFERENCES `explicador` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.avaliação: ~3 rows (approximately)
/*!40000 ALTER TABLE `avaliação` DISABLE KEYS */;
INSERT INTO `avaliação` (`idAvaliação`, `Explicador_Pessoa_idPessoa`, `Avaliação`) VALUES
	(5, 19, 'Excelente'),
	(6, 19, 'Suficiente'),
	(7, 24, 'Excelente');
/*!40000 ALTER TABLE `avaliação` ENABLE KEYS */;

-- Dumping structure for table explicaapp.conteúdos
CREATE TABLE IF NOT EXISTS `conteúdos` (
  `idConteúdos` int(11) NOT NULL AUTO_INCREMENT,
  `Título` varchar(45) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Disciplinas_idDisciplinas` int(11) NOT NULL,
  PRIMARY KEY (`idConteúdos`),
  KEY `fk_Conteúdos_Disciplinas1_idx` (`Disciplinas_idDisciplinas`),
  CONSTRAINT `fk_Conteúdos_Disciplinas1` FOREIGN KEY (`Disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`idDisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.conteúdos: ~5 rows (approximately)
/*!40000 ALTER TABLE `conteúdos` DISABLE KEYS */;
INSERT INTO `conteúdos` (`idConteúdos`, `Título`, `Description`, `Disciplinas_idDisciplinas`) VALUES
	(1, 'Aula 1', 'Conteúdos desta aula estarão disponíveis no seguinte link: https://www.explicamat.pt/matematica-12-ano.html', 13),
	(2, 'Aula 2', 'Método dos Mínimos Quadrados', 13),
	(3, 'Aula 3', 'Derivadas', 13),
	(4, 'Aula 4', 'Aula sobre Integrais, podem ver o resumo da mesma e resolução no seguinte link: https://www.explicamat.pt/matematica-12-ano.html', 13),
	(5, 'Aula 1', 'Física Quântica em 45 minutos', 17),
	(6, 'Aula 1', 'Aula de inglês conceitos básicos. Podem encontrar documentação em: https://videoconf-colibri.zoom.us/j/linkatualizado ', 19);
/*!40000 ALTER TABLE `conteúdos` ENABLE KEYS */;

-- Dumping structure for table explicaapp.disciplinas
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `idDisciplinas` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Ano` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idDisciplinas`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.disciplinas: ~5 rows (approximately)
/*!40000 ALTER TABLE `disciplinas` DISABLE KEYS */;
INSERT INTO `disciplinas` (`idDisciplinas`, `Nome`, `Ano`) VALUES
	(13, 'Matemática', 12),
	(14, 'Português', 5),
	(17, 'Física-Química', 12),
	(18, 'Português', 12),
	(19, 'Inglês', 12);
/*!40000 ALTER TABLE `disciplinas` ENABLE KEYS */;

-- Dumping structure for table explicaapp.disciplinas_has_explicando
CREATE TABLE IF NOT EXISTS `disciplinas_has_explicando` (
  `Disciplinas_idDisciplinas` int(11) NOT NULL,
  `Explicando_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Progresso` float DEFAULT NULL,
  `Assiduidade` int(11) DEFAULT NULL,
  PRIMARY KEY (`Disciplinas_idDisciplinas`,`Explicando_Pessoa_idPessoa`),
  KEY `fk_Disciplinas_has_Explicando_Explicando1_idx` (`Explicando_Pessoa_idPessoa`),
  KEY `fk_Disciplinas_has_Explicando_Disciplinas1_idx` (`Disciplinas_idDisciplinas`),
  CONSTRAINT `fk_Disciplinas_has_Explicando_Disciplinas1` FOREIGN KEY (`Disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`idDisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Disciplinas_has_Explicando_Explicando1` FOREIGN KEY (`Explicando_Pessoa_idPessoa`) REFERENCES `explicando` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.disciplinas_has_explicando: ~5 rows (approximately)
/*!40000 ALTER TABLE `disciplinas_has_explicando` DISABLE KEYS */;
INSERT INTO `disciplinas_has_explicando` (`Disciplinas_idDisciplinas`, `Explicando_Pessoa_idPessoa`, `Progresso`, `Assiduidade`) VALUES
	(13, 17, 3, 3),
	(17, 22, 8, 8),
	(18, 17, NULL, NULL),
	(18, 22, NULL, NULL),
	(19, 22, 1, 1);
/*!40000 ALTER TABLE `disciplinas_has_explicando` ENABLE KEYS */;

-- Dumping structure for table explicaapp.disponibilidade
CREATE TABLE IF NOT EXISTS `disponibilidade` (
  `idDisponibilidade` int(11) NOT NULL AUTO_INCREMENT,
  `Explicador_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Dates` datetime DEFAULT NULL,
  PRIMARY KEY (`idDisponibilidade`),
  KEY `fk_Disponibilidade_Explicador1_idx` (`Explicador_Pessoa_idPessoa`),
  CONSTRAINT `fk_Disponibilidade_Explicador1` FOREIGN KEY (`Explicador_Pessoa_idPessoa`) REFERENCES `explicador` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.disponibilidade: ~6 rows (approximately)
/*!40000 ALTER TABLE `disponibilidade` DISABLE KEYS */;
INSERT INTO `disponibilidade` (`idDisponibilidade`, `Explicador_Pessoa_idPessoa`, `Dates`) VALUES
	(1, 19, '2021-02-05 14:45:00'),
	(2, 19, '2021-02-05 16:00:00'),
	(3, 19, '2021-02-10 19:00:00'),
	(5, 24, '2021-02-05 17:00:00'),
	(6, 24, '2021-02-24 13:17:00'),
	(7, 19, '2021-02-22 11:21:00');
/*!40000 ALTER TABLE `disponibilidade` ENABLE KEYS */;

-- Dumping structure for table explicaapp.encarregado
CREATE TABLE IF NOT EXISTS `encarregado` (
  `Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `MetodoPagamento` varchar(45) NOT NULL,
  PRIMARY KEY (`Pessoa_idPessoa`),
  KEY `fk_Encarregado_Pessoa1_idx` (`Pessoa_idPessoa`),
  CONSTRAINT `fk_Encarregado_Pessoa1` FOREIGN KEY (`Pessoa_idPessoa`) REFERENCES `pessoa` (`idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.encarregado: ~2 rows (approximately)
/*!40000 ALTER TABLE `encarregado` DISABLE KEYS */;
INSERT INTO `encarregado` (`Pessoa_idPessoa`, `MetodoPagamento`) VALUES
	(16, 'Anual'),
	(21, 'Anual');
/*!40000 ALTER TABLE `encarregado` ENABLE KEYS */;

-- Dumping structure for table explicaapp.explicador
CREATE TABLE IF NOT EXISTS `explicador` (
  `Pessoa_idPessoa` int(250) unsigned NOT NULL,
  `ID_Explicador` int(250) unsigned NOT NULL AUTO_INCREMENT,
  `DisciplinaID` int(250) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`Pessoa_idPessoa`),
  UNIQUE KEY `ID_Explicador_UNIQUE` (`ID_Explicador`),
  KEY `fk_Explicador_Pessoa_idx` (`Pessoa_idPessoa`),
  CONSTRAINT `fk_Explicador_Pessoa` FOREIGN KEY (`Pessoa_idPessoa`) REFERENCES `pessoa` (`idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.explicador: ~2 rows (approximately)
/*!40000 ALTER TABLE `explicador` DISABLE KEYS */;
INSERT INTO `explicador` (`Pessoa_idPessoa`, `ID_Explicador`, `DisciplinaID`) VALUES
	(19, 13, 13),
	(24, 16, 19);
/*!40000 ALTER TABLE `explicador` ENABLE KEYS */;

-- Dumping structure for table explicaapp.explicador_has_disciplinas
CREATE TABLE IF NOT EXISTS `explicador_has_disciplinas` (
  `Explicador_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Disciplinas_idDisciplinas` int(11) NOT NULL,
  PRIMARY KEY (`Explicador_Pessoa_idPessoa`,`Disciplinas_idDisciplinas`),
  KEY `fk_Explicador_has_Disciplinas_Disciplinas1_idx` (`Disciplinas_idDisciplinas`),
  KEY `fk_Explicador_has_Disciplinas_Explicador1_idx` (`Explicador_Pessoa_idPessoa`),
  CONSTRAINT `fk_Explicador_has_Disciplinas_Disciplinas1` FOREIGN KEY (`Disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`idDisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Explicador_has_Disciplinas_Explicador1` FOREIGN KEY (`Explicador_Pessoa_idPessoa`) REFERENCES `explicador` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.explicador_has_disciplinas: ~2 rows (approximately)
/*!40000 ALTER TABLE `explicador_has_disciplinas` DISABLE KEYS */;
INSERT INTO `explicador_has_disciplinas` (`Explicador_Pessoa_idPessoa`, `Disciplinas_idDisciplinas`) VALUES
	(19, 13),
	(24, 19);
/*!40000 ALTER TABLE `explicador_has_disciplinas` ENABLE KEYS */;

-- Dumping structure for table explicaapp.explicando
CREATE TABLE IF NOT EXISTS `explicando` (
  `Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Propina_Anual` float unsigned DEFAULT NULL,
  `Encarregado_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Escolaridade` int(10) unsigned NOT NULL,
  `NIFEncarregado` varchar(10) NOT NULL,
  `Propina_Mensal` float unsigned DEFAULT NULL,
  `Propina_Aula` float unsigned DEFAULT NULL,
  PRIMARY KEY (`Pessoa_idPessoa`),
  KEY `fk_Explicando_Pessoa1_idx` (`Pessoa_idPessoa`),
  KEY `fk_Explicando_Encarregado1_idx` (`Encarregado_Pessoa_idPessoa`),
  CONSTRAINT `fk_Explicando_Encarregado1` FOREIGN KEY (`Encarregado_Pessoa_idPessoa`) REFERENCES `encarregado` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Explicando_Pessoa1` FOREIGN KEY (`Pessoa_idPessoa`) REFERENCES `pessoa` (`idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.explicando: ~2 rows (approximately)
/*!40000 ALTER TABLE `explicando` DISABLE KEYS */;
INSERT INTO `explicando` (`Pessoa_idPessoa`, `Propina_Anual`, `Encarregado_Pessoa_idPessoa`, `Escolaridade`, `NIFEncarregado`, `Propina_Mensal`, `Propina_Aula`) VALUES
	(17, 0, 16, 12, '264794036', 0, 28),
	(22, 0, 21, 12, '343824834', 0, 0);
/*!40000 ALTER TABLE `explicando` ENABLE KEYS */;

-- Dumping structure for table explicaapp.faturas
CREATE TABLE IF NOT EXISTS `faturas` (
  `idFaturas` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Data` datetime NOT NULL,
  `Valor` float unsigned NOT NULL,
  `NIF` int(10) unsigned NOT NULL,
  `Encarregado_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idFaturas`),
  KEY `fk_Faturas_Encarregado1_idx` (`Encarregado_Pessoa_idPessoa`),
  CONSTRAINT `fk_Faturas_Encarregado1` FOREIGN KEY (`Encarregado_Pessoa_idPessoa`) REFERENCES `encarregado` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.faturas: ~3 rows (approximately)
/*!40000 ALTER TABLE `faturas` DISABLE KEYS */;
INSERT INTO `faturas` (`idFaturas`, `Data`, `Valor`, `NIF`, `Encarregado_Pessoa_idPessoa`) VALUES
	(1, '2021-01-26 09:20:38', 35, 234615436, 16),
	(2, '2021-01-26 10:29:36', 400, 234615436, 16),
	(3, '2021-01-27 09:22:35', 1400, 382483940, 21);
/*!40000 ALTER TABLE `faturas` ENABLE KEYS */;

-- Dumping structure for table explicaapp.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `idFeedback` int(11) NOT NULL AUTO_INCREMENT,
  `Feedback` longtext NOT NULL,
  `Explicador_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Explicando_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idFeedback`),
  KEY `fk_Feedback_Explicador1_idx` (`Explicador_Pessoa_idPessoa`),
  KEY `fk_Feedback_Explicando1_idx` (`Explicando_Pessoa_idPessoa`),
  CONSTRAINT `fk_Feedback_Explicador1` FOREIGN KEY (`Explicador_Pessoa_idPessoa`) REFERENCES `explicador` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Feedback_Explicando1` FOREIGN KEY (`Explicando_Pessoa_idPessoa`) REFERENCES `explicando` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.feedback: ~3 rows (approximately)
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` (`idFeedback`, `Feedback`, `Explicador_Pessoa_idPessoa`, `Explicando_Pessoa_idPessoa`) VALUES
	(1, 'Boas aulas e bom apoio a todos os alunos!', 19, 17),
	(2, 'Boas aulas, até parece ER que o meu irmão fala que tem na universidade', 19, 22),
	(4, 'Excelentes aulas, bom feedback', 24, 22);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;

-- Dumping structure for table explicaapp.link
CREATE TABLE IF NOT EXISTS `link` (
  `idLink` int(11) NOT NULL AUTO_INCREMENT,
  `Disciplinas_idDisciplinas` int(11) NOT NULL,
  `Link` longtext DEFAULT NULL,
  PRIMARY KEY (`idLink`),
  KEY `fk_Link_Disciplinas1_idx` (`Disciplinas_idDisciplinas`),
  CONSTRAINT `fk_Link_Disciplinas1` FOREIGN KEY (`Disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`idDisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.link: ~3 rows (approximately)
/*!40000 ALTER TABLE `link` DISABLE KEYS */;
INSERT INTO `link` (`idLink`, `Disciplinas_idDisciplinas`, `Link`) VALUES
	(1, 13, 'https://videoconf-colibri.zoom.us/j/linkatualizado'),
	(2, 17, 'https://videoconf-colibri.zoom.us/j/linkatualizado'),
	(3, 19, 'https://videoconf-colibri.zoom.us/j/linkatualizado');
/*!40000 ALTER TABLE `link` ENABLE KEYS */;

-- Dumping structure for table explicaapp.pessoa
CREATE TABLE IF NOT EXISTS `pessoa` (
  `idPessoa` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NIF` varchar(10) NOT NULL,
  `Nome` varchar(45) NOT NULL,
  `Sobrenome` varchar(45) NOT NULL,
  `UserType` varchar(45) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`idPessoa`),
  UNIQUE KEY `idPessoa_UNIQUE` (`idPessoa`),
  UNIQUE KEY `NIF_UNIQUE` (`NIF`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.pessoa: ~9 rows (approximately)
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` (`idPessoa`, `NIF`, `Nome`, `Sobrenome`, `UserType`, `Email`, `Password`) VALUES
	(1, '123456789', 'Admin', 'Admin', 'Admin', 'admin@mail.com', '$2b$10$Q6WYgCt61AdzaW.al98MjOCQoDH58dc4Hm6c0KmDRkn0roI5qhaoW'),
	(2, '987654321', 'RH', 'RH', 'RH', 'rh@mail.com', '$2b$10$4CYgRrKAddGDfLryL4g4f.70Nnwt4ZqYXzgM7BFAbgV6U7fCkZk8q'),
	(3, '876543210', 'CFO', 'CFO', 'CFO', 'cfo@mail.com', '$2b$10$/EeEINCo27cBEz3zXM8nlefG7Wk/GCr1C3H7CkRa0hQ6a91vVNxYi'),
	(16, '264794036', 'Pedro', 'Sousa', 'Encarregado', 'henriquesantos293@gmail.com', '$2b$10$KUHsCnAEZffkHf4Bs9O2heflmTTF6F9VAen4Ee0xpsivpCQBo8roO'),
	(17, '234615436', 'Carlos', 'Constantino', 'Explicando', 'carlosconstantino@mail.com', '$2b$10$BF41Rf6t4knvqNBjUXw5OehBXhrIGpDFynT.tid89VOJB74Mb8YTe'),
	(19, '122213232', 'Filipe', 'Magno', 'Explicador', 'filipe@mail.com', '$2b$10$ugKPR6fqMrRaE8SvvcarMeQbGuCCsC8M8q6C2VBRA2fj3kL.TdEkC'),
	(21, '343824834', 'Nelson', 'Graça', 'Encarregado', 'nelson@mail.com', '$2b$10$KfL9DIK4E6CGFwyVmOosBe8vzV5woMathQyhCM8QhGh/47NpDmn9G'),
	(22, '372847328', 'Cristiano', 'Reinaldo', 'Explicando', 'reinaldo@mail.com', '$2b$10$A43RZ7qbo3BN27tk62mPKeweKx50S0VmhgmrQpd1mm4ImtPu.x5Vm'),
	(24, '347324832', 'Mary', 'Barreto', 'Explicador', 'mary@mail.com', '$2b$10$9Cw5qfF7ctvg9eRvPdkN9OU8/vbfuq0zk/GGTh2/OwbWZ59Px8KMG');
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;

-- Dumping structure for table explicaapp.precario
CREATE TABLE IF NOT EXISTS `precario` (
  `Aula` float unsigned NOT NULL,
  `Mensal` float unsigned NOT NULL,
  `Anual` float unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.precario: ~0 rows (approximately)
/*!40000 ALTER TABLE `precario` DISABLE KEYS */;
INSERT INTO `precario` (`Aula`, `Mensal`, `Anual`) VALUES
	(7, 50, 600);
/*!40000 ALTER TABLE `precario` ENABLE KEYS */;

-- Dumping structure for table explicaapp.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `idTokens` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Token` varchar(100) NOT NULL,
  PRIMARY KEY (`idTokens`),
  UNIQUE KEY `idTokens_UNIQUE` (`idTokens`),
  UNIQUE KEY `Token_UNIQUE` (`Token`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table explicaapp.tokens: ~7 rows (approximately)
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` (`idTokens`, `Token`) VALUES
	(4, '6mevgxfe8omit6oljj41gi'),
	(5, '7jluv12kzehfjugwpfpx1'),
	(7, '7qog62y72fk2l3g4gvhhk5'),
	(1, 'bwc57xmlr5hpj2v6glv6dh'),
	(3, 'dgt9akojwh4pv2arewzte8'),
	(2, 'f883hoiv8hn381hzk7vtk5'),
	(6, 'j87kls5uarhynl8zqstoqq');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
