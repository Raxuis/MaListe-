"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {formatDateTime} from "~/utils";
import {Link} from "react-router";
import {useParams} from "react-router";
import {InfoIcon, Pen, Trash} from "lucide-react";
import {Button, buttonVariants} from "~/components/ui/button";
import ActionTooltip from "~/components/table/ActionTooltip";
import {toast} from "sonner";

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

export const shoppingListsItemsColumns = (refreshData: () => Promise<void>): ColumnDef<ShoppingList>[] => [
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
            const item = row.original;
            const params = useParams();
            const shoppingListId = params.id;

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
                <div className="flex gap-1">
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
                            to={`/shopping-lists/${shoppingListId}/items/${item.id}/edit`}
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
