import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router";
import type {ShoppingList} from "~/components/table/columns/shoppingListsItemsColumns";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {buttonVariants} from "~/components/ui/button";

const Show = () => {
    const {id} = useParams();
    const [shoppingList, setShoppingList] = useState<ShoppingList>();

    useEffect(() => {
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}`);
        response.then((res) => res.json()).then((data) => {
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
        <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {shoppingList?.name}
                    </CardTitle>
                    <CardDescription>
                        <p className="text-sm text-slate-500">{shoppingList?.description}</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{shoppingList?.created_at}</p>
                    {
                        (shoppingList?.items && shoppingList?.items.length > 0) && (
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
            <Link to="/shopping-lists" className={buttonVariants({
                variant: "outline",
            })}>Back to shopping lists</Link>
        </div>
    );
};

export default Show;
