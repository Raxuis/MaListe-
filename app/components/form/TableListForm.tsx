import React, { type FormEvent, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useShoppingList } from '~/hooks/useShoppingList';
import type { ShoppingList } from '~/Context/ShoppingListContext';

type Item = {
  id: number;
  name: string;
  is_completed: boolean;
};

type TableList = {
  id?: number;
  listId?: number;
  name: string;
  description: string;
  items: Item[];
};

type Props = {
  id?: number;
  name?: string;
  description?: string;
  items?: Item[];
};

const TableListForm = ({ id, name, description, items }: Props) => {
  const navigate = useNavigate();
  const { addShoppingList, updateShoppingList } = useShoppingList();
  const [tableList, setTableList] = useState<TableList>({
    id: id || undefined,
    listId: id || undefined,
    name: name || "",
    description: description || "",
    items: items || [],
  });

  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTableList({
      id: id || undefined,
      listId: id || undefined,
      name: name || "",
      description: description || "",
      items: items || [],
    });
  }, [id, name, description, items]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tableList.name) {
      setError("Please fill in the name");
      return;
    }
    setError("");

    try {
      if (tableList.id) {
        await updateShoppingList(tableList as ShoppingList);
      } else {
        await addShoppingList({
          ...tableList,
          listId: tableList.listId || Date.now()
        });
      }
      navigate("/shopping-lists");
    } catch (error) {
      setError("An error occurred");
    }
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    setTableList((prevList) => ({
      ...prevList,
      items: [
        ...prevList.items,
        {
          id: Date.now(),
          name: newItem.trim(),
          is_completed: false
        }
      ],
    }));
    setNewItem("");
  };

  const handleRemoveItem = (index: number) => {
    setTableList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <form method="POST" action="#" onSubmit={handleSubmit} className="flex flex-col w-full mx-auto space-y-4">
      <Input type="hidden" name="id" value={tableList.id} />
      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Shopping list name"
        value={tableList.name}
        onChange={(e) => setTableList((prevList) => ({ ...prevList, name: e.target.value }))}
      />

      <Textarea
        name="description"
        id="description"
        placeholder="Shopping list description"
        value={tableList.description}
        onChange={(e) => setTableList((prevList) => ({ ...prevList, description: e.target.value }))}
      />

      <div className="flex items-center gap-2">
        <Input
          type="text"
          className="flex-grow"
          placeholder="Add item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button type="button" onClick={handleAddItem} variant="outline" className="cursor-pointer">
          <PlusCircle className="w-5 h-5" />
        </Button>
      </div>

      <ul className="space-y-2">
        {tableList.items.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-2 border rounded-lg">
            {item.name}
            <Button
              variant="outline"
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash className="w-5 h-5" />
            </Button>
          </li>
        ))}
      </ul>

      {!!error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-end gap-4">
        <Button variant="destructive" onClick={() => navigate(-1)} className="cursor-pointer">
          Cancel
        </Button>
        <Button type="submit" variant="outline" className="cursor-pointer">
          {tableList.id ? "Edit" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default TableListForm;
