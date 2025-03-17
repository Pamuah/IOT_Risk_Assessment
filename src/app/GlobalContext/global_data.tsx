"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type globalContextType = {
  data: number[];
  setData: (value: number[]) => void;
};

const globalContext = createContext<globalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<number[]>([]);
  return (
    <globalContext.Provider value={{ data, setData }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
