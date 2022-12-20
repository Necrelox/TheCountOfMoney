CREATE TABLE IF NOT EXISTS `IOM`.`USER_IP`
(
    `ip`        VARCHAR(16) NOT NULL,
    `createdAt` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `active`    TINYINT     NOT NULL DEFAULT 0,
    `userUuid`  BINARY(16)  NOT NULL,
    `uuid`      BINARY(16)  NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_IP_1_idx` (`userUuid` ASC) VISIBLE,
    UNIQUE INDEX `ip_UNIQUE` (`ip` ASC) VISIBLE,
    CONSTRAINT `fk_USER_IP_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `IOM`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
