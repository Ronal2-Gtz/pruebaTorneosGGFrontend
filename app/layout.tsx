"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import UserContext, { User } from "./UserConext";
import { useEffect, useLayoutEffect, useState } from "react";

type RootLayout = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const initialState = {
  name: "",
  lastname: "",
  nickname: "Seleccione usuario",
  id: "",
};

export default function RootLayout({ children }: RootLayout) {
  const [user, setUser] = useState<User>(initialState);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const userLS = localStorage.getItem("user");
      const userInit = userLS ? JSON.parse(userLS) : initialState;
      setUser(userInit);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>News</title>
      </head>
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{ user, setUser }}>
            <Navbar />
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
            <ReactQueryDevtools initialIsOpen={false} />
          </UserContext.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
