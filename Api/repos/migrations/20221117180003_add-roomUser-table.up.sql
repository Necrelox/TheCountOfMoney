CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM_USER`
(
    `createdAt`    DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `isRoomMaster` TINYINT    NOT NULL DEFAULT 0,
    `userUuid`     BINARY(16) NOT NULL,
    `roomUuid`     BINARY(16) NOT NULL,
    `uuid`         BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_ROOM_USER_1_idx` (`roomUuid` ASC) VISIBLE,
    INDEX `fk_ROOM_USER_2_idx` (`userUuid` ASC) VISIBLE,
    CONSTRAINT `fk_ROOM_USER_1`
        FOREIGN KEY (`roomUuid`)
            REFERENCES `EchBoard`.`ROOM` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ROOM_USER_2`
        FOREIGN KEY (`userUuid`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
