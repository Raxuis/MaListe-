import React, {useEffect, useState} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {useNavigate} from "react-router";
import {Button} from "~/components/ui/button";
import {shoppingItemsColumns} from "~/components/table/columns/shoppingItemsColumns";
import type {Route} from "../../../.react-router/types/app/routes/+types/home";
import {PlusIcon} from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Shopping Items"},
        {name: "description", content: "Shopping items list."},
    ];
}

const List = () => {
    const navigate = useNavigate();
    const [shoppingListsItems, setShoppingListsItems] = useState([]);
    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items`);
        response.then((res) => res.json()).then((data) => {
            setShoppingListsItems(data.items);
        });
    }, []);
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <p>Shopping Lists Items</p>
                <p className="text-sm text-slate-500">You can
                    <span className="font-bold"> edit </span>
                    or
                    <span className="font-bold"> delete </span>
                    the items
                    in the shopping list items pages.</p>
            </div>
            <DataTable
                columns={shoppingItemsColumns}
                data={shoppingListsItems}
            />
            <Button
                effect="expandIcon"
                icon={PlusIcon}
                iconPlacement="right"
                className="cursor-pointer w-1/3 mx-auto" onClick={() => {
                navigate('/shopping-lists/items/add');
            }}
            >
                Add Shopping Item
            </Button>
        </div>
    );
};

export default List;
