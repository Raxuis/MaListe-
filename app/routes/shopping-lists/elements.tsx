import React, {useEffect, useState} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsColumns} from "~/components/table/columns/shoppingListsColumns";
import {Button} from "~/components/ui/button";
import {useNavigate} from "react-router";

const Elements = () => {
    const navigate = useNavigate();
    const [shoppingLists, setShoppingLists] = useState([]);
    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`);
        response.then((res) => res.json()).then((data) => {
            setShoppingLists(data.shopping_lists);
        });
    }, []);

    return (
        <div className="flex flex-col gap-4">
            Elements
            <DataTable
                columns={shoppingListsColumns}
                data={shoppingLists}
            />
            <Button className="inline-block cursor-pointer w-1/3" onClick={() => {
                navigate('/shopping-lists/add');
            }}>
                Add Shopping List
            </Button>
        </div>
    );
};

export default Elements;
