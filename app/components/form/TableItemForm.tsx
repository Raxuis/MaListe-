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
import type { ShoppingList } from "~/components/table/columns/shoppingListsItemsColumns";

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
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    const [tableItem, setTableItem] = useState<TableItem>({
        itemId: itemId || null,
        listId: listId || null,
        name: name || "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchShoppingLists = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`);
                const data = await response.json();
                setShoppingLists(data.shopping_lists);
            } catch (error) {
                setError("Erreur lors du chargement des listes");
            }
        };

        void fetchShoppingLists();
    }, []);

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
            setError("Veuillez remplir le nom de la liste");
            return;
        }

        if (!tableItem.listId) {
            setError("Veuillez sélectionner une liste");
            return;
        }

        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items`, {
                method: tableItem.itemId ? "PUT" : "POST",
                body: JSON.stringify(tableItem),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(shoppingLists)

            console.log('Item created/updated');
        } catch (error) {
            setError("Une erreur est survenue");
        }
    };

    return (
        <form method="POST" action="#" onSubmit={handleSubmit} className="flex flex-col w-full mx-auto space-y-4">
            {/* Only render hidden inputs if values are not null */}
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
                placeholder="Nom de la liste"
                value={tableItem.name}
                onChange={(e) => setTableItem(prev => ({ ...prev, name: e.target.value }))}
            />

            <Select
                onValueChange={(value) => setTableItem(prev => ({ ...prev, listId: parseInt(value) }))}
                value={tableItem.listId?.toString() || undefined}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a shopping List" />
                </SelectTrigger>
                <SelectContent>
                    {shoppingLists.map((list) => (
                        <SelectItem value={list.id.toString()} key={list.id}>
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
                    onClick={() => navigate("/shopping-lists")}
                >
                    Annuler
                </Button>
                <Button type="submit" variant="outline">
                    {tableItem.itemId ? "Modifier" : "Créer"}
                </Button>
            </div>
        </form>
    );
};

export default TableItemForm;