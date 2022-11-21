CREATE TABLE IF NOT EXISTS `EchBoard`.`USER_FRIEND`
(
    `createdAt`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `acceptedAt` DATETIME   NULL,
    `isAccepted` TINYINT    NOT NULL DEFAULT 0,
    `user`       BINARY(16) NOT NULL,
    `friend`     BINARY(16) NOT NULL,
    `uuid`       BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    INDEX `fk_USER_FRIEND_1_idx` (`user` ASC) VISIBLE,
    INDEX `fk_USER_FRIEND_2_idx` (`friend` ASC) VISIBLE,
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    CONSTRAINT `fk_USER_FRIEND_1`
        FOREIGN KEY (`user`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_USER_FRIEND_2`
        FOREIGN KEY (`friend`)
            REFERENCES `EchBoard`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
