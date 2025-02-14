import React, {useEffect, useState} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsItemsColumns} from "~/components/table/columns/shoppingListsItemsColumns";
import {useNavigate, useParams} from "react-router";

const Elements = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [shoppingListsItems, setShoppingListsItems] = useState([]);
    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}/items`);
        response.then((res) => res.json()).then((data) => {
            setShoppingListsItems(data);
            console.log(data)
        });
    }, []);
    return (
        <div>
            Elements
            <DataTable
                columns={shoppingListsItemsColumns}
                data={shoppingListsItems}
            />
        </div>
    );
};

export default Elements;
