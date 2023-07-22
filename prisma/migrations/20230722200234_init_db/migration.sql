-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_balance" MONEY NOT NULL DEFAULT 0,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiancial_controls" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_incomes" MONEY NOT NULL DEFAULT 0,
    "total_expenses" MONEY NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fiancial_controls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" MONEY NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financial_control_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- AddForeignKey
ALTER TABLE "fiancial_controls" ADD CONSTRAINT "fiancial_controls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_financial_control_id_fkey" FOREIGN KEY ("financial_control_id") REFERENCES "fiancial_controls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
