"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function addSymbolToWatchList({ symbolId }: { symbolId: string }) {
  try {
    // Get the current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Find the user in the Prisma database by email
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { watchlist: true },
    });

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    // Find the stock symbol by symbol (not ID)
    const stockSymbol = await prisma.stockSymbol.findFirst({
      where: { symbol: symbolId },
    });

    if (!stockSymbol) {
      throw new Error("Stock symbol not found");
    }

    // If user doesn't have a watchlist, create one
    if (!dbUser.watchlist) {
      await prisma.watchlist.create({
        data: {
          name: "My Watchlist",
          userId: dbUser.id,
          stockSymbols: {
            connect: { id: stockSymbol.id },
          },
        },
      });
    } else {
      // Add the stock symbol to existing watchlist
      await prisma.watchlist.update({
        where: { id: dbUser.watchlist.id },
        data: {
          stockSymbols: {
            connect: { id: stockSymbol.id },
          },
        },
      });
    }

    // Revalidate the page to show updated watchlist
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Symbol added to watchlist",
    };
  } catch (error) {
    console.error("Error adding symbol to watchlist:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add symbol to watchlist",
    };
  }
}

export async function removeSymbolFromWatchList({
  symbolId,
}: {
  symbolId: string;
}) {
  try {
    // Get the current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Find the user in the Prisma database by email
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { watchlist: true },
    });

    if (!dbUser?.watchlist) {
      throw new Error("User has no watchlist");
    }

    // Find the stock symbol by symbol (not ID)
    const stockSymbol = await prisma.stockSymbol.findFirst({
      where: { symbol: symbolId },
    });

    if (!stockSymbol) {
      throw new Error("Stock symbol not found");
    }

    // Remove the stock symbol from the watchlist
    await prisma.watchlist.update({
      where: { id: dbUser.watchlist.id },
      data: {
        stockSymbols: {
          disconnect: { id: stockSymbol.id },
        },
      },
    });

    // Revalidate the page to show updated watchlist
    revalidatePath("/dashboard");

    return { success: true, message: "Symbol removed from watchlist" };
  } catch (error) {
    console.error("Error removing symbol from watchlist:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to remove symbol from watchlist",
    };
  }
}

export async function isSymbolInWatchlist({ symbolId }: { symbolId: string }) {
  try {
    // Get the current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return false;
    }
    // Find the user in the Prisma database by email
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        watchlist: {
          include: {
            stockSymbols: {
              where: { symbol: symbolId },
            },
          },
        },
      },
    });

    if (!dbUser?.watchlist) {
      return false;
    }

    return dbUser.watchlist.stockSymbols.length > 0;
  } catch (error) {
    console.error("Error checking if symbol is in watchlist:", error);
    return false;
  }
}
