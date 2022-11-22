CREATE TABLE IF NOT EXISTS `TheCountOfMoney`.`USER_REPORT`
(
    `createdAt`      DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reason`         TEXT       NOT NULL,
    `userSendReport` BINARY(16) NOT NULL,
    `userReported`   BINARY(16) NOT NULL,
    `uuid`           BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
    INDEX `fk_USER_REPORT_1_idx` (`userSendReport` ASC) VISIBLE,
    INDEX `fk_USER_REPORT_2_idx` (`userReported` ASC) VISIBLE,
    CONSTRAINT `fk_USER_REPORT_1`
        FOREIGN KEY (`userSendReport`)
            REFERENCES `TheCountOfMoney`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_USER_REPORT_2`
        FOREIGN KEY (`userReported`)
            REFERENCES `TheCountOfMoney`.`USER` (`uuid`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
