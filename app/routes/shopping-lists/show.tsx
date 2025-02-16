import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router";
import type {ShoppingList} from "~/components/table/columns/shoppingListsItemsColumns";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {Calendar} from "lucide-react";

const Show = () => {
    const {id} = useParams();
    const [shoppingList, setShoppingList] = useState<ShoppingList>();
    const navigate = useNavigate();

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
                    <p className="flex gap-2 text-sm text-slate-500 items-center">
                        <Calendar className="size-5"/>
                        <span>
                            {shoppingList?.created_at}
                        </span>
                    </p>
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
            <Button variant="outline" onClick={() => {
                navigate(-1);
            }}>
                Back
            </Button>
        </div>
    );
};

export default Show;
