'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export type Cart_Item = {
  Product_Id: string;
  Product_Name: string;
  Price: number;
  Image_Url: string;
  Color: string;
  Size: string;
  Quantity: number;
};

type Cart_Context_Type = {
  Cart_Items: Cart_Item[];
  Cart_Total: number;
  Cart_Count: number;
  Add_To_Cart: (Item: Cart_Item) => void;
  Remove_From_Cart: (Product_Id: string) => void;
  Update_Quantity: (Product_Id: string, Quantity: number) => void;
  Clear_Cart: () => void;
};

const Cart_Context = createContext<Cart_Context_Type | undefined>(undefined);

export const Cart_Provider = ({ children }: { children: React.ReactNode }) => {
  const [Cart_Items, set_Cart_Items] = useState<Cart_Item[]>([]);

  const Cart_Total = Cart_Items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  const Cart_Count = Cart_Items.reduce((sum, item) => sum + item.Quantity, 0);

  const Add_To_Cart = useCallback((Item: Cart_Item) => {
    set_Cart_Items((prev) => {
      const Existing_Item = prev.find(
        (i) => i.Product_Id === Item.Product_Id && i.Color === Item.Color && i.Size === Item.Size
      );

      if (Existing_Item) {
        return prev.map((i) =>
          i === Existing_Item ? { ...i, Quantity: i.Quantity + Item.Quantity } : i
        );
      }

      return [...prev, Item];
    });
  }, []);

  const Remove_From_Cart = useCallback((Product_Id: string) => {
    set_Cart_Items((prev) => prev.filter((item) => item.Product_Id !== Product_Id));
  }, []);

  const Update_Quantity = useCallback((Product_Id: string, Quantity: number) => {
    set_Cart_Items((prev) =>
      prev.map((item) => (item.Product_Id === Product_Id ? { ...item, Quantity } : item))
    );
  }, []);

  const Clear_Cart = useCallback(() => {
    set_Cart_Items([]);
  }, []);

  return (
    <Cart_Context.Provider
      value={{
        Cart_Items,
        Cart_Total,
        Cart_Count,
        Add_To_Cart,
        Remove_From_Cart,
        Update_Quantity,
        Clear_Cart,
      }}
    >
      {children}
    </Cart_Context.Provider>
  );
};

export const use_Cart_Context = () => {
  const Context = useContext(Cart_Context);
  if (Context === undefined) {
    throw new Error('use_Cart_Context must be used within Cart_Provider');
  }
  return Context;
};
