-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('READER', 'WRITER');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'READER';
