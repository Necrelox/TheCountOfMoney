CREATE TABLE IF NOT EXISTS `EchBoard`.`ROLE_MODULE`
(
    `id`       INT NOT NULL AUTO_INCREMENT,
    `roleId`   INT NOT NULL,
    `moduleId` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_ROLE_MODULE_1_idx` (`roleId` ASC) VISIBLE,
    INDEX `fk_ROLE_MODULE_2_idx` (`moduleId` ASC) VISIBLE,
    CONSTRAINT `fk_ROLE_MODULE_1`
        FOREIGN KEY (`roleId`)
            REFERENCES `EchBoard`.`ROLE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ROLE_MODULE_2`
        FOREIGN KEY (`moduleId`)
            REFERENCES `EchBoard`.`MODULE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
