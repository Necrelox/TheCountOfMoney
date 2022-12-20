CREATE TABLE IF NOT EXISTS `IOM`.`USER_ROLE`
(
    `roleId`   INT        NOT NULL,
    `userUuid` BINARY(16) NOT NULL,
    `id`       INT        NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`),
    INDEX `fk_USER_ROLE_1_idx` (`userUuid` ASC) VISIBLE,
    INDEX `fk_USER_ROLE_2_idx` (`roleId` ASC) VISIBLE,
    CONSTRAINT `fk_USER_ROLE_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `IOM`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_USER_ROLE_2`
        FOREIGN KEY (`roleId`)
            REFERENCES `IOM`.`ROLE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
