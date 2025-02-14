import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import TableItemForm from "~/components/form/TableItemForm";
import type {ShoppingListItem} from "~/components/table/columns/shoppingListsColumns";

const Edit = () => {
    const {id: shoppingListId, itemId} = useParams();
    const [item, setItem] = useState<ShoppingListItem>();


    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${itemId}`);
        response.then((res) => res.json()).then((data) => {
            setItem(data.item);
        });
    }, [itemId]);

    if (!item || !shoppingListId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
            <h1>Edit Item</h1>
            <TableItemForm listId={parseInt(shoppingListId)} itemId={parseInt(item.id)} name={item.name}/>
        </div>
    );
};

export default Edit;
