CREATE TABLE IF NOT EXISTS `EchBoard`.`USER_MAC_ADDRESS`
(
    `macAddress` VARCHAR(255) NOT NULL,
    `createdAt`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `active`     TINYINT      NOT NULL DEFAULT 0,
    `userUuid`   BINARY(16)   NOT NULL,
    `uuid`       BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_MACADDRESS_1_idx` (`userUuid` ASC) VISIBLE,
    UNIQUE INDEX `macAddress_UNIQUE` (`macAddress` ASC) VISIBLE,
    CONSTRAINT `fk_USER_MACADDRESS_1`
        FOREIGN KEY (`userUuid`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
