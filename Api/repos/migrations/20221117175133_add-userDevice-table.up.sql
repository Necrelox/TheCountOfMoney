CREATE TABLE IF NOT EXISTS `EchBoard`.`USER_DEVICE`
(
    `device`    VARCHAR(255) NOT NULL,
    `createdAt` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `active`    TINYINT      NOT NULL DEFAULT 0,
    `userUuid`  BINARY(16)   NOT NULL,
    `uuid`      BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    INDEX `fk_USER_DEVICE_1_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_DEVICE_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
