-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dokter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dokter_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` DATE NOT NULL,
    `date` TIMESTAMP NOT NULL,
    `daterange` DATETIME(3) NULL,
    `time_start` TIME(4) NOT NULL,
    `time_finish` TIME(4) NOT NULL,
    `quota` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `dokter_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dokter` ADD CONSTRAINT `Dokter_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_dokter_id_fkey` FOREIGN KEY (`dokter_id`) REFERENCES `Dokter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
