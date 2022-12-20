CREATE TABLE IF NOT EXISTS `IOM`.`USER_HISTORY`
(
    `log`       TEXT       NULL,
    `createdAt` DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userUuid`  BINARY(16) NOT NULL,
    `uuid`      BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_HISTORY_1_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_HISTORY_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `IOM`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
