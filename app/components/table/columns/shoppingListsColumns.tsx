"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Button, buttonVariants} from "~/components/ui/button";
import {Link} from "react-router";
import {InfoIcon, Pen, ShoppingCart, Trash} from "lucide-react";
import ActionTooltip from "~/components/table/ActionTooltip";
import {toast} from "sonner";

export type ShoppingListItem = {
    id: string;
    name: string;
    created_at: string;
}

export const shoppingListsColumns = (refreshData: () => Promise<void>): ColumnDef<ShoppingListItem>[] => [
    {
        accessorKey: "id",
        header: () => <div className="text-center">#</div>,
        cell: ({row}) => {
            return <p className="text-center">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: ({row}) => {
            const shoppingListItem = row.original;
            return <p className="text-center ">{shoppingListItem.name}</p>;
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-center">Created At</div>,
        cell: ({row}) => {
            const shoppingListItem = row.original;
            return <p className="text-center">{formatDateTime(shoppingListItem.created_at).dateTime}</p>;
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) => {
            const shoppingList = row.original;

            const handleDelete = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${shoppingList.id}`,
                        {method: 'DELETE'}
                    );

                    if (!response.ok) {
                        throw new Error('Failed to delete shopping list');
                    }

                    toast.success("Shopping list deleted successfully");
                    await refreshData();
                } catch (error) {
                    toast.error("Failed to delete shopping list");
                }
            };

            return (
                <div className="flex gap-1 justify-center items-center">
                    <ActionTooltip tooltipContent="Edit">
                        <Link
                            to={`/shopping-lists/${shoppingList.id}/edit`}
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon"
                            })}
                        >
                            <Pen/>
                        </Link>
                    </ActionTooltip>
                    <ActionTooltip tooltipContent="Show More">
                        <Link
                            to={`/shopping-lists/${shoppingList.id}`}
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon"
                            })}
                        >
                            <InfoIcon/>
                        </Link>
                    </ActionTooltip>

                    <ActionTooltip tooltipContent="Items">
                        <Link
                            to={`/shopping-lists/${shoppingList.id}/items`}
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon"
                            })}
                        >
                            <ShoppingCart/>
                        </Link>
                    </ActionTooltip>

                    <ActionTooltip tooltipContent="Delete">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleDelete}
                            className="cursor-pointer"
                        >
                            <Trash/>
                        </Button>
                    </ActionTooltip>
                </div>
            );
        },
    },
];
