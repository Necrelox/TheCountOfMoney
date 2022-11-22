CREATE TABLE IF NOT EXISTS `TheCountOfMoney`.`USER_DOCUMENTS`
(
    `path`      VARCHAR(255) NOT NULL,
    `seed`      INT          NOT NULL,
    `sizeMo`    INT          NOT NULL,
    `createdAt` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userUuid`  BINARY(16)   NOT NULL,
    `uuid`      BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_DOCUMENTS_1_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_DOCUMENTS_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `TheCountOfMoney`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
