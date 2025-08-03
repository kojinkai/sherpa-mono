-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StockSymbolToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StockSymbolToWatchlist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_key" ON "Watchlist"("userId");

-- CreateIndex
CREATE INDEX "_StockSymbolToWatchlist_B_index" ON "_StockSymbolToWatchlist"("B");

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockSymbolToWatchlist" ADD CONSTRAINT "_StockSymbolToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "StockSymbol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockSymbolToWatchlist" ADD CONSTRAINT "_StockSymbolToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create trigger function to automatically create watchlist for new users
CREATE OR REPLACE FUNCTION create_watchlist_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Watchlist" (name, "userId", "createdAt", "updatedAt")
  VALUES ('My Watchlist', NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires after a user is inserted
CREATE TRIGGER user_watchlist_trigger
  AFTER INSERT ON "User"
  FOR EACH ROW
  EXECUTE FUNCTION create_watchlist_for_user();
