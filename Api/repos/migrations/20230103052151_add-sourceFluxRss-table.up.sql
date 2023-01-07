CREATE TABLE IF NOT EXISTS `IOM`.`SOURCE_FLUX_RSS`
(
    `url`        VARCHAR(255) NOT NULL,
    `categoryId` INT          NOT NULL,
    `id`         INT          NOT NULL AUTO_INCREMENT,
    UNIQUE INDEX `url_UNIQUE` (`url` ASC) VISIBLE,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_SOURCE_FLUX_RSS_1`
        FOREIGN KEY (`id`)
            REFERENCES `IOM`.`CATEGORY_FLUX_RSS` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
