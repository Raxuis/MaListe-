"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Button} from "~/components/ui/button";

type ShoppingListItem = {
    id: string;
    name: string;
    createdAt: string;
}

export const shoppingListsColumns: ColumnDef<ShoppingListItem>[] = [
    {
        header: "#",
        cell: ({row}) => {
            return <p className="text-14-medium ">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => {
            const shoppingListItem = row.original;
            return <p className="text-14-medium ">{shoppingListItem.name}</p>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({row}) => {
            const shoppingListItem = row.original;
            return <p className="text-14-medium ">{formatDateTime(shoppingListItem.createdAt).dateTime}</p>;
        },
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({row}) => {
            const shoppingList = row.original;

            return (
                <div className="flex gap-1">
                    <Button
                        className="btn btn-sm btn-outline btn-square"
                        onClick={() => {
                            console.log("Edit shopping list", shoppingList);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className="btn btn-sm btn-outline btn-square"
                        onClick={() => {
                            console.log("Delete shopping list", shoppingList);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            );
        },
    },
];