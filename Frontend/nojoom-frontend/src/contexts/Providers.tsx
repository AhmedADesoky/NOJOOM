'use client';

import { ApolloProvider } from '@apollo/client';
import { Cart_Provider } from '@/contexts/Cart_Context';
import { Wishlist_Provider } from '@/contexts/Wishlist_Context';
import { Auth_Provider } from '@/contexts/Auth_Context';
import { Apollo_Client } from '@/graphql/Apollo_Client';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={Apollo_Client}>
      <Auth_Provider>
        <Cart_Provider>
          <Wishlist_Provider>{children}</Wishlist_Provider>
        </Cart_Provider>
      </Auth_Provider>
    </ApolloProvider>
  );
};
