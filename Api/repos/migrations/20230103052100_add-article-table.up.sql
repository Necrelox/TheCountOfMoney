CREATE TABLE IF NOT EXISTS `IOM`.`ARTICLE`
(
    `title`       TEXT     NOT NULL,
    `description` LONGTEXT NOT NULL,
    `content`     LONGTEXT NOT NULL,
    `pubDate`     DATE     NOT NULL,
    `id`          INT      NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB;
