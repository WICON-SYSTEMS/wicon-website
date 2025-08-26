/*
  Warnings:

  - The primary key for the `internship_applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `training_registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `training_volunteers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `internship_applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `training_registrations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `training_volunteers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."internship_applications" DROP CONSTRAINT "internship_applications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "internship_applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."training_registrations" DROP CONSTRAINT "training_registrations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "training_registrations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."training_volunteers" DROP CONSTRAINT "training_volunteers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "training_volunteers_pkey" PRIMARY KEY ("id");
