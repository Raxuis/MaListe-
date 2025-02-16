-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 16, 2025 at 02:36 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coda_shopping_lists`
--

-- --------------------------------------------------------

--
-- Table structure for table `shopping_item`
--

CREATE TABLE `shopping_item` (
  `id` int(10) NOT NULL,
  `name` varchar(500) NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shopping_item`
--

INSERT INTO `shopping_item` (`id`, `name`, `is_completed`, `created_at`) VALUES
(1, 'item1', 0, '2025-02-14 12:26:32'),
(25, 'item2', 0, '2025-02-16 09:57:15'),
(37, 'item3', 1, '2025-02-16 12:54:15'),
(38, 'item4', 0, '2025-02-16 12:54:15');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list`
--

CREATE TABLE `shopping_list` (
  `id` int(10) NOT NULL,
  `name` varchar(500) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shopping_list`
--

INSERT INTO `shopping_list` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Number 1', 'Description 1', '2025-02-14 12:26:19'),
(19, 'Number 2', 'Description 2', '2025-02-14 15:31:19'),
(20, 'Number 3', 'number 3', '2025-02-16 12:54:15');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list_shopping_item`
--

CREATE TABLE `shopping_list_shopping_item` (
  `id` int(10) UNSIGNED NOT NULL,
  `shopping_list_id` int(11) NOT NULL,
  `shopping_item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shopping_list_shopping_item`
--

INSERT INTO `shopping_list_shopping_item` (`id`, `shopping_list_id`, `shopping_item_id`) VALUES
(23, 19, 25),
(31, 20, 37),
(32, 20, 38);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shopping_item`
--
ALTER TABLE `shopping_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_list`
--
ALTER TABLE `shopping_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_list_shopping_item`
--
ALTER TABLE `shopping_list_shopping_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shopping_list` (`shopping_list_id`),
  ADD KEY `fk_shopping_item` (`shopping_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shopping_item`
--
ALTER TABLE `shopping_item`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `shopping_list`
--
ALTER TABLE `shopping_list`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `shopping_list_shopping_item`
--
ALTER TABLE `shopping_list_shopping_item`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shopping_list_shopping_item`
--
ALTER TABLE `shopping_list_shopping_item`
  ADD CONSTRAINT `fk_shopping_item` FOREIGN KEY (`shopping_item_id`) REFERENCES `shopping_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_shopping_list` FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
