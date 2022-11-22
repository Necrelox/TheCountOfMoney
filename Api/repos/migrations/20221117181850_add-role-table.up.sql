CREATE TABLE IF NOT EXISTS `TheCountOfMoney`.`ROLE`
(
    `name` VARCHAR(45) NOT NULL,
    `id`   INT         NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE
)
    ENGINE = InnoDB;
