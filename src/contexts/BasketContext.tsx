import { useState, useEffect, createContext, ReactNode } from "react";
import { basketCtrl } from "@/api";


interface BasketContextData {
  basket: any| null;
  total: number;
  addBasket: (productId: string) => void;
  deleteItem: (productId: string) => void;
  deleteAllItems: () => void;
  changeQuantityItem: (productId: string, quantity: number) => void;
}

export const BasketContext = createContext<BasketContextData>({
  basket: null,
  total: 0,
  addBasket: async () => {},
  deleteItem: () => {},
  deleteAllItems: () => {},
  changeQuantityItem: () => {},
});

interface BasketProviderProps {
  children: ReactNode;
}

export function BasketProvider({ children }: BasketProviderProps) {
  const [basket, setBasket] = useState<any>(null);
  const [total, setTotal] = useState<number>(basketCtrl.count());

  useEffect(() => {
    const response = basketCtrl.getAll();
    setBasket(response);
  }, []);

  const refreshBasket = () => {
    setTotal(basketCtrl.count());
    setBasket(basketCtrl.getAll());
  };

  const addBasket = (productId: string) => {
    basketCtrl.add(productId);
    refreshBasket();
  };

  const changeQuantityItem = (productId: string, quantity: number) => {
    basketCtrl.changeQuantity(productId, quantity);
    refreshBasket();
  };

  const deleteItem = (productId: string) => {
    basketCtrl.deleteItem(productId);
    refreshBasket();
  };

  const deleteAllItems = () => {
    basketCtrl.deleteAll();
    refreshBasket();
  };

  const data: BasketContextData = {
    basket,
    total,
    addBasket,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
