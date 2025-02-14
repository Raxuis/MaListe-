"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "~/utils";
import { Link } from "react-router";
import { useParams } from "react-router";
import { Pen, Trash } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";

export type ShoppingList = {
  id: number,
  name: string,
  description: string,
  created_at: string,
  items?: [{
    id: number,
    name: string,
    created_at: string
  }]
}

export const shoppingListsItemsColumns: ColumnDef<ShoppingList>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      return <p className="text-14-medium">{formatDateTime(row.original.created_at).dateTime}</p>;
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const item = row.original;
      const params = useParams();
      const shoppingListId = params.id;

      return (
        <div className="flex gap-1">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "icon"
            })}
            to={`/shopping-lists/${shoppingListId}/items/${item.id}/edit`}
          >
            <Pen />
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "icon"
            })}
            to={`/shopping-lists/${shoppingListId}/items/${item.id}/delete`}
          >
            <Trash />
          </Link>
        </div>
      );
    },
  },
];
