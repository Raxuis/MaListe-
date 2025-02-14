"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Button} from "~/components/ui/button";

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
        cell: ({row}) => {
            return <p className="text-14-medium ">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => {
            return <p className="text-14-medium">{row.original.name}</p>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => {
            return <p className="text-14-medium">{row.original.description}</p>;
        },
    },
    {
        accessorKey: "created_at",
        header: "Created at",
        cell: ({row}) => {
            return <p className="text-14-medium">{formatDateTime(row.original.created_at).dateTime}</p>;
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