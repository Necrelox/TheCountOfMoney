CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM_HAS_TAG`
(
    `roomUuid` BINARY(16) NOT NULL,
    `tagUuid`  BINARY(16) NOT NULL,
    `uuid`     BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_ROOM_HAS_TAG_1_idx` (`roomUuid` ASC) VISIBLE,
    INDEX `fk_ROOM_HAS_TAG_2_idx` (`tagUuid` ASC) VISIBLE,
    CONSTRAINT `fk_ROOM_HAS_TAG_1`
        FOREIGN KEY (`roomUuid`)
            REFERENCES `EchBoard`.`ROOM` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ROOM_HAS_TAG_2`
        FOREIGN KEY (`tagUuid`)
            REFERENCES `EchBoard`.`TAG` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
