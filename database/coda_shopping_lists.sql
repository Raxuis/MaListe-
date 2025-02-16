-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 16, 2025 at 01:53 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

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
(27, 'dsd', 0, '2025-02-16 10:05:08'),
(28, 'Test', 0, '2025-02-16 10:09:02'),
(29, 'sdds', 0, '2025-02-16 10:10:29'),
(30, 'item1', 0, '2025-02-16 12:32:09'),
(31, 'item1', 0, '2025-02-16 12:44:11'),
(32, 'item1', 0, '2025-02-16 12:45:05'),
(33, 'item1', 0, '2025-02-16 12:48:24'),
(34, 'item1', 0, '2025-02-16 12:53:39'),
(35, 'item1', 0, '2025-02-16 12:53:43'),
(36, 'item1', 0, '2025-02-16 12:53:47'),
(37, 'Test 3', 0, '2025-02-16 12:54:15'),
(38, 'Test 4', 1, '2025-02-16 12:54:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shopping_item`
--
ALTER TABLE `shopping_item`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shopping_item`
--
ALTER TABLE `shopping_item`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
