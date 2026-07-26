'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export type Wishlist_Item = {
  Product_Id: string;
  Product_Name: string;
  Price: number;
  Image_Url: string;
};

type Wishlist_Context_Type = {
  Wishlist_Items: Wishlist_Item[];
  Add_To_Wishlist: (Item: Wishlist_Item) => void;
  Remove_From_Wishlist: (Product_Id: string) => void;
  Is_In_Wishlist: (Product_Id: string) => boolean;
};

const Wishlist_Context = createContext<Wishlist_Context_Type | undefined>(undefined);

export const Wishlist_Provider = ({ children }: { children: React.ReactNode }) => {
  const [Wishlist_Items, set_Wishlist_Items] = useState<Wishlist_Item[]>([]);

  const Add_To_Wishlist = useCallback((Item: Wishlist_Item) => {
    set_Wishlist_Items((prev) => {
      const Exists = prev.some((i) => i.Product_Id === Item.Product_Id);
      if (Exists) return prev;
      return [...prev, Item];
    });
  }, []);

  const Remove_From_Wishlist = useCallback((Product_Id: string) => {
    set_Wishlist_Items((prev) => prev.filter((item) => item.Product_Id !== Product_Id));
  }, []);

  const Is_In_Wishlist = useCallback(
    (Product_Id: string) => Wishlist_Items.some((item) => item.Product_Id === Product_Id),
    [Wishlist_Items]
  );

  return (
    <Wishlist_Context.Provider
      value={{
        Wishlist_Items,
        Add_To_Wishlist,
        Remove_From_Wishlist,
        Is_In_Wishlist,
      }}
    >
      {children}
    </Wishlist_Context.Provider>
  );
};

export const use_Wishlist_Context = () => {
  const Context = useContext(Wishlist_Context);
  if (Context === undefined) {
    throw new Error('use_Wishlist_Context must be used within Wishlist_Provider');
  }
  return Context;
};
