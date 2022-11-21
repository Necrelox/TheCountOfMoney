CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM_ACTION`
(
    `createdAt`    DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `action`       TEXT       NOT NULL,
    `roomUserUuid` BINARY(16) NOT NULL,
    `uuid`         BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_ROOM_ACTION_1_idx` (`roomUserUuid` ASC) VISIBLE,
    CONSTRAINT `fk_ROOM_ACTION_1`
        FOREIGN KEY (`roomUserUuid`)
            REFERENCES `EchBoard`.`ROOM_USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
