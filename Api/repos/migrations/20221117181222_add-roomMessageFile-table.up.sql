CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM_MESSAGE_FILE`
(
    `path`            VARCHAR(255) NOT NULL,
    `seed`            INT          NOT NULL,
    `createdAt`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `sizeMo`          INT          NOT NULL,
    `roomMessageUuid` BINARY(16)   NOT NULL,
    `uuid`            BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_ROOM_MESSAGE_FILE_1_idx` (`roomMessageUuid` ASC) VISIBLE,
    CONSTRAINT `fk_ROOM_MESSAGE_FILE_1`
        FOREIGN KEY (`roomMessageUuid`)
            REFERENCES `EchBoard`.`ROOM_MESSAGE` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = ascii;
