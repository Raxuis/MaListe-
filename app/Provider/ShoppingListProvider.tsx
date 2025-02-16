import {type ReactNode, useCallback, useState} from "react";
import {ShoppingListContext, type ShoppingList} from "~/Context/ShoppingListContext";

export function ShoppingListProvider({children}: { children: ReactNode }) {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [currentList, setCurrentList] = useState<ShoppingList | null>(null);

    const fetchShoppingLists = useCallback(async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`);
        const data = await response.json();
        setShoppingLists(data.shopping_lists);
    }, []);

    const fetchShoppingList = useCallback(async (id: number): Promise<ShoppingList> => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}`);
        const data = await response.json();
        setCurrentList(data.shopping_list);
        return data.shopping_list;
    }, []);

    const addShoppingList = useCallback(async (list: Omit<ShoppingList, 'id' | 'created_at'>) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(list)
        });
        if (!response.ok) throw new Error('Failed to add shopping list');
        await fetchShoppingLists();
    }, [fetchShoppingLists]);

    const updateShoppingList = useCallback(async (list: ShoppingList) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(list)
        });
        if (!response.ok) throw new Error('Failed to update shopping list');
        await fetchShoppingLists();
    }, [fetchShoppingLists]);

    const deleteShoppingList = useCallback(async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete shopping list');
        await fetchShoppingLists();
    }, [fetchShoppingLists]);

    const toggleItemComplete = useCallback(async (listId: number, itemId: number, isCompleted: boolean) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${itemId}/toggle`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_completed: isCompleted})
        });
        if (!response.ok) throw new Error('Failed to toggle item');
        await fetchShoppingList(listId);
    }, [fetchShoppingList]);

    const contextValue = {
        shoppingLists,
        currentList,
        fetchShoppingLists,
        fetchShoppingList,
        addShoppingList,
        updateShoppingList,
        deleteShoppingList,
        toggleItemComplete,
        setCurrentList
    };

    return (
        <ShoppingListContext.Provider value={contextValue}>
            {children}
        </ShoppingListContext.Provider>
    );
}
