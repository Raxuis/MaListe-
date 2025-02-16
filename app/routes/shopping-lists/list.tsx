import React, { useEffect, useState } from 'react';
import { DataTable } from "~/components/table/DataTable";
import { shoppingListsColumns } from "~/components/table/columns/shoppingListsColumns";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Shopping Lists" },
    { name: "description", content: "Shopping lists." },
  ];
}

const List = () => {
  const navigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState([]);

  const fetchShoppingLists = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`);
    const data = await response.json();
    setShoppingLists(data.shopping_lists);
  };

  useEffect(() => {
    void fetchShoppingLists();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      Shopping Lists
      <DataTable
        columns={shoppingListsColumns(fetchShoppingLists)}
        data={shoppingLists}
      />
      <Button className="inline-block cursor-pointer w-1/3 mx-auto" onClick={() => {
        navigate('/shopping-lists/add');
      }}>
        Add Shopping List
      </Button>
    </div>
  );
};

export default List;
