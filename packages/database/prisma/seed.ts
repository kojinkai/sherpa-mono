import { PrismaClient, Prisma } from "../generated/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Lewis Nixon",
    email: "lewis.c.nixon@protonmail.com",
  },
];

const ipoData: Prisma.IPOEventCreateInput[] = [
  {
    date: "2020-04-24",
    exchange: "NASDAQ Global Select",
    name: "Oric Pharmaceuticals, Inc.",
    numberOfShares: 7500000,
    price: "16.00",
    status: "priced",
    symbol: "ORIC",
    totalSharesValue: 120000000,
  },
  {
    date: "2020-04-24",
    exchange: "NYSE",
    name: "E2open Parent Holdings, Inc.",
    numberOfShares: 36000000,
    price: "10.00",
    status: "priced",
    symbol: "PCPLU",
    totalSharesValue: 360000000,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  for (const ipoEvent of ipoData) {
    await prisma.iPOEvent.create({ data: ipoEvent });
  }
}

main();
