-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
