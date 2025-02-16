import React, { type FormEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { useShoppingList } from '~/hooks/useShoppingList';
import { useShoppingItem } from '~/hooks/useShoppingItem';
import type { ShoppingList } from "~/components/table/columns/shoppingListsItemsColumns";
import type { ShoppingItem } from '~/Context/ShoppingItemContext';

type TableItem = {
  itemId: number | null;
  listId: number | null;
  name: string;
};

type Props = {
  itemId?: number;
  listId?: number;
  name?: string;
};

const TableItemForm = ({ itemId, listId, name }: Props) => {
  const navigate = useNavigate();
  const { shoppingLists, fetchShoppingLists } = useShoppingList();
  const { addShoppingItem, updateShoppingItem } = useShoppingItem();

  const [tableItem, setTableItem] = useState<TableItem>({
    itemId: itemId || null,
    listId: listId || null,
    name: name || "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    void fetchShoppingLists();
  }, [fetchShoppingLists]);

  useEffect(() => {
    setTableItem(prev => ({
      ...prev,
      itemId: itemId || null,
      listId: listId || null,
      name: name || "",
    }));
  }, [itemId, listId, name]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tableItem.name) {
      setError("Please fill the name");
      return;
    }

    if (!tableItem.listId) {
      setError("Please select a shopping list");
      return;
    }

    setError("");

    try {
      if (tableItem.itemId) {
        console.log('Submitting item for update:', tableItem);
        await updateShoppingItem({
          id: tableItem.itemId,
          listId: tableItem.listId,
          name: tableItem.name,
          is_completed: false
        });
      } else {
        await addShoppingItem({
          listId: tableItem.listId,
          name: tableItem.name,
          is_completed: false
        });
      }
      navigate("/shopping-lists");
    } catch (error) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <form method="POST" action="#" onSubmit={handleSubmit} className="flex flex-col w-full mx-auto space-y-4">
      {tableItem.itemId && (
        <Input type="hidden" name="id" value={tableItem.itemId.toString()} />
      )}
      {tableItem.listId && (
        <Input type="hidden" name="listId" value={tableItem.listId.toString()} />
      )}

      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Item name"
        value={tableItem.name}
        onChange={(e) => setTableItem(prev => ({ ...prev, name: e.target.value }))}
      />

      <Select
        onValueChange={(value) => setTableItem(prev => ({ ...prev, listId: parseInt(value) }))}
        value={tableItem.listId?.toString() || undefined}
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select a list" />
        </SelectTrigger>
        <SelectContent>
          {shoppingLists.map((list) => (
            <SelectItem value={list.id.toString()} key={list.id} className="cursor-pointer">
              {list.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="destructive"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button type="submit" variant="outline" className="cursor-pointer">
          {tableItem.itemId ? "Edit" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default TableItemForm;
