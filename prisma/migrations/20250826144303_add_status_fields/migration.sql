-- AlterTable
ALTER TABLE "public"."internship_applications" ADD COLUMN     "review_message" TEXT,
ADD COLUMN     "reviewed_at" TIMESTAMPTZ(6),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."training_registrations" ADD COLUMN     "review_message" TEXT,
ADD COLUMN     "reviewed_at" TIMESTAMPTZ(6),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."training_volunteers" ADD COLUMN     "review_message" TEXT,
ADD COLUMN     "reviewed_at" TIMESTAMPTZ(6),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
