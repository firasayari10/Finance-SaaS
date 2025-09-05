"use client"


import { InferResponseType } from "hono" ; 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown,ArrowUpDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"
import { Button  } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { client } from "@/lib/hono";
import { Actions }  from "./actions"
export type ResponsType = InferResponseType<typeof client.api.categories.$get ,200>["data"][0];

export const columns: ColumnDef<ResponsType>[] = [
   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    id : "actions",
    cell :({row}) => <Actions id={row.original.id} />
  }
 
]