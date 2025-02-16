import {createContext} from 'react';

export type ShoppingItem = {
    id: number;
    listId: number;
    name: string;
    is_completed: boolean;
    created_at?: string;
    description?: string;
};

type ShoppingItemContextType = {
    shoppingItems: ShoppingItem[];
    fetchShoppingItems: (listId: number) => Promise<void>;
    fetchShoppingItem: (id: number) => Promise<ShoppingItem>;
    addShoppingItem: (item: Omit<ShoppingItem, 'id'>) => Promise<void>;
    updateShoppingItem: (item: ShoppingItem) => Promise<void>;
    deleteShoppingItem: (id: number) => Promise<void>;
};

export const ShoppingItemContext = createContext<ShoppingItemContextType | undefined>(undefined);
