/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `fiancial_controls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fiancial_controls_name_user_id_key" ON "fiancial_controls"("name", "user_id");
