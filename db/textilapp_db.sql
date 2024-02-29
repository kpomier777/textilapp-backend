-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2023 a las 22:14:40
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `textilapp_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(2, 'area1', 'es una area testing', '2023-10-09 16:10:47', '2023-10-10 16:11:51'),
(3, 'area2', 'area2 description', '2023-10-16 20:51:53', '2023-10-16 20:51:53'),
(4, 'area3', 'area3 description', '2023-10-16 20:52:00', '2023-10-16 20:52:00'),
(5, 'area4', 'area4 description', '2023-10-16 20:52:05', '2023-10-16 20:52:05'),
(6, 'area5', 'area5 description', '2023-10-16 20:52:10', '2023-10-16 20:52:10'),
(7, 'area6', 'area6 description', '2023-10-16 20:52:17', '2023-10-16 20:52:17'),
(8, 'area7', 'area7 description', '2023-10-16 20:52:22', '2023-10-16 20:52:22'),
(9, 'area8', 'area8 description', '2023-10-16 20:52:27', '2023-10-16 20:52:27'),
(10, 'area9', 'area9 description', '2023-10-16 20:52:31', '2023-10-16 20:52:31'),
(11, 'area10', 'area10 description', '2023-10-16 20:52:36', '2023-10-16 20:52:36'),
(12, 'area11', 'area11 description', '2023-10-16 20:52:42', '2023-10-16 20:52:42'),
(13, 'area12', 'area12 description', '2023-10-16 20:52:47', '2023-10-16 20:52:47'),
(14, 'area13', 'area13 description', '2023-10-16 20:52:51', '2023-10-16 20:52:51'),
(15, 'area14', 'area14 description', '2023-10-16 20:52:56', '2023-10-16 20:52:56'),
(16, 'area15', 'area15 description', '2023-10-16 20:52:59', '2023-10-16 20:52:59'),
(17, 'area16', 'area16 description', '2023-10-16 20:53:04', '2023-10-16 20:53:04'),
(18, 'area17', 'area17 description', '2023-10-16 20:53:09', '2023-10-16 20:53:09'),
(19, 'area18', 'area18 description', '2023-10-16 20:53:13', '2023-10-16 20:53:13'),
(20, 'area19', 'area19 description', '2023-10-16 20:53:19', '2023-10-16 20:53:19'),
(21, 'area20', 'area20 description', '2023-10-16 20:53:25', '2023-10-16 20:53:25'),
(22, 'area21', 'area21 description', '2023-10-16 20:53:33', '2023-10-16 20:53:33'),
(23, 'area22', 'area22 description', '2023-10-16 20:53:37', '2023-10-16 20:53:37'),
(24, 'area23', 'area23 description', '2023-10-16 20:53:40', '2023-10-16 20:53:40'),
(25, 'area24', 'area24 description', '2023-10-16 20:53:45', '2023-10-16 20:53:45'),
(26, 'area25', 'area25 description', '2023-10-16 20:53:49', '2023-10-16 20:53:49'),
(27, 'area26', 'area26 description', '2023-10-16 20:53:53', '2023-10-16 20:53:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `cod_client` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id`, `cod_client`, `first_name`, `last_name`, `enabled`, `created_at`, `updated_at`) VALUES
(4, 'CL-1001', 'Ana María', 'González López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(5, 'CL-1002', 'Carlos', 'Sánchez Rodríguez', 0, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(6, 'CL-1003', 'Laura', 'Martínez Fernández', 0, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(7, 'CL-1004', 'Juan', 'Ramírez Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(8, 'CL-1005', 'Maria', 'López García', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(9, 'CL-1006', 'Diego', 'Hernández González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(10, 'CL-1007', 'Sofía', 'Díaz Rodríguez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(11, 'CL-1008', 'Luis', 'Torres Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(12, 'CL-1009', 'Isabel', 'Gómez Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(13, 'CL-1010', 'Pablo', 'Fernández Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(14, 'CL-1011', 'Andrea', 'Martín López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(15, 'CL-1012', 'Ricardo', 'Pérez González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(16, 'CL-1013', 'Carolina', 'Soto Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(17, 'CL-1014', 'Manuel', 'Rojas Díaz', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(18, 'CL-1015', 'Elena', 'Vargas González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(19, 'CL-1016', 'Miguel', 'Jiménez López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(20, 'CL-1017', 'Paula', 'Cruz Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(21, 'CL-1018', 'Javier', 'Ortega Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(22, 'CL-1019', 'Valentina', 'Serrano Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(23, 'CL-1020', 'Andrés', 'Molina Fernández', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(24, 'CL-1021', 'Carmen', 'Pérez Rodríguez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(25, 'CL-1022', 'Antonio', 'Herrera López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(26, 'CL-1023', 'María José', 'Sánchez Díaz', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(27, 'CL-1024', 'Arturo', 'González Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(28, 'CL-1025', 'Isabella', 'López Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(29, 'CL-1026', 'Gabriel', 'Torres Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(30, 'CL-1027', 'Ana Laura', 'Gómez Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(31, 'CL-1028', 'Rodrigo', 'Fernández Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(32, 'CL-1029', 'Silvia', 'Martínez López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(33, 'CL-1030', 'José Luis', 'Pérez González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(34, 'CL-1031', 'Valeria', 'Soto Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(35, 'CL-1032', 'Santiago', 'Rojas Díaz', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(36, 'CL-1033', 'Adriana', 'Vargas González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(37, 'CL-1034', 'Carlos Andrés', 'Jiménez López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(38, 'CL-1035', 'Natalia', 'Cruz Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(39, 'CL-1036', 'Fernando', 'Ortega Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(40, 'CL-1037', 'María Fernanda', 'Serrano Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(41, 'CL-1038', 'Enrique', 'Molina Fernández', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(42, 'CL-1039', 'Paola', 'Pérez Rodríguez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(43, 'CL-1040', 'Roberto', 'Herrera López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(44, 'CL-1041', 'Valerie', 'Sánchez Díaz', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(45, 'CL-1042', 'Francisco', 'González Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(46, 'CL-1043', 'Daniela', 'López Pérez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(47, 'CL-1044', 'Emilio', 'Torres Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(48, 'CL-1045', 'Regina', 'Gómez Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(49, 'CL-1046', 'Héctor', 'Fernández Sánchez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(50, 'CL-1047', 'Marisol', 'Martínez López', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(51, 'CL-1048', 'Alejandro', 'Pérez González', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(52, 'CL-1049', 'Rosa', 'Soto Martínez', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17'),
(53, 'CL-1050', 'Gustavo', 'Rojas Díaz', 1, '2023-10-26 11:39:17', '2023-10-26 11:39:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `cod_color` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id`, `cod_color`, `name`, `description`, `created_at`, `updated_at`) VALUES
(4, 'C-1000', 'Color Rojo', 'un color vibrante que simboliza pasión y amor.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(5, 'C-1112', 'Color Azul', 'un tono refrescante que evoca el cielo y el mar.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(6, 'C-1113', 'Color Verde', 'un color natural asociado con la vegetación y la tranquilidad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(7, 'C-1114', 'Color Amarillo', 'un tono brillante que representa la alegría y la energía.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(8, 'C-1115', 'Color Naranja', 'un color cálido que sugiere entusiasmo y vitalidad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(9, 'C-1116', 'Color Morado', 'un tono regio que simboliza la creatividad y la realeza.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(10, 'C-1117', 'Color Rosa', 'un color delicado que evoca la feminidad y la ternura.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(11, 'C-1118', 'Color Gris', 'un tono neutro que denota sobriedad y elegancia.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(12, 'C-1119', 'Color Marrón', 'un color terroso que recuerda a la tierra y la estabilidad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(13, 'C-1120', 'Color Blanco', 'un color puro y limpio asociado con la pureza.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(14, 'C-1121', 'Color Negro', 'un tono clásico que representa la elegancia y la autoridad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(15, 'C-1122', 'Color Turquesa', 'un color fresco inspirado en el color del agua en destinos tropicales.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(16, 'C-1123', 'Color Dorado', 'un tono lujoso que simboliza riqueza y éxito.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(17, 'C-1124', 'Color Plateado', 'un color metálico que denota modernidad y sofisticación.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(18, 'C-1125', 'Color Lavanda', 'un tono suave que evoca la relajación y la serenidad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(19, 'C-1126', 'Color Azul Marino', 'un tono profundo asociado con la marina y la elegancia.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(20, 'C-1127', 'Color Verde Esmeralda', 'un color vibrante que representa la vida y la juventud.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(21, 'C-1128', 'Color Amarillo Mostaza', 'un tono cálido y nostálgico.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(22, 'C-1129', 'Color Celeste', 'un color suave que recuerda al cielo despejado.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(23, 'C-1130', 'Color Beige', 'un color neutro que sugiere simplicidad y versatilidad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(24, 'C-1131', 'Color Terracota', 'un tono cálido inspirado en la arcilla.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(25, 'C-1132', 'Color Azul Cielo', 'un tono suave que evoca un cielo despejado en un día soleado.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(26, 'C-1133', 'Color Verde Oliva', 'un color terroso inspirado en aceitunas maduras.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(27, 'C-1134', 'Color Rosa Claro', 'un color delicado que refleja inocencia y dulzura.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(28, 'C-1135', 'Color Gris Plata', 'un tono metálico que sugiere elegancia moderna.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(29, 'C-1136', 'Color Coral', 'un tono cálido y brillante que simboliza la vida submarina.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(30, 'C-1137', 'Color Borgoña', 'un color profundo y opulento asociado con el vino tinto.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(31, 'C-1138', 'Color Blanco Marfil', 'un tono cálido que evoca la suavidad y el lujo.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(32, 'C-1139', 'Color Azul Zafiro', 'un color precioso que representa la pureza y la sabiduría.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(33, 'C-1140', 'Color Verde Menta', 'un tono fresco y suave como la menta.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(34, 'C-1141', 'Color Amarillo Limón', 'un tono brillante y refrescante como una rodaja de limón.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(35, 'C-1142', 'Color Lavanda Claro', 'un color suave y relajante como un campo de lavanda.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(36, 'C-1143', 'Color Gris Carbón', 'un tono oscuro que sugiere sofisticación y misterio.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(37, 'C-1144', 'Color Verde Bosque', 'un color profundo inspirado en los bosques densos.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(38, 'C-1145', 'Color Rosa Fuerte', 'un color audaz que denota pasión y determinación.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(39, 'C-1146', 'Color Cian', 'un tono brillante que recuerda al color de las aguas cristalinas.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(40, 'C-1147', 'Color Índigo', 'un color profundo y misterioso que representa la noche estrellada.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(41, 'C-1148', 'Color Marfil', 'un tono cálido y suave como el marfil natural.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(42, 'C-1149', 'Color Azul Cobalto', 'un tono intenso y vibrante como el mineral de cobalto.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(43, 'C-1150', 'Color Amarillo Oro', 'un tono lujoso y rico como el metal precioso.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(44, 'C-1151', 'Color Lila', 'un color suave y romántico asociado con la nostalgia.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(45, 'C-1152', 'Color Taupe', 'un tono neutro y versátil que se asemeja al color del suelo.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(46, 'C-1153', 'Color Rosa Coral', 'un color cálido y tropical que evoca arrecifes de coral.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(47, 'C-1154', 'Color Azul Acero', 'un tono fresco y moderno como el acero inoxidable.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(48, 'C-1155', 'Color Verde Lima', 'un tono brillante y cítrico que sugiere frescura.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(49, 'C-1156', 'Color Azul Cian', 'un tono brillante y relajante como el cielo en un día despejado.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(50, 'C-1157', 'Color Rojo Rubí', 'un color precioso y apasionado como la gema de rubí.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(51, 'C-1158', 'Color Violeta Oscuro', 'un tono profundo y misterioso como la noche.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(52, 'C-1159', 'Color Verde Jade', 'un color exótico y vibrante inspirado en la piedra preciosa.', '2023-10-26 11:08:07', '2023-10-26 11:08:07'),
(53, 'C-1160', 'Color Azul Real', 'un tono majestuoso y regio que sugiere poder y autoridad.', '2023-10-26 11:08:07', '2023-10-26 11:08:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `title`
--

CREATE TABLE `title` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `title`
--

INSERT INTO `title` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(4, 'Tela de Algodón Orgánico', 'perfecta para camisetas cómodas.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(5, 'Cuero Genuino', 'duradero y elegante para confección de carteras.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(6, 'Satén Brillante', 'ideal para ropa de noche y lencería.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(7, 'Terciopelo de Lujo', 'para cojines y cortinas elegantes.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(8, 'Tejido de Lino', 'fresco y transpirable para ropa de verano.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(9, 'Tela de Denim Resistente', 'ideal para jeans y chaquetas.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(10, 'Seda Natural', 'suave y lujosa para vestidos de gala.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(11, 'Franela Cálida', 'perfecta para pijamas y ropa de cama.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(12, 'Tejido de Punto Suave', 'ideal para suéteres y bufandas.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(13, 'Tela de Encaje', 'elegante para ropa de fiesta y novias.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(14, 'Tela de Lana Merino', 'abrigada para abrigos de invierno.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(15, 'Alpaca Suave y Acogedora', 'para suéteres de alta calidad.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(16, 'Cuero Sintético Duradero', 'para mochilas resistentes.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(17, 'Tela de Terciopelo Cotelé', 'para sofisticados trajes.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(18, 'Tela de Jersey Elástico', 'perfecta para ropa deportiva.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(19, 'Organza Transparente', 'ideal para decoración de eventos.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(20, 'Tela de Tul Ligera', 'para vestidos de novia y disfraces.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(21, 'Tejido de Mezclilla', 'clásico para pantalones vaqueros.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(22, 'Lino Lavado', 'fresco y relajado para ropa de playa.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(23, 'Tela de Sarga Resistente', 'para uniformes y ropa de trabajo.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(24, 'Tela de Raso', 'perfecta para cortinas y decoración del hogar.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(25, 'Tela de Tafetán Brillante', 'ideal para vestidos de cóctel.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(26, 'Tela de Pana Suave', 'para sofás y cojines acogedores.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(27, 'Tela de Terciopelo de Algodón', 'para tapicería elegante.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(28, 'Tela de Fieltro', 'perfecta para manualidades y proyectos creativos.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(29, 'Tela de Tela Vaquera', 'resistente para aventuras al aire libre.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(30, 'Tela de Sarga de Algodón', 'ideal para ropa casual.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(31, 'Tela de Seda Cruda', 'textura natural para prendas únicas.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(32, 'Mezcla de Algodón y Poliéster', 'duradera y fácil de cuidar.', '2023-10-26 11:31:53', '2023-10-26 11:31:53'),
(33, 'Tela de Yute Ecológica', 'ideal para bolsos sostenibles.', '2023-10-26 11:31:53', '2023-10-26 11:31:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(16, 'admin', '$2b$10$oHwXq1JDxFjuPnwp/c2L5uQRUOF/UuPrpvPh1EyS11KkQ/tF67McC', '2023-09-25 16:50:44', '2023-09-25 16:50:44'),
(17, 'admin2', '$2b$10$eFvvA5YMZEclcD0o25k.U.KEllr37S0BC8n8mGWda2Svo/5F4CRsS', '2023-10-09 16:00:01', '2023-10-09 16:00:01'),
(18, 'admin3', '$2b$10$2zerm5j9xgkn7Fs3/bEBfuYCZf5.xIul.kwRxptQWvXoi8MQcotuW', '2023-10-09 16:02:05', '2023-10-09 16:02:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `title`
--
ALTER TABLE `title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
