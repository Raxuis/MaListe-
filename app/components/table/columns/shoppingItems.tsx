"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";

export type ShoppingItem = {
    id: number,
    name: string,
    created_at: string,
}

export const shoppingItems: ColumnDef<ShoppingItem>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">#</div>,
        cell: ({row}) => {
            return <p className="text-center ">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: ({row}) => {
            return <p className="text-center">{row.original.name}</p>;
        },
    },
    {
        accessorKey: "created_at",
        header: () => <div className="text-center">Created At</div>,
        cell: ({row}) => {
            return <p className="text-center">{formatDateTime(row.original.created_at).dateTime}</p>;
        },
    }
];
