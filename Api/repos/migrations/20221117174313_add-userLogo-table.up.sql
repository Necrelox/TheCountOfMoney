CREATE TABLE IF NOT EXISTS `EchBoard`.`USER_LOGO`
(
    `path`      VARCHAR(255) NOT NULL,
    `createdAt` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `seed`      INT          NOT NULL,
    `sizeMo`    INT          NOT NULL,
    `active`    TINYINT      NOT NULL DEFAULT 0,
    `userUuid`  BINARY(16)   NOT NULL,
    `uuid`      BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_LOGO_1_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_LOGO_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
) ENGINE = InnoDB;
