CREATE TABLE IF NOT EXISTS `IOM`.`USER_PREFERENCE`
(
    `userUuid`     BINARY(16)   NOT NULL,
    `preferenceId` VARCHAR(255) NOT NULL,
    `id`           INT          NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`),
    INDEX `fk_USER_PREFERENCE2_idx` (`preferenceId` ASC) VISIBLE,
    INDEX `fk_USER_PREFERENCE1_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_PREFERENCE1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `IOM`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_USER_PREFERENCE2`
        FOREIGN KEY (`preferenceId`)
            REFERENCES `IOM`.`PREFERENCE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;

