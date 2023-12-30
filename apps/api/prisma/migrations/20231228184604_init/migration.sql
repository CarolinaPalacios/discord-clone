/*
  Warnings:

  - You are about to drop the column `memberId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `DirectMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_channelId_fkey";

-- DropIndex
DROP INDEX "Channel_profileId_serverId_idx";

-- DropIndex
DROP INDEX "Conversation_memberOneId_memberTwoId_idx";

-- DropIndex
DROP INDEX "DirectMessage_memberId_conversationId_idx";

-- DropIndex
DROP INDEX "Member_profileId_serverId_idx";

-- DropIndex
DROP INDEX "Message_memberId_channelId_idx";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "memberId";

-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "channelId";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "role" "MemberRole" NOT NULL DEFAULT 'GUEST';

-- CreateIndex
CREATE INDEX "Channel_profileId_idx" ON "Channel"("profileId");

-- CreateIndex
CREATE INDEX "Channel_serverId_idx" ON "Channel"("serverId");

-- CreateIndex
CREATE INDEX "Conversation_memberTwoId_idx" ON "Conversation"("memberTwoId");

-- CreateIndex
CREATE INDEX "DirectMessage_memberId_idx" ON "DirectMessage"("memberId");

-- CreateIndex
CREATE INDEX "DirectMessage_conversationId_idx" ON "DirectMessage"("conversationId");

-- CreateIndex
CREATE INDEX "Member_profileId_idx" ON "Member"("profileId");

-- CreateIndex
CREATE INDEX "Member_serverId_idx" ON "Member"("serverId");

-- CreateIndex
CREATE INDEX "Message_memberId_idx" ON "Message"("memberId");

-- CreateIndex
CREATE INDEX "Message_channelId_idx" ON "Message"("channelId");
