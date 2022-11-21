CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM_HAS_CATEGORIE`
(
    `categorieUuid` BINARY(16) NOT NULL,
    `roomUuid`      BINARY(16) NOT NULL,
    `uuid`          BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_ROOM_HAS_CATEGORIE_1_idx` (`roomUuid` ASC) VISIBLE,
    INDEX `fk_ROOM_HAS_CATEGORIE_2_idx` (`categorieUuid` ASC) VISIBLE,
    CONSTRAINT `fk_ROOM_HAS_CATEGORIE_1`
        FOREIGN KEY (`roomUuid`)
            REFERENCES `EchBoard`.`ROOM` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ROOM_HAS_CATEGORIE_2`
        FOREIGN KEY (`categorieUuid`)
            REFERENCES `EchBoard`.`CATEGORIE` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
