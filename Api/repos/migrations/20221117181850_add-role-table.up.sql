CREATE TABLE IF NOT EXISTS `IOM`.`ROLE`
(
    `name` VARCHAR(45) NOT NULL,
    `id`   INT         NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE
)
    ENGINE = InnoDB;
