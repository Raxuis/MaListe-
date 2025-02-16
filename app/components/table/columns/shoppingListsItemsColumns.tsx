"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Link} from "react-router";
import {InfoIcon, Pen, Trash} from "lucide-react";
import {Button, buttonVariants} from "~/components/ui/button";
import ActionTooltip from "~/components/table/ActionTooltip";
import {toast} from "sonner";
import TableBadge from "~/components/table/Badge/BadgeValid";

export type ShoppingList = {
    id: number,
    name: string,
    description: string,
    created_at: string,
    is_completed: boolean,
}

export const shoppingListsItemsColumns = (refreshData: () => Promise<void>): ColumnDef<ShoppingList>[] => [
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
        accessorKey: "is_completed",
        header: () => <div className="text-center">Completed</div>,
        cell: ({row}) => {
            const isCompleted = row.original.is_completed;
            return (
                <p className="text-center">
                    <TableBadge completed={isCompleted}/>
                </p>
            );
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
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) => {
            const item = row.original;

            const handleDelete = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${item.id}`,
                        {method: 'DELETE'}
                    );

                    if (!response.ok) {
                        throw new Error('Failed to delete item');
                    }

                    toast.success("Item deleted successfully");
                    await refreshData();
                } catch (error) {
                    toast.error("Failed to delete item");
                }
            };

            return (
                <div className="flex gap-1 justify-center">
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
                    <ActionTooltip tooltipContent="Edit">
                        <Link
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon"
                            })}
                            to={`/shopping-lists/items/${item.id}/edit`}
                        >
                            <Pen/>
                        </Link>
                    </ActionTooltip>
                    <ActionTooltip tooltipContent="Delete">
                        <Button
                            onClick={handleDelete}
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                        >
                            <Trash/>
                        </Button>
                    </ActionTooltip>
                </div>
            );
        },
    },
];
