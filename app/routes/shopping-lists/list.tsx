import React, {useEffect} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsColumns, type ShoppingListItem} from "~/components/table/columns/shoppingListsColumns";
import {Button} from "~/components/ui/button";
import {useNavigate} from "react-router";
import {useShoppingList} from '~/hooks/useShoppingList';
import {type Route} from "../../../.react-router/types/app/+types/root";
import {PlusIcon} from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Shopping Lists"},
        {name: "description", content: "Shopping lists."},
    ];
}

const List = () => {
    const navigate = useNavigate();
    const {shoppingLists, fetchShoppingLists} = useShoppingList();

    useEffect(() => {
        void fetchShoppingLists();
    }, [fetchShoppingLists]);

    return (
        <div className="flex flex-col gap-4">
            Shopping Lists
            <DataTable
                columns={shoppingListsColumns(fetchShoppingLists)}
                data={shoppingLists as unknown as ShoppingListItem[]}
            />
            <Button
                effect="expandIcon"
                icon={PlusIcon} className="cursor-pointer w-1/3 mx-auto"
                iconPlacement="right"
                onClick={() => {
                    navigate('/shopping-lists/add');
                }}
            >
                Add Shopping List
            </Button>
        </div>
    );
};

export default List;
