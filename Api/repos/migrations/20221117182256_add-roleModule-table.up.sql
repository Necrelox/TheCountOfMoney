CREATE TABLE IF NOT EXISTS `TheCountOfMoney`.`ROLE_MODULE`
(
    `id`       INT NOT NULL AUTO_INCREMENT,
    `roleId`   INT NOT NULL,
    `moduleId` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_ROLE_MODULE_1_idx` (`roleId` ASC) VISIBLE,
    INDEX `fk_ROLE_MODULE_2_idx` (`moduleId` ASC) VISIBLE,
    CONSTRAINT `fk_ROLE_MODULE_1`
        FOREIGN KEY (`roleId`)
            REFERENCES `TheCountOfMoney`.`ROLE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ROLE_MODULE_2`
        FOREIGN KEY (`moduleId`)
            REFERENCES `TheCountOfMoney`.`MODULE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
