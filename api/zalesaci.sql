-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 11. led 2020, 19:44
-- Verze serveru: 10.1.38-MariaDB
-- Verze PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `zalesaci`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `attendance`
--

CREATE TABLE `attendance` (
  `member_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `attendance`
--

INSERT INTO `attendance` (`member_id`, `date`) VALUES
(2, '2018-08-01 22:00:00'),
(2, '2018-08-01 22:00:00'),
(2, '2018-08-01 22:00:00'),
(2, '2018-08-01 22:00:00'),
(3, '2020-01-09 23:00:00'),
(4, '2019-11-11 23:00:00'),
(1, '2019-11-11 23:00:00'),
(3, '2019-11-11 23:00:00'),
(1, '2019-11-10 23:00:00'),
(3, '2019-11-17 23:00:00'),
(1, '2019-11-24 23:00:00'),
(4, '2019-12-01 23:00:00'),
(4, '2020-01-09 23:00:00'),
(4, '2020-01-05 23:00:00'),
(3, '2020-01-05 23:00:00'),
(1, '2020-01-05 23:00:00'),
(4, '2020-01-05 23:00:00'),
(3, '2020-01-05 23:00:00'),
(1, '2020-01-05 23:00:00');

-- --------------------------------------------------------

--
-- Struktura tabulky `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `name` varchar(30) COLLATE utf8_czech_ci NOT NULL,
  `surname` varchar(40) COLLATE utf8_czech_ci NOT NULL,
  `rc` varchar(11) COLLATE utf8_czech_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_czech_ci NOT NULL,
  `contact` varchar(50) COLLATE utf8_czech_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `member`
--

INSERT INTO `member` (`id`, `active`, `name`, `surname`, `rc`, `address`, `contact`) VALUES
(1, 1, 'Jiri', 'Galis', '9003024602', 'Podoli 140, Podoli 664 03', 'JiriGalis@seznam.cz'),
(2, 1, 'Franta', 'Mlaticka', '8805041234', 'Svycarsko 32', 'mlaticka@franta.cz'),
(3, 1, 'Josef', 'Mlaticka', '12356780', 'Kdesi v lese', 'Nema, vola jenom z okna'),
(4, 1, 'Tonda', 'Mlaticka', '12356780', 'Kdesi v lese', '12312312333');

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `username` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `password` mediumtext COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_czech_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES
(1, 'admin', 'admin', 'admin@example.com');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pro tabulku `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
