import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router";
import type {ShoppingList} from "~/components/table/columns/shoppingListsItemsColumns";
import {Button} from "~/components/ui/button";
import InfosCard from "~/components/CustomCards/InfoCard";

const Show = () => {
    const {itemId} = useParams();
    const [shoppingListItems, setShoppingListItems] = useState<ShoppingList>();
    const navigate = useNavigate();

    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${itemId}`);
        response.then((res) => res.json()).then((data) => {
            setShoppingListItems(data.item);
        });
    }, []);

    if (!shoppingListItems) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
            <InfosCard infos={{
                ...shoppingListItems,
                createdAt: shoppingListItems.created_at
            }}/>
            <Button variant="outline" className="cursor-pointer" onClick={() => {
                navigate(-1);
            }}>
                Back
            </Button>
        </div>
    );
};

export default Show;
