import {useState, useCallback} from 'react';
import {ShoppingItemContext, type ShoppingItem} from '~/Context/ShoppingItemContext';

export function ShoppingItemProvider({children}: { children: React.ReactNode }) {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

    const fetchShoppingItems = useCallback(async (listId: number) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/${listId}/items`);
        const data = await response.json();
        setShoppingItems(data.items);
    }, []);

    const fetchShoppingItem = useCallback(async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${id}`);
        if (!response.ok) throw new Error('Failed to fetch shopping item');
        const data = await response.json();
        return data.item;
    }, []);

    const addShoppingItem = useCallback(async (item: Omit<ShoppingItem, 'id'>) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to add shopping item');
        await fetchShoppingItems(item.listId);
    }, [fetchShoppingItems]);

    const updateShoppingItem = useCallback(async (item: ShoppingItem) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...item,
                itemId: item.id,
            })
        });
        if (!response.ok) throw new Error('Failed to update shopping item');
        await fetchShoppingItems(item.listId);
    }, [fetchShoppingItems]);

    const deleteShoppingItem = useCallback(async (id: number) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shopping-lists/items/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete shopping item');
    }, []);

    const contextValue = {
        shoppingItems,
        fetchShoppingItems,
        addShoppingItem,
        updateShoppingItem,
        deleteShoppingItem,
        fetchShoppingItem
    };

    return (
        <ShoppingItemContext.Provider value={contextValue}>
            {children}
        </ShoppingItemContext.Provider>
    );
}
