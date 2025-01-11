CREATE DATABASE gimnasiodb;
USE gimnasiodb;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `afiches`
--

DROP TABLE IF EXISTS `afiches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `afiches` (
  `Id_Imagen` int NOT NULL AUTO_INCREMENT,
  `Url_afiche` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_Imagen`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `afiches`
--

LOCK TABLES `afiches` WRITE;
/*!40000 ALTER TABLE `afiches` DISABLE KEYS */;
INSERT INTO `afiches` VALUES (1,'https://static.wixstatic.com/media/273524_61caf2140bfd47bb84df9b206f05514c~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/273524_61caf2140bfd47bb84df9b206f05514c~mv2.jpg'),(2,'https://urbanfit.jp/wp-content/uploads/2019/05/7-1-1024x768.jpg');
/*!40000 ALTER TABLE `afiches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `ID_clase` int NOT NULL AUTO_INCREMENT,
  `ID_horario` int NOT NULL,
  `ID_instructor` int NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Url_foto` varchar(255) DEFAULT NULL,
  `Descripcion` text,
  `Estado_clase` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_clase`),
  KEY `ID_horario` (`ID_horario`),
  KEY `ID_instructor` (`ID_instructor`),
  CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`ID_horario`) REFERENCES `horarios` (`ID_horario`) ON DELETE CASCADE,
  CONSTRAINT `clases_ibfk_2` FOREIGN KEY (`ID_instructor`) REFERENCES `instructores` (`ID_instructor`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,1,1,'Clase Fullbody','https://mensandbeauty.com/wp-content/uploads/2019/02/mejores-clases-ejercicio-colectivas-en-grupo-gimnasio-step-1.jpg','Todo tipo de ejercicios',1);
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `ID_cliente` int NOT NULL AUTO_INCREMENT,
  `ID_genero` int NOT NULL,
  `ID_usuario` int NOT NULL,
  `Nombre_cliente` varchar(100) NOT NULL,
  `Apellidos_cliente` varchar(100) NOT NULL,
  `Numero_celular` varchar(15) DEFAULT NULL,
  `Dni` varchar(20) NOT NULL,
  `Correo_electronico` varchar(100) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`ID_cliente`),
  UNIQUE KEY `Dni` (`Dni`),
  UNIQUE KEY `Correo_electronico` (`Correo_electronico`),
  KEY `ID_genero` (`ID_genero`),
  KEY `ID_usuario` (`ID_usuario`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`ID_genero`) REFERENCES `generos` (`ID_genero`) ON DELETE CASCADE,
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`ID_usuario`) REFERENCES `usuarios` (`ID_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,1,1,'Pedro','Martinez','954872658','56412003','pedro@gmail.com','2002-05-13');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `ID_departamento` int NOT NULL AUTO_INCREMENT,
  `Nombre_departamento` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Lima');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distritos`
--

DROP TABLE IF EXISTS `distritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distritos` (
  `Id_distrito` int NOT NULL AUTO_INCREMENT,
  `Nombre_distrito` varchar(50) NOT NULL,
  `Id_provincia` int NOT NULL,
  PRIMARY KEY (`Id_distrito`),
  KEY `Id_provincia` (`Id_provincia`),
  CONSTRAINT `distritos_ibfk_1` FOREIGN KEY (`Id_provincia`) REFERENCES `provincias` (`ID_provincia`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distritos`
--

LOCK TABLES `distritos` WRITE;
/*!40000 ALTER TABLE `distritos` DISABLE KEYS */;
INSERT INTO `distritos` VALUES (1,'Lima',1);
/*!40000 ALTER TABLE `distritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `ID_empleado` int NOT NULL AUTO_INCREMENT,
  `ID_usuario` int NOT NULL,
  `Nombre_empleado` varchar(100) NOT NULL,
  `Apellidos_empleado` varchar(100) NOT NULL,
  `Numero_celular` varchar(15) NOT NULL,
  `Dni` varchar(20) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`ID_empleado`),
  KEY `ID_usuario` (`ID_usuario`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`ID_usuario`) REFERENCES `usuarios` (`ID_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,2,'Juan','Ramirez','987654321','45786215','1999-10-10');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturaciones`
--

DROP TABLE IF EXISTS `facturaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturaciones` (
  `ID_factura` int NOT NULL AUTO_INCREMENT,
  `ID_metodo` int NOT NULL,
  `ID_memb` int NOT NULL,
  `Hora_pago` time NOT NULL,
  `Fecha_pago` date NOT NULL,
  `Igv` decimal(5,2) NOT NULL,
  `Monto_total` decimal(10,2) NOT NULL,
  `Estado_factura` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_factura`),
  KEY `ID_metodo` (`ID_metodo`),
  KEY `ID_memb` (`ID_memb`),
  CONSTRAINT `facturaciones_ibfk_1` FOREIGN KEY (`ID_metodo`) REFERENCES `metodos_pago` (`ID_metodo`) ON DELETE CASCADE,
  CONSTRAINT `facturaciones_ibfk_2` FOREIGN KEY (`ID_memb`) REFERENCES `membresias` (`ID_memb`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturaciones`
--

LOCK TABLES `facturaciones` WRITE;
/*!40000 ALTER TABLE `facturaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `ID_genero` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Masculino'),(2,'Femenino');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `ID_horario` int NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  `Duracion` int NOT NULL,
  `Hora_inicio` time NOT NULL,
  PRIMARY KEY (`ID_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,'2024-05-06',2,'03:00:00');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructores`
--

DROP TABLE IF EXISTS `instructores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructores` (
  `ID_instructor` int NOT NULL AUTO_INCREMENT,
  `ID_sede` int NOT NULL,
  `Nombre_instructor` varchar(100) NOT NULL,
  `Apellidos_instructor` varchar(100) NOT NULL,
  `Especialidad` varchar(100) DEFAULT NULL,
  `Trayectoria` text,
  `Url_foto` varchar(255) DEFAULT NULL,
  `Estado_instructor` tinyint(1) NOT NULL DEFAULT '1',
  `Fecha_registro` date NOT NULL,
  PRIMARY KEY (`ID_instructor`),
  KEY `ID_sede` (`ID_sede`),
  CONSTRAINT `instructores_ibfk_1` FOREIGN KEY (`ID_sede`) REFERENCES `sedes` (`ID_sede`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructores`
--

LOCK TABLES `instructores` WRITE;
/*!40000 ALTER TABLE `instructores` DISABLE KEYS */;
INSERT INTO `instructores` VALUES (1,1,'Luis','Rodriguez','FullBody','2 años ','https://static.vecteezy.com/system/resources/previews/000/478/021/original/gym-cartoon-illustration-vector.jpg',1,'2023-12-01');
/*!40000 ALTER TABLE `instructores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membresias`
--

DROP TABLE IF EXISTS `membresias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membresias` (
  `ID_memb` int NOT NULL AUTO_INCREMENT,
  `ID_cliente` int NOT NULL,
  `ID_tip_memb` int NOT NULL,
  `ID_sede` int NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date NOT NULL,
  `Estado_membresia` tinyint(1) NOT NULL DEFAULT '1',
  `Renovacion_automatica` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_memb`),
  KEY `ID_cliente` (`ID_cliente`),
  KEY `ID_tip_memb` (`ID_tip_memb`),
  KEY `ID_sede` (`ID_sede`),
  CONSTRAINT `membresias_ibfk_1` FOREIGN KEY (`ID_cliente`) REFERENCES `clientes` (`ID_cliente`) ON DELETE CASCADE,
  CONSTRAINT `membresias_ibfk_2` FOREIGN KEY (`ID_tip_memb`) REFERENCES `tipo_membresias` (`ID_tip_memb`) ON DELETE CASCADE,
  CONSTRAINT `membresias_ibfk_3` FOREIGN KEY (`ID_sede`) REFERENCES `sedes` (`ID_sede`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membresias`
--

LOCK TABLES `membresias` WRITE;
/*!40000 ALTER TABLE `membresias` DISABLE KEYS */;
INSERT INTO `membresias` VALUES (1,1,1,1,'2024-12-12','2025-02-02',1,1);
/*!40000 ALTER TABLE `membresias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodos_pago`
--

DROP TABLE IF EXISTS `metodos_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodos_pago` (
  `ID_metodo` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_metodo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodos_pago`
--

LOCK TABLES `metodos_pago` WRITE;
/*!40000 ALTER TABLE `metodos_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincias`
--

DROP TABLE IF EXISTS `provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincias` (
  `ID_provincia` int NOT NULL AUTO_INCREMENT,
  `ID_departamento` int NOT NULL,
  `Nombre_provincia` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_provincia`),
  KEY `ID_departamento` (`ID_departamento`),
  CONSTRAINT `provincias_ibfk_1` FOREIGN KEY (`ID_departamento`) REFERENCES `departamentos` (`ID_departamento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincias`
--

LOCK TABLES `provincias` WRITE;
/*!40000 ALTER TABLE `provincias` DISABLE KEYS */;
INSERT INTO `provincias` VALUES (1,1,'Lima');
/*!40000 ALTER TABLE `provincias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `ID_rol` int NOT NULL AUTO_INCREMENT,
  `Nombre_rol` varchar(50) NOT NULL,
  `Estado_rol` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'cliente',1),(2,'admin',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `ID_sede` int NOT NULL AUTO_INCREMENT,
  `ID_distrito` int NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Url_foto` varchar(255) DEFAULT NULL,
  `Estado_sede` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_sede`),
  KEY `ID_distrito` (`ID_distrito`),
  CONSTRAINT `sedes_ibfk_1` FOREIGN KEY (`ID_distrito`) REFERENCES `distritos` (`Id_distrito`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES (1,1,'SEDE CHOSICA','Echenique - C.C. María Goretti ','https://www.astrolabio.com.mx/wp-content/uploads/2020/06/Gimnasio-640x320.jpg',0),(2,1,'SEDE COBIAN','Alfonso Cobian - MZ. H LT.18','https://dailyhotels.id/wp-content/uploads/2021/01/gym-Swiss-Belhotel-Pondok-Indah-1.jpeg',1);
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_membresias`
--

DROP TABLE IF EXISTS `tipo_membresias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_membresias` (
  `ID_tip_memb` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text,
  `Precio` decimal(10,2) NOT NULL,
  `Estado_tip_memb` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_tip_memb`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_membresias`
--

LOCK TABLES `tipo_membresias` WRITE;
/*!40000 ALTER TABLE `tipo_membresias` DISABLE KEYS */;
INSERT INTO `tipo_membresias` VALUES (1,'1 mes','1 mes con acceso a todo',100.00,1),(5,'2 meses','2 meses con acceso a todo',150.00,1);
/*!40000 ALTER TABLE `tipo_membresias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID_usuario` int NOT NULL AUTO_INCREMENT,
  `ID_Rol` int NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Estado_usuario` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_usuario`),
  UNIQUE KEY `Username` (`Username`),
  KEY `ID_Rol` (`ID_Rol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `roles` (`ID_rol`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'user','user',1),(2,2,'admin','admin',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-10 22:06:09
