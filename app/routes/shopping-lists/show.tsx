import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router";
import type { ShoppingList } from "~/components/table/columns/shoppingListsItemsColumns";
import { Button } from "~/components/ui/button";
import InfosCard from "~/components/infos/Card";

const Show = () => {
  const { id } = useParams();
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
      <InfosCard infos={{
        ...shoppingList,
        createdAt: shoppingList.created_at
      }} />
      <Button variant="outline" className="cursor-pointer" onClick={() => {
        navigate(-1);
      }}>
        Back
      </Button>
    </div>
  );
};

export default Show;
