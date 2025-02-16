import { useContext } from "react";
import { ShoppingItemContext } from "~/Context/ShoppingItemContext";

export function useShoppingItem() {
  const context = useContext(ShoppingItemContext);
  if (context === undefined) {
    throw new Error('useShoppingItem must be used within a ShoppingItemProvider');
  }
  return context;
}
