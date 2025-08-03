"use client";
import { Badge, Button, Text } from "@/catalyst-components";
import { IconLoading, PageHeading } from "@/components";
import { useEffect, useState } from "react";
import { addSymbolToWatchList, removeSymbolFromWatchList } from "./actions";
import { SymbolPageProps } from "./interface";

export default function SymbolPage({
  data,
  isInWatchlist,
  symbolId,
}: React.ComponentPropsWithoutRef<"div"> & SymbolPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [isInWatchlist]);

  const handleAddToWatchlist = async () => {
    setIsLoading(true);
    if (isInWatchlist) {
      await removeSymbolFromWatchList({ symbolId });
    } else {
      await addSymbolToWatchList({ symbolId });
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        title={`${data.Name} (${data.Symbol})`}
        action={
          <Button
            color={isInWatchlist ? "dark/zinc" : "emerald"}
            onClick={handleAddToWatchlist}
            disabled={isLoading}
          >
            {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            {isLoading && <IconLoading className="size-4 ml-1/2" />}
          </Button>
        }
      >
        <div className="flex items-center gap-4">
          {data.Exchange && <Text>{data.Exchange}</Text>}
          {isInWatchlist && <Badge color="emerald">Added to Watchlist</Badge>}
        </div>
      </PageHeading>

      <div className="flex flex-col md:flex-row gap-4 max-w-prose">
        {data.Description && (
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            {data.Description}
          </Text>
        )}
      </div>
    </div>
  );
}
