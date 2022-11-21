CREATE TABLE IF NOT EXISTS `EchBoard`.`USER_TOKEN`
(
    `createdAt` DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expireAt`  DATETIME       NOT NULL,
    `salt`      VARBINARY(128) NOT NULL,
    `token`     TEXT           NOT NULL,
    `userUuid`  BINARY(16)     NOT NULL,
    `uuid`      BINARY(16)     NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_TOKEN_1_idx` (`userUuid` ASC) VISIBLE,
    UNIQUE INDEX `userUuid_UNIQUE` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_TOKEN_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
