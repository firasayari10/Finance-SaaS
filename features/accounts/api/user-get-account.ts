"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccount = (id?:string) => {
  enabled : !!id;
  const query = useQuery({
    queryKey: ["account",{id}],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({param : {id},});

      if (!response.ok) {
        throw new Error("failed to fetch account ;");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};