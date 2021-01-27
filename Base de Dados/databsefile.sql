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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.disciplinas
CREATE TABLE IF NOT EXISTS `disciplinas` (
  `idDisciplinas` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Ano` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idDisciplinas`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.disponibilidade
CREATE TABLE IF NOT EXISTS `disponibilidade` (
  `idDisponibilidade` int(11) NOT NULL AUTO_INCREMENT,
  `Explicador_Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `Dates` datetime DEFAULT NULL,
  PRIMARY KEY (`idDisponibilidade`),
  KEY `fk_Disponibilidade_Explicador1_idx` (`Explicador_Pessoa_idPessoa`),
  CONSTRAINT `fk_Disponibilidade_Explicador1` FOREIGN KEY (`Explicador_Pessoa_idPessoa`) REFERENCES `explicador` (`Pessoa_idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.encarregado
CREATE TABLE IF NOT EXISTS `encarregado` (
  `Pessoa_idPessoa` int(10) unsigned NOT NULL,
  `MetodoPagamento` varchar(45) NOT NULL,
  PRIMARY KEY (`Pessoa_idPessoa`),
  KEY `fk_Encarregado_Pessoa1_idx` (`Pessoa_idPessoa`),
  CONSTRAINT `fk_Encarregado_Pessoa1` FOREIGN KEY (`Pessoa_idPessoa`) REFERENCES `pessoa` (`idPessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.link
CREATE TABLE IF NOT EXISTS `link` (
  `idLink` int(11) NOT NULL AUTO_INCREMENT,
  `Disciplinas_idDisciplinas` int(11) NOT NULL,
  `Link` longtext DEFAULT NULL,
  PRIMARY KEY (`idLink`),
  KEY `fk_Link_Disciplinas1_idx` (`Disciplinas_idDisciplinas`),
  CONSTRAINT `fk_Link_Disciplinas1` FOREIGN KEY (`Disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`idDisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.precario
CREATE TABLE IF NOT EXISTS `precario` (
  `Aula` float unsigned NOT NULL,
  `Mensal` float unsigned NOT NULL,
  `Anual` float unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table explicaapp.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `idTokens` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Token` varchar(100) NOT NULL,
  PRIMARY KEY (`idTokens`),
  UNIQUE KEY `idTokens_UNIQUE` (`idTokens`),
  UNIQUE KEY `Token_UNIQUE` (`Token`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
