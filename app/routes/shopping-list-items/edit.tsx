import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import TableItemForm from "~/components/form/TableItemForm";
import type {ShoppingListItem} from "~/components/table/columns/shoppingListsColumns";
import EditCard from "~/components/CustomCards/EditCard";

const Edit = () => {
    const {itemId} = useParams();
    const [item, setItem] = useState<ShoppingListItem>();


    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${itemId}`);
        response.then((res) => res.json()).then((data) => {
            setItem(data.item);
            console.log(data.item)
        });
    }, [itemId]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <EditCard title={`Edit Item : ${item.name}`}>
            <TableItemForm listId={parseInt(item.listId)} itemId={parseInt(item.id)} name={item.name}/>
        </EditCard>
    );
};

export default Edit;
