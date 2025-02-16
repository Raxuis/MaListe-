import { useContext } from "react";
import { ShoppingListContext } from "~/Context/ShoppingListContext";

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
