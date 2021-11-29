-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.5.8-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- test 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;

-- 테이블 test.corp_list 구조 내보내기
CREATE TABLE IF NOT EXISTS `corp_list` (
  `corp` varchar(30) CHARACTER SET utf8 NOT NULL DEFAULT 'NONE',
  `app_img` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `logo_img` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `delete_yn` smallint(6) DEFAULT 0,
  PRIMARY KEY (`corp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 test.nubo 구조 내보내기
CREATE TABLE IF NOT EXISTS `nubo` (
  `userfile` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `os` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `version` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `types` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `corp` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `delete_yn` tinyint(1) DEFAULT 0,
  `comment` mediumtext CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userfile` (`userfile`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=latin1;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
