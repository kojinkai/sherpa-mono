import { Prisma, PrismaClient } from "../generated/client";
import ipoSeedData from "../ipo-seed-data.json";
import stockSymbolSeedData from "../symbol-us-seed-data.json";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Lewis Nixon",
    email: "lewis.c.nixon@protonmail.com",
  },
];

const ipoData = ipoSeedData as Prisma.IPOEventCreateInput[];
const stockSymbolData = stockSymbolSeedData as Prisma.StockSymbolCreateInput[];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  for (const ipoEvent of ipoData) {
    await prisma.iPOEvent.create({
      data: { ...ipoEvent, date: new Date(ipoEvent.date) },
    });
  }
  for (const stockSymbol of stockSymbolData) {
    await prisma.stockSymbol.create({
      data: stockSymbol,
    });
  }
}

main();
