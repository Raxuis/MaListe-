import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import TableItemForm from "~/components/form/TableItemForm";
import type { ShoppingListItem } from "~/components/table/columns/shoppingListsColumns";
import EditCard from "~/components/CustomCards/EditCard";
import { useShoppingItem } from '~/hooks/useShoppingItem';

const Edit = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState<ShoppingListItem>();
  const { fetchShoppingItem } = useShoppingItem();

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;
      try {
        const itemData = await fetchShoppingItem(parseInt(itemId));
        setItem(itemData as unknown as ShoppingListItem);
      } catch (error) {
        console.error("Failed to fetch item", error);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId, fetchShoppingItem]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <EditCard title={`Edit Item : ${item.name}`}>
      <TableItemForm listId={parseInt(item.listId)} itemId={parseInt(item.id)} name={item.name} />
    </EditCard>
  );
};

export default Edit;
