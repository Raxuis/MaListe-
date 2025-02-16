import { createContext } from 'react';

export type ShoppingList = {
  id: number;
  listId: number;
  name: string;
  description: string;
  items?: {
    id: number;
    name: string;
    is_completed: boolean;
  }[];
  created_at: string;
  is_completed?: boolean;
};

type ShoppingListContextType = {
  shoppingLists: ShoppingList[];
  currentList: ShoppingList | null;
  fetchShoppingLists: () => Promise<void>;
  fetchShoppingList: (id: number) => Promise<void>;
  addShoppingList: (list: Omit<ShoppingList, 'id' | 'created_at'>) => Promise<void>;
  updateShoppingList: (list: ShoppingList) => Promise<void>;
  deleteShoppingList: (id: number) => Promise<void>;
  toggleItemComplete: (listId: number, itemId: number, isCompleted: boolean) => Promise<void>;
};

export const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);
