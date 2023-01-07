CREATE TABLE IF NOT EXISTS `IOM`.`ARTICLE_HAS_CATEGORY`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `categoryId` INT NOT NULL,
    `articleId`  INT NOT NULL,
    PRIMARY KEY (`id`, `categoryId`, `articleId`),
    INDEX `fk_ARTICLE_HAS_CATEGORY1_idx` (`articleId` ASC) VISIBLE,
    INDEX `fk_ARTICLE_HAS_CATEGORY2_idx` (`categoryId` ASC) VISIBLE,
    CONSTRAINT `fk_ARTICLE_HAS_CATEGORY1`
        FOREIGN KEY (`articleId`)
            REFERENCES `IOM`.`ARTICLE` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    CONSTRAINT `fk_ARTICLE_HAS_CATEGORY2`
        FOREIGN KEY (`categoryId`)
            REFERENCES `IOM`.`CATEGORY_FLUX_RSS` (`id`)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;
