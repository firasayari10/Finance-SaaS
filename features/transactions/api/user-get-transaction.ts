"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { converAmountFromMiliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      if (!id) throw new Error("Transaction ID is required");

      const response = await client.api.transactions[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction");
      }

      const { data } = await response.json();
      return {
        ...data,
        amount: converAmountFromMiliunits(data.amount), // fixed typo
      };
    },
    enabled: !!id, // only run if id is defined
  });

  return query;
};
