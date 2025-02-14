import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import type {ShoppingList} from "~/components/table/columns/shoppingListsItemsColumns";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";

const Element = () => {
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
        <Card>
            <CardHeader>
                <CardTitle>
                    {shoppingList?.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{shoppingList?.description}</p>
                <p>{shoppingList?.created_at}</p>
                {
                    shoppingList?.items && (
                        <>
                            <p>Items :</p>
                            <ul>
                                {shoppingList.items.map((item) => (
                                    <li key={item.id}>- {item.name}</li>
                                ))}
                            </ul>
                        </>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default Element;
