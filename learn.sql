-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2025 at 07:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learn`
--

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `isActive` varchar(255) NOT NULL,
  `societyId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`id`, `name`, `description`, `isActive`, `societyId`, `createdAt`, `updatedAt`) VALUES
(1, 'Gym', '24/7 fitness center with modern equipment', 'true', '1', '2025-07-03 07:27:40', '2025-07-03 07:27:40'),
(2, 'gym', '24/7 fitness center with modern equipment', 'true', '1', '2025-07-03 07:35:18', '2025-07-03 07:35:18'),
(3, 'park', '24/7 fitness center with modern equipment', 'true', '1', '2025-07-03 07:59:34', '2025-07-03 07:59:34'),
(5, 'lift', '24/7 fitness center with modern equipment', 'true', '1', '2025-07-03 12:13:21', '2025-07-03 12:13:21'),
(6, 'Plumbing', 'avc', 'true', '1', '2025-07-10 07:31:46', '2025-07-10 07:31:46'),
(7, 'abc', 'abc', 'true', '1', '2025-07-10 07:32:02', '2025-07-10 07:32:02'),
(8, 'Agarwal', 'hey', 'false', '1', '2025-07-10 07:32:20', '2025-07-10 07:32:20'),
(9, 'abcd', 'abc', 'false', '1', '2025-07-10 08:04:38', '2025-07-10 08:04:38'),
(10, 'xyz', 'xyz', 'false', '1', '2025-07-10 08:04:54', '2025-07-10 08:04:54'),
(11, 'qweqedd', 'azf', 'false', '1', '2025-07-10 08:05:12', '2025-07-10 08:05:12');

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `category` enum('Plumbing','Electricity','Security','Other') NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Open','In Progress','Resolved') NOT NULL DEFAULT 'Open',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `userId`, `category`, `title`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(4, '', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 11:46:52', '2025-06-24 11:46:52'),
(6, '', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 11:56:16', '2025-06-24 11:56:16'),
(7, '', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 11:57:46', '2025-06-24 11:57:46'),
(8, '', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 11:57:53', '2025-06-24 11:57:53'),
(9, '3', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 12:01:46', '2025-06-24 12:01:46'),
(11, '3', '', '', 'There is constant loud music coming from Flat B-203 during late hours.', '', '2025-06-24 12:10:30', '2025-06-24 12:10:30'),
(12, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:12:06', '2025-06-24 12:12:06'),
(13, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:12:54', '2025-06-24 12:12:54'),
(14, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:13:46', '2025-06-24 12:13:46'),
(15, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:23:05', '2025-06-24 12:23:05'),
(16, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:24:20', '2025-06-24 12:24:20'),
(17, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:24:33', '2025-06-24 12:24:33'),
(18, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:31:24', '2025-06-24 12:31:24'),
(19, '3', '', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:32:19', '2025-06-24 12:32:19'),
(20, '3', 'Other', '', 'There is constant loud music coming from Flat B-204', '', '2025-06-24 12:33:25', '2025-06-24 12:33:25'),
(21, '3', 'Other', '', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-24 12:33:59', '2025-06-24 12:33:59'),
(22, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-24 12:37:12', '2025-06-24 12:37:12'),
(23, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:07:20', '2025-06-25 05:07:20'),
(24, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:10:48', '2025-06-25 05:10:48'),
(25, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:10:52', '2025-06-25 05:10:52'),
(26, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:11:00', '2025-06-25 05:11:00'),
(27, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:12:21', '2025-06-25 05:12:21'),
(28, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 05:42:44', '2025-06-25 05:42:44'),
(29, '3', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:06:08', '2025-06-25 08:06:08'),
(30, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:07:06', '2025-06-25 08:07:06'),
(31, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:09:49', '2025-06-25 08:09:49'),
(32, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:11:33', '2025-06-25 08:11:33'),
(33, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:14:16', '2025-06-25 08:14:16'),
(34, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:17:57', '2025-06-25 08:17:57'),
(35, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 08:19:38', '2025-06-25 08:19:38'),
(36, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:00:19', '2025-06-25 09:00:19'),
(37, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:02:32', '2025-06-25 09:02:32'),
(38, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:14:29', '2025-06-25 09:14:29'),
(39, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:22:43', '2025-06-25 09:22:43'),
(40, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:25:07', '2025-06-25 09:25:07'),
(41, '7', 'Other', 'Loud music complaint', 'There is constant loud music coming from Flat B-204', 'Open', '2025-06-25 09:33:24', '2025-06-25 09:33:24'),
(42, '16', 'Plumbing', 'Kitchen sink leak', 'There is a leak in the kitchen sink.', 'Open', '2025-07-01 04:46:01', '2025-07-01 04:46:01'),
(43, '16', 'Plumbing', 'Kitchen sink leak', 'There is a leak in the kitchen sink.', 'Open', '2025-07-01 11:29:55', '2025-07-01 11:29:55'),
(44, '19', 'Plumbing', 'Kitchen sink leak', 'There is a leak in the kitchen sink.', 'Open', '2025-07-01 11:31:41', '2025-07-01 11:31:41'),
(45, '3', 'Plumbing', 'abc', 'abc', 'Open', '2025-07-05 05:54:42', '2025-07-05 05:54:42'),
(46, '3', 'Plumbing', 'xyz', 'xyz', 'Open', '2025-07-05 05:56:07', '2025-07-05 05:56:07'),
(47, '3', 'Plumbing', 'ssd', 'dsdF', 'Open', '2025-07-05 10:33:52', '2025-07-05 10:33:52'),
(48, '3', '', 'abc', 'abc', 'Open', '2025-07-05 11:19:03', '2025-07-05 11:19:03');

-- --------------------------------------------------------

--
-- Table structure for table `flats`
--

CREATE TABLE `flats` (
  `id` int(11) NOT NULL,
  `flatUId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `flatNumber` int(11) NOT NULL,
  `floor` int(11) NOT NULL,
  `block` varchar(255) NOT NULL,
  `flatType` varchar(255) NOT NULL,
  `areapersqfeet` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flats`
--

INSERT INTO `flats` (`id`, `flatUId`, `flatNumber`, `floor`, `block`, `flatType`, `areapersqfeet`, `createdAt`, `updatedAt`) VALUES
(1, 'f1530177-c45d-4a5a-a95f-726bd31b15e5', 207, 2, 'B', '2BHK', '20', '2025-07-03 06:39:40', '2025-07-03 06:39:40'),
(3, '23a59478-e199-4136-9410-d36e239bab30', 297, 2, 'B', '2BHK', '20', '2025-07-05 10:57:15', '2025-07-05 10:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `flatusers`
--

CREATE TABLE `flatusers` (
  `id` int(11) NOT NULL,
  `flatId` varchar(255) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flatusers`
--

INSERT INTO `flatusers` (`id`, `flatId`, `UserId`, `createdAt`, `updatedAt`) VALUES
(1, 'de0bb2ef-dffb-4d6b-93f1-af977ee71c35', '5', '2025-06-26 05:08:43', '2025-06-26 05:08:43'),
(2, 'de0bb2ef-dffb-4d6b-93f1-af977ee71c35', '1', '2025-06-27 05:54:02', '2025-06-27 05:54:02'),
(3, 'de0bb2ef-dffb-4d6b-93f1-af977ee71c35', '2', '2025-06-27 06:06:36', '2025-06-27 06:06:36'),
(4, 'de0bb2ef-dffb-4d6b-93f1-af977ee71c35', '3', '2025-06-27 06:11:35', '2025-06-27 06:11:35'),
(5, '0b4a4aef-b7f2-4716-8d32-4a662b81f985', '3', '2025-06-27 07:33:27', '2025-06-27 07:33:27'),
(6, '009ded9e-09d1-4a7e-a2c7-8fcff4f26019', '1', '2025-07-01 04:45:06', '2025-07-01 04:45:06'),
(7, 'f1530177-c45d-4a5a-a95f-726bd31b15e5', '2', '2025-07-03 06:40:22', '2025-07-03 06:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `ipAddress` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `userId`, `action`, `details`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`) VALUES
(1, 14, 'LOGIN_USER', NULL, '::1', 'PostmanRuntime/7.44.1', '2025-06-28 07:45:30', '2025-06-28 07:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `maintenances`
--

CREATE TABLE `maintenances` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `flatId` varchar(255) DEFAULT NULL,
  `societyId` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `amount` float NOT NULL,
  `dueDate` datetime NOT NULL,
  `status` enum('pending','paid','overdue') DEFAULT 'pending',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenances`
--

INSERT INTO `maintenances` (`id`, `userId`, `flatId`, `societyId`, `description`, `amount`, `dueDate`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 3, '[object SequelizeInstance:FlatUser]', '1', 'Monthly maintenance charges for July', 400, '2025-07-15 00:00:00', 'pending', '2025-07-07 09:28:17', '2025-07-07 09:28:17'),
(6, 3, 'f1530177-c45d-4a5a-a95f-726bd31b15e5', '1', 'Monthly maintenance charges for July', 400, '2025-07-15 00:00:00', 'pending', '2025-07-07 09:50:56', '2025-07-07 09:50:56');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` enum('General','Urgent','Event','Maintenance') NOT NULL,
  `isPinned` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `userId`, `title`, `content`, `category`, `isPinned`, `createdAt`, `updatedAt`) VALUES
(1644770, '123e4567-e89b-12d3-a456-426614174000', 'Water Supply Maintenance', 'Water supply will be interrupted on Sunday from 10 AM to 2 PM.', 'Maintenance', 1, '2025-07-01 04:51:04', '2025-07-01 04:51:04'),
(1644771, '123e4567-e89b-12d3-a456-426614174000', 'Water Supply Maintenance', 'Water supply will be interrupted on Sunday from 10 AM to 2 PM.', 'Maintenance', 1, '2025-07-03 12:19:17', '2025-07-03 12:19:17');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `Otp` int(11) NOT NULL,
  `status` enum('pending','approved') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `Otp`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 820735, 'pending', '2025-07-02 07:02:33', '2025-07-02 07:02:33'),
(2, 0, 'approved', '2025-07-03 12:20:34', '2025-07-03 12:28:22'),
(3, 0, 'pending', '2025-07-03 12:29:28', '2025-07-03 12:29:44'),
(4, 469236, 'pending', '2025-07-03 12:44:13', '2025-07-03 12:44:13'),
(5, 899775, 'pending', '2025-07-03 12:48:54', '2025-07-03 12:48:54'),
(6, 362966, 'pending', '2025-07-03 12:50:33', '2025-07-03 12:50:33'),
(7, 890259, 'pending', '2025-07-03 12:50:54', '2025-07-03 12:50:54'),
(8, 619276, 'pending', '2025-07-04 05:59:30', '2025-07-04 05:59:30'),
(9, 958942, 'pending', '2025-07-05 07:20:32', '2025-07-05 07:20:32'),
(10, 241745, 'pending', '2025-07-09 06:21:24', '2025-07-09 06:21:24'),
(11, 409303, 'pending', '2025-07-09 06:21:37', '2025-07-09 06:21:37');

-- --------------------------------------------------------

--
-- Table structure for table `parkings`
--

CREATE TABLE `parkings` (
  `id` int(11) NOT NULL,
  `parkingNumber` varchar(255) NOT NULL,
  `vehicleNumber` varchar(255) DEFAULT NULL,
  `vehicleType` enum('car','bike','scooty') DEFAULT NULL,
  `ownerName` varchar(255) DEFAULT NULL,
  `flatId` varchar(255) DEFAULT NULL,
  `status` enum('occupied','vacant','reserved') NOT NULL DEFAULT 'vacant',
  `isVisitorSlot` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parkings`
--

INSERT INTO `parkings` (`id`, `parkingNumber`, `vehicleNumber`, `vehicleType`, `ownerName`, `flatId`, `status`, `isVisitorSlot`, `createdAt`, `updatedAt`) VALUES
(3, 'P-12', 'DL3CAF1234', 'car', 'Rohit Sharma', '009ded9e-09d1-4a7e-a2c7-8fcff4f26019', 'occupied', 0, '2025-07-03 12:10:58', '2025-07-03 12:10:58'),
(5, 'P-13', 'DL3CAF1234', 'car', 'Rohit Sharma', '009ded9e-09d1-4a7e-a2c7-8fcff4f26019', 'occupied', 1, '2025-07-05 08:12:10', '2025-07-05 08:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `permissionroles`
--

CREATE TABLE `permissionroles` (
  `id` int(11) NOT NULL,
  `roleId` varchar(255) NOT NULL,
  `permissionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissionroles`
--

INSERT INTO `permissionroles` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
(1, 'ce41a388-ab5a-40d0-8dae-cba2d9d157f9', 4, '2025-06-25 05:00:52', '2025-06-25 05:00:52'),
(2, '065196a3-bb72-4d59-b9ae-07e94c3a2844', 4, '2025-06-25 07:58:23', '2025-06-25 07:58:23'),
(3, '15329f9f-c9c4-4afc-a414-aaffd9ba3754', 8, '2025-07-04 04:40:10', '2025-07-04 04:40:10'),
(4, '15329f9f-c9c4-4afc-a414-aaffd9ba3754', 8, '2025-07-04 05:05:32', '2025-07-04 05:05:32'),
(5, '15329f9f-c9c4-4afc-a414-aaffd9ba3754', 8, '2025-07-04 05:31:07', '2025-07-04 05:31:07');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `action` enum('create','delete','read','update') NOT NULL,
  `resource` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `action`, `resource`, `createdAt`, `updatedAt`) VALUES
(1, 'create', '', '2025-06-23 08:32:27', '2025-06-23 08:32:27'),
(2, 'create', '', '2025-06-23 08:32:52', '2025-06-23 08:32:52'),
(3, 'create', '', '2025-06-23 10:18:39', '2025-06-23 10:18:39'),
(4, 'create', 'complaint', '2025-06-23 10:18:57', '2025-06-23 10:18:57'),
(5, 'read', 'complaint', '2025-06-23 10:21:23', '2025-06-23 10:21:23'),
(6, 'read', 'complaint', '2025-06-23 10:25:28', '2025-06-23 10:25:28'),
(7, '', 'visitor', '2025-06-23 10:50:30', '2025-06-23 10:50:30'),
(8, 'create', 'visitor', '2025-07-04 04:35:28', '2025-07-04 04:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` enum('Admin','User','Staff','Super-Admin') NOT NULL,
  `roleUId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `roleUId`, `createdAt`, `updatedAt`) VALUES
(1, 'User', 'ce41a388-ab5a-40d0-8dae-cba2d9d157f9', '2025-06-23 07:15:22', '2025-06-23 07:15:22'),
(2, 'Admin', 'fc7aab22-7390-4348-bdf3-1dbc36616a4b', '2025-06-23 10:53:16', '2025-06-23 10:53:16'),
(3, 'User', '065196a3-bb72-4d59-b9ae-07e94c3a2844', '2025-06-25 07:56:37', '2025-06-25 07:56:37'),
(4, 'User', '93e5ba67-748a-401a-beac-252ac648e459', '2025-07-01 05:06:28', '2025-07-01 05:06:28'),
(5, 'Super-Admin', '6a6db4d1-fae6-4f87-b430-629297b6074d', '2025-07-01 12:12:19', '2025-07-01 12:12:19'),
(6, 'Staff', '15329f9f-c9c4-4afc-a414-aaffd9ba3754', '2025-07-04 04:39:08', '2025-07-04 04:39:08');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250610055854-create-user.js'),
('20250610064721-add-roleId-to-User.js'),
('20250610092931-create-flat.js'),
('20250610093325-create-flat-user.js'),
('20250612063354-create-notice.js'),
('20250612063832-create-visitors.js'),
('20250612063848-create-complaint.js'),
('20250613153806-create-maintenance.js'),
('20250621052133-permissions.js'),
('20250621053531-PermissionsRoles.js'),
('20250621054311-Roles.js'),
('20250623063248-create-permission-roles.js'),
('20250624091844-permissionRoles.js'),
('20250626073252-society.js'),
('20250626090532-create-society.js'),
('20250626111048-transactions.js'),
('20250626111701-OTP.js'),
('20250627054621-otp-timestamps.js'),
('20250627105358-transaction-timestamps.js'),
('20250628054620-logs.js'),
('20250630071725-delivery.js'),
('20250630122325-parking.js'),
('roles.js');

-- --------------------------------------------------------

--
-- Table structure for table `society`
--

CREATE TABLE `society` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `licenceNo` text DEFAULT NULL,
  `roleId` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `pinCode` varchar(255) DEFAULT NULL,
  `maintenanceCostPerSqft` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `society`
--

INSERT INTO `society` (`id`, `name`, `licenceNo`, `roleId`, `address`, `city`, `pinCode`, `maintenanceCostPerSqft`, `createdAt`, `updatedAt`) VALUES
(1, 'Green Heights Apartments', 'abcd987', '', 'Plot 24, Sector 56', 'Mumbai', '400056', 20, '2025-07-07 09:24:08', '2025-07-07 09:24:27'),
(2, 'ALIX', 'abcddd', '', '45', 'Jaipur', '302021', 100, '2025-07-10 09:30:54', '2025-07-10 09:30:54');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `societyId` varchar(255) NOT NULL,
  `month` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `dueDate` datetime NOT NULL,
  `status` enum('Pending','Paid') NOT NULL,
  `paymentdate` datetime NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `societyId`, `month`, `amount`, `dueDate`, `status`, `paymentdate`, `paymentMethod`, `createdAt`, `updatedAt`) VALUES
(4, '1', 'June', 1500, '2025-07-05 00:00:00', 'Paid', '2025-07-01 00:00:00', 'Online', '2025-07-10 12:27:22', '2025-07-10 12:27:22');

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--

CREATE TABLE `userlogs` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `targetTable` varchar(255) NOT NULL,
  `targetId` int(11) NOT NULL,
  `changes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`changes`)),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlogs`
--

INSERT INTO `userlogs` (`id`, `userId`, `action`, `targetTable`, `targetId`, `changes`, `createdAt`, `updatedAt`) VALUES
(1, 15, 'update', 'Users', 15, '{\"password\":[\"$2b$10$yWmQZYY25doJy9bmROh5qOpIR9cf4PKKXgFeNRCnjMrir29vHpBey\",\"$2b$10$T10Lw0CRFMdZFIxY1KRRE.4i84LqZ5gDSwfdbgxAUeiDSgOMDY1.S\"]}', '2025-06-30 07:00:40', '2025-06-30 07:00:40'),
(2, 15, 'update', 'Users', 15, '{\"full_name\":[\"testing ag\",\"testing \"],\"password\":[\"$2b$10$T10Lw0CRFMdZFIxY1KRRE.4i84LqZ5gDSwfdbgxAUeiDSgOMDY1.S\",\"$2b$10$V99phd8jkyNNR92Vz/BbZ.q23bvHdFDrzt/umYBSc8bckcrKDD8ZO\"]}', '2025-06-30 07:14:43', '2025-06-30 07:14:43');

-- --------------------------------------------------------

--
-- Table structure for table `userss`
--

CREATE TABLE `userss` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `LicenceNo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userUId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `roleId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userss`
--

INSERT INTO `userss` (`id`, `full_name`, `LicenceNo`, `email`, `mobile`, `password`, `userUId`, `role`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Harshita Agarwal', 'ABC12', 'harshita@example.com', 877043879, '$2b$10$Ahv2ujsyPp13P1brza3hY.UMEUkaOx8hd84H.7bfDt70z8sr7fB5O', NULL, 'admin', 'fc7aab22-7390-4348-bdf3-1dbc36616a4b', '2025-07-02 06:42:42', '2025-07-02 06:42:42'),
(2, 'Harshita Agarwal', 'ABC12', 'harshita@example.com', 877043870, '$2b$10$yZRs9eRJvX.9iH/L4K.4EeM4wWFhfulXhcx11NumVVrZt0o730/eS', NULL, 'admin', 'fc7aab22-7390-4348-bdf3-1dbc36616a4b', '2025-07-03 06:08:58', '2025-07-03 06:08:58'),
(3, 'Harshita Agarwal', 'ABC12', 'harshita@example.com', 877043890, '$2b$10$3wsWuovrJRHwYe0qzs7eMuPgKpVXVpR7OM8bzzW1mZ3p4dZCqHKtC', NULL, 'Staff', '15329f9f-c9c4-4afc-a414-aaffd9ba3754', '2025-07-04 04:58:14', '2025-07-04 04:58:14'),
(4, 'Harshita', 'ABC12', 'harshita@example.com', 877043897, '$2b$10$RGr03N37fOc9.aUL2njF9OEPI0dJBJm00a.no0dMt.ZhmbrkD5deO', NULL, 'Staff', '15329f9f-c9c4-4afc-a414-aaffd9ba3754', '2025-07-05 12:23:04', '2025-07-05 12:23:04'),
(5, 'Harshita ', 'abcd1234', 'test@gmail.com', 123456789454, '$2b$10$41IUj5UdUOl17x5Yzx1XYOSUvLwhfajBiPMXKKJ.W2AYdB6C/ljaS', NULL, 'user', 'ce41a388-ab5a-40d0-8dae-cba2d9d157f9', '2025-07-11 05:20:46', '2025-07-11 05:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) NOT NULL,
  `flatId` varchar(255) NOT NULL,
  `vehicleNum` varchar(255) DEFAULT NULL,
  `SenderId` varchar(255) NOT NULL,
  `RecieverId` varchar(255) NOT NULL,
  `status` enum('pending','approved') NOT NULL,
  `inTime` datetime DEFAULT NULL,
  `outTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `name`, `mobile`, `purpose`, `flatId`, `vehicleNum`, `SenderId`, `RecieverId`, `status`, `inTime`, `outTime`, `createdAt`, `updatedAt`) VALUES
(1, 'Sooraj Kumar', '9876543210', 'Delivery', 'f1530177-c45d-4a5a-a95f-726bd31b15e5', NULL, '2', '1', 'pending', '2025-07-01 09:45:00', '2025-07-01 10:00:00', '2025-07-03 12:50:54', '2025-07-03 12:50:54'),
(2, 'Sooraj Kumar', '9876543210', 'Delivery', 'f1530177-c45d-4a5a-a95f-726bd31b15e5', NULL, '3', '1', 'pending', '2025-07-01 09:45:00', '2025-07-01 10:00:00', '2025-07-04 05:59:31', '2025-07-04 05:59:31'),
(3, 'Sooraj Kumar', '9876543210', 'Delivery', 'f1530177-c45d-4a5a-a95f-726bd31b15e5', NULL, '3', '1', 'pending', '2025-07-01 09:45:00', '2025-07-01 10:00:00', '2025-07-05 07:20:32', '2025-07-05 07:20:32'),
(4, 'Sooraj Kumar', '9876543210', 'Delivery', 'f1530177-c45d-4a5a-a95f-726bd31b15e5', NULL, '3', '1', 'pending', '2025-07-01 09:45:00', '2025-07-01 10:00:00', '2025-07-09 06:21:24', '2025-07-09 06:21:24'),
(5, 'Manoj Kumar', '9876543210', 'Delivery', 'f1530177-c45d-4a5a-a95f-726bd31b15e5', NULL, '3', '1', 'pending', '2025-07-01 09:45:00', '2025-07-01 10:00:00', '2025-07-09 06:21:37', '2025-07-09 06:21:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flats`
--
ALTER TABLE `flats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flatUId` (`flatUId`);

--
-- Indexes for table `flatusers`
--
ALTER TABLE `flatusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parkings`
--
ALTER TABLE `parkings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parkingNumber` (`parkingNumber`);

--
-- Indexes for table `permissionroles`
--
ALTER TABLE `permissionroles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roleUId` (`roleUId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `society`
--
ALTER TABLE `society`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlogs`
--
ALTER TABLE `userlogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userss`
--
ALTER TABLE `userss`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password` (`password`),
  ADD UNIQUE KEY `userUId` (`userUId`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `flats`
--
ALTER TABLE `flats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `flatusers`
--
ALTER TABLE `flatusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1644772;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `parkings`
--
ALTER TABLE `parkings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permissionroles`
--
ALTER TABLE `permissionroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `society`
--
ALTER TABLE `society`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userlogs`
--
ALTER TABLE `userlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userss`
--
ALTER TABLE `userss`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
