"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import UserContext, { User } from "./UserConext";
import { useState } from "react";

type RootLayout = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: RootLayout) {
  const [user, setUser] = useState<User>({
    name: 'Ronaldo',
    lastname: ' Gutierrez',
    nickname: 'Ronal2 Gtz',
    id: '1'
})

  return (
    <html lang="en">
      <head>
        <title>News</title>
      </head>
      <body suppressHydrationWarning={true}>

        <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{user, setUser}} >
          <Navbar />
          {children}
          <Toaster 
           position="bottom-right"
           reverseOrder={false}
          />
          <ReactQueryDevtools initialIsOpen={false} />
          </UserContext.Provider>

        </QueryClientProvider>
      </body>
    </html>
  );
}
