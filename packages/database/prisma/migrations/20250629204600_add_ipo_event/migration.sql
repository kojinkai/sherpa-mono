-- CreateTable
CREATE TABLE "IPOEvent" (
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "exchange" TEXT,
    "numberOfShares" INTEGER,
    "price" TEXT,
    "status" TEXT NOT NULL,
    "symbol" TEXT,
    "totalSharesValue" INTEGER,

    CONSTRAINT "IPOEvent_pkey" PRIMARY KEY ("name")
);
