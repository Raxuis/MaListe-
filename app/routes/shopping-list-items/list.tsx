import React, {useEffect, useState} from 'react';
import {DataTable} from "~/components/table/DataTable";
import {shoppingListsItemsColumns} from "~/components/table/columns/shoppingListsItemsColumns";
import {Link, useParams, useNavigate} from "react-router";
import {Button, buttonVariants} from "~/components/ui/button";
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Shopping Lists Items"},
        {name: "description", content: "Shopping Lists Items list."},
    ];
}

const List = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [shoppingListsItems, setShoppingListsItems] = useState([]);
    const [shoppingListName, setShoppingListName] = useState("");
    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}/items`);
        response.then((res) => res.json()).then((data) => {
            setShoppingListsItems(data.items);
            setShoppingListName(data.list_name);
        });
    }, []);
    return (
        <div className="flex flex-col gap-8">
            <p>
                Shopping Lists Items {
                shoppingListName && (
                    <span>
                        for {' '}
                        <span className="font-bold">{shoppingListName}</span>
                    </span>
                )
            }
            </p>
            <DataTable
                columns={shoppingListsItemsColumns}
                data={shoppingListsItems}
            />
            <div className="flex justify-between">
                <div className="w-1/3">
                    <Button className="cursor-pointer" variant="outline" onClick={() => {
                        navigate(-1);
                    }}>
                        Back to shopping lists
                    </Button>
                </div>
                <div className="w-1/3 flex justify-end">
                    <Link to={`/shopping-lists/items/add`} className={buttonVariants({
                        variant: "outline",
                    })}>
                        Add
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default List;
