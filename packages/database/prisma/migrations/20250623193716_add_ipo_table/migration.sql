-- CreateTable
CREATE TABLE "IPO" (
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "exchange" TEXT,
    "numberOfShares" INTEGER,
    "price" TEXT,
    "status" TEXT NOT NULL,
    "symbol" TEXT,
    "totalSharesValue" INTEGER,

    CONSTRAINT "IPO_pkey" PRIMARY KEY ("name")
);
