-- CreateTable
CREATE TABLE "public"."internship_applications" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "dob" DATE,
    "sex" TEXT,
    "position" TEXT,
    "availability" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "skills" TEXT,
    "certifications" TEXT,
    "languages" TEXT,
    "academic_entries" JSONB NOT NULL,
    "experience_entries" JSONB NOT NULL,
    "references_list" JSONB NOT NULL,
    "cv_bucket" TEXT,
    "cv_path" TEXT,
    "photo_bucket" TEXT,
    "photo_path" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "internship_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."training_registrations" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,
    "experience_level" TEXT,
    "motivation" TEXT NOT NULL,
    "employer" TEXT,
    "agreed_terms" BOOLEAN NOT NULL DEFAULT false,
    "wants_updates" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."training_volunteers" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "years_experience" TEXT NOT NULL,
    "teaching_experience" TEXT,
    "current_role" TEXT NOT NULL,
    "company" TEXT,
    "availability" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "resume_bucket" TEXT,
    "resume_path" TEXT,
    "agreed_terms" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_volunteers_pkey" PRIMARY KEY ("id")
);
