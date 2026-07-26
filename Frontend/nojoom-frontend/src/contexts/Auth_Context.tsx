'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type User = {
  Id: string;
  Name: string;
  Email: string;
  Password: string;
  Phone: string;
  Created_At: string;
};

export type Order_Item = {
  Product_Id: string;
  Product_Name: string;
  Quantity: number;
  Price: number;
  Color: string;
  Size: string;
};

export type Order = {
  Id: string;
  Customer_Id: string;
  Total: number;
  Status: string;
  Payment_Method: string;
  Created_At: string;
  Items: Order_Item[];
  Delivery: {
    Full_Name: string;
    Phone: string;
    Address: string;
    City: string;
  };
};

type Auth_Context_Type = {
  User: User | null;
  Is_Loading: boolean;
  Signup: (Name: string, Email: string, Password: string, Phone: string) => { Success: boolean; Error?: string };
  Login: (Email: string, Password: string) => { Success: boolean; Error?: string };
  Logout: () => void;
  Create_Order: (Order: Omit<Order, 'Id' | 'Created_At' | 'Customer_Id' | 'Status'>) => Order;
  Get_Orders: () => Order[];
};

const USERS_KEY = 'nojoom_users';
const SESSION_KEY = 'nojoom_session';
const ORDERS_KEY = 'nojoom_orders';

const Auth_Context = createContext<Auth_Context_Type | undefined>(undefined);

const Read_Users = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const Write_Users = (Users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(Users));
};

const Read_Orders = (): Record<string, Order[]> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '{}');
  } catch {
    return {};
  }
};

const Write_Orders = (Orders: Record<string, Order[]>) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(Orders));
};

const Generate_Id = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const Auth_Provider = ({ children }: { children: React.ReactNode }) => {
  const [User, set_User] = useState<User | null>(null);
  const [Is_Loading, set_Is_Loading] = useState(true);

  useEffect(() => {
    const Session_Id = localStorage.getItem(SESSION_KEY);
    if (Session_Id) {
      const Found = Read_Users().find((U) => U.Id === Session_Id);
      if (Found) set_User(Found);
    }
    set_Is_Loading(false);
  }, []);

  const Signup = useCallback(
    (Name: string, Email: string, Password: string, Phone: string) => {
      const Users = Read_Users();
      const Normalized_Email = Email.trim().toLowerCase();

      if (Users.some((U) => U.Email === Normalized_Email)) {
        return { Success: false, Error: 'An account with this email already exists.' };
      }

      if (Password.length < 6) {
        return { Success: false, Error: 'Password must be at least 6 characters.' };
      }

      const New_User: User = {
        Id: Generate_Id(),
        Name: Name.trim(),
        Email: Normalized_Email,
        Password,
        Phone: Phone.trim(),
        Created_At: new Date().toISOString(),
      };

      Write_Users([...Users, New_User]);
      localStorage.setItem(SESSION_KEY, New_User.Id);
      set_User(New_User);
      return { Success: true };
    },
    []
  );

  const Login = useCallback((Email: string, Password: string) => {
    const Normalized_Email = Email.trim().toLowerCase();
    const Found = Read_Users().find(
      (U) => U.Email === Normalized_Email && U.Password === Password
    );

    if (!Found) {
      return { Success: false, Error: 'Invalid email or password.' };
    }

    localStorage.setItem(SESSION_KEY, Found.Id);
    set_User(Found);
    return { Success: true };
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    set_User(null);
  }, []);

  const Create_Order = useCallback(
    (Order_Data: Omit<Order, 'Id' | 'Created_At' | 'Customer_Id' | 'Status'>) => {
      const Customer_Id = User?.Id || 'guest';
      const New_Order: Order = {
        ...Order_Data,
        Id: `ORD-${Date.now().toString().slice(-8)}`,
        Customer_Id,
        Status: 'Confirmed',
        Created_At: new Date().toISOString(),
      };

      const All_Orders = Read_Orders();
      const User_Orders = All_Orders[Customer_Id] || [];
      All_Orders[Customer_Id] = [New_Order, ...User_Orders];
      Write_Orders(All_Orders);

      return New_Order;
    },
    [User]
  );

  const Get_Orders = useCallback(() => {
    if (!User) return [];
    const All_Orders = Read_Orders();
    return All_Orders[User.Id] || [];
  }, [User]);

  return (
    <Auth_Context.Provider
      value={{ User, Is_Loading, Signup, Login, Logout, Create_Order, Get_Orders }}
    >
      {children}
    </Auth_Context.Provider>
  );
};

export const use_Auth_Context = () => {
  const Context = useContext(Auth_Context);
  if (Context === undefined) {
    throw new Error('use_Auth_Context must be used within Auth_Provider');
  }
  return Context;
};
