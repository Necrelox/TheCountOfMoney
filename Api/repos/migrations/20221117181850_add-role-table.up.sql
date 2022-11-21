CREATE TABLE IF NOT EXISTS `EchBoard`.`ROLE`
(
    `name` VARCHAR(45) NOT NULL,
    `id`   INT         NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE
)
    ENGINE = InnoDB;
