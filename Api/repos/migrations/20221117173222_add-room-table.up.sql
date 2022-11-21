CREATE TABLE IF NOT EXISTS `EchBoard`.`ROOM`
(
    `createdAt`       DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `optionLimitUser` INT        NOT NULL DEFAULT 10,
    `uuid`            BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE
) ENGINE = InnoDB;
