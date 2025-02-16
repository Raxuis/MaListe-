"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Link} from "react-router";
import {buttonVariants} from "~/components/ui/button";
import {InfoIcon} from "lucide-react";
import ActionTooltip from "~/components/table/ActionTooltip";

export type ShoppingItem = {
    id: number,
    name: string,
    created_at: string,
    shopping_list_name: string,
}

export const shoppingItemsColumns: ColumnDef<ShoppingItem>[] = [
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
        accessorKey: "shopping_list_name",
        header: () => <div className="text-center">Shopping List</div>,
        cell: ({row}) => {
            return <p className="text-center">{row.original.shopping_list_name || "No List"}</p>;
        },
    },
    {
        accessorKey: "created_at",
        header: () => <div className="text-center">Created At</div>,
        cell: ({row}) => {
            return <p className="text-center">{formatDateTime(row.original.created_at).dateTime}</p>;
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) => {
            const item = row.original;
            return (
                <div className="flex justify-center">
                    <ActionTooltip tooltipContent="Show more">
                        <Link
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon"
                            })}
                            to={`/shopping-lists/items/${item.id}`}
                        >
                            <InfoIcon/>
                        </Link>
                    </ActionTooltip>
                </div>
            );
        },
    }
];
