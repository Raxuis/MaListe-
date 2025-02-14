import React, {useEffect, useState} from 'react';
import TableListForm from "~/components/form/TableListForm";
import {useParams} from "react-router";
import type {ShoppingList} from "~/components/table/columns/shoppingListsItemsColumns";

const Edit = () => {
    const {id} = useParams();
    const [shoppingList, setShoppingList] = useState<ShoppingList>();

    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}`);
        response.then((res) => res.json()).then((data) => {
            console.log(data);
            setShoppingList(data.shopping_list);
        });
    }, []);

    if (!shoppingList) {
        return (
            <div>
                Loading...
            </div>
        );
    }
    return (
        <div>
            Edit
            <TableListForm description={shoppingList.description} items={shoppingList.items} name={shoppingList.name}/>
        </div>
    );
};

export default Edit;
