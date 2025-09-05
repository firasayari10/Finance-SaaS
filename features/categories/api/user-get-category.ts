"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id?:string) => {
  enabled : !!id;
  const query = useQuery({
    queryKey: ["category",{id}],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({param : {id},});

      if (!response.ok) {
        throw new Error("failed to fetch category;");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};