-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`country` (
  `country_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE INDEX `idcountry_UNIQUE` (`country_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`conflict`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`conflict` (
  `conflicts_id` INT NOT NULL,
  `date_start` VARCHAR(45) NOT NULL,
  `date_end` VARCHAR(45) NOT NULL,
  `country_country_id` INT NOT NULL,
  PRIMARY KEY (`conflicts_id`),
  UNIQUE INDEX `conflicts_id_UNIQUE` (`conflicts_id` ASC) VISIBLE,
  INDEX `fk_conflict_country_idx` (`country_country_id` ASC) VISIBLE,
  CONSTRAINT `fk_conflict_country`
    FOREIGN KEY (`country_country_id`)
    REFERENCES `mydb`.`country` (`country_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`resource`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`resource` (
  `resource_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`resource_id`),
  UNIQUE INDEX `resource_id_UNIQUE` (`resource_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`resource_prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`resource_prices` (
  `resource_prices_id` INT NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `resource_resource_id` INT NOT NULL,
  PRIMARY KEY (`resource_prices_id`),
  UNIQUE INDEX `resource_prices_id_UNIQUE` (`resource_prices_id` ASC) VISIBLE,
  INDEX `fk_resource_prices_resource1_idx` (`resource_resource_id` ASC) VISIBLE,
  CONSTRAINT `fk_resource_prices_resource1`
    FOREIGN KEY (`resource_resource_id`)
    REFERENCES `mydb`.`resource` (`resource_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
