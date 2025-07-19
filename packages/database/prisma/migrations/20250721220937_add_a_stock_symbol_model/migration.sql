-- CreateTable
CREATE TABLE "StockSymbol" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displaySymbol" TEXT NOT NULL,
    "figi" TEXT NOT NULL,
    "isin" TEXT,
    "mic" TEXT NOT NULL,
    "shareClassFIGI" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbol2" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "StockSymbol_pkey" PRIMARY KEY ("id")
);
