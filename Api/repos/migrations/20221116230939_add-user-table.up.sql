CREATE TABLE IF NOT EXISTS `TheCountOfMoney`.`USER`
(
    `username`        VARCHAR(45)    NOT NULL,
    `email`           VARCHAR(255)   NOT NULL,
    `password`        VARBINARY(255) NOT NULL,
    `activityMessage` VARCHAR(120)   NULL,
    `isConnected`     TINYINT        NOT NULL DEFAULT 0,
    `isBlackListed`   TINYINT        NOT NULL DEFAULT 0,
    `createdAt`       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `uuid`            BINARY(16)     NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8;
