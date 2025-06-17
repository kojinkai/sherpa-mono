import { PrismaClient, Prisma } from "../generated/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Lewis Nixon",
    email: "lewis.c.nixon@protonmail.com",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
