import React, {useEffect, useState} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsItemsColumns} from "~/components/table/columns/shoppingListsItemsColumns";
import {Link, useNavigate, useParams} from "react-router";
import {buttonVariants} from "~/components/ui/button";

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
        <div className="flex flex-col gap-8">
            Elements
            <DataTable
                columns={shoppingListsItemsColumns}
                data={shoppingListsItems}
            />
            <div className="w-1/3">
                <Link to="/shopping-lists" className={buttonVariants({
                    variant: "outline",
                })}>Back to shopping lists</Link>
            </div>
        </div>
    );
};

export default Elements;
