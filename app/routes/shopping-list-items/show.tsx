import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router";
import { ShoppingItemContext } from '~/Context/ShoppingItemContext';
import type { ShoppingList } from "~/components/table/columns/shoppingListsItemsColumns";
import { Button } from "~/components/ui/button";
import InfosCard from "~/components/CustomCards/InfoCard";

const Show = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { fetchShoppingItem } = useContext(ShoppingItemContext) || {};
  const [shoppingListItems, setShoppingListItems] = useState<ShoppingList | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId || !fetchShoppingItem) return;
      try {
        const itemData = await fetchShoppingItem(parseInt(itemId));

        const shoppingListData: ShoppingList = {
          id: itemData.id,
          name: itemData.name,
          description: "",
          created_at: itemData.created_at || "",
          is_completed: itemData.is_completed,
        };

        setShoppingListItems(shoppingListData);
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    fetchItem();
  }, [itemId, fetchShoppingItem]);

  if (!shoppingListItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
      <InfosCard infos={{
        ...shoppingListItems,
        createdAt: shoppingListItems.created_at
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
