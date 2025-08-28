-- CreateTable
CREATE TABLE "public"."partnership_interests" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "partnership_type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "agreed_terms" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'new',
    "reviewed_at" TIMESTAMPTZ(6),
    "review_message" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partnership_interests_pkey" PRIMARY KEY ("id")
);
