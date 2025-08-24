"use client";

import { ConfigData, GetConfigResponse } from "@/sanity/requests";
import { createContext, useContext, ReactNode } from "react";

interface IAppContext {
    config: GetConfigResponse;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
    config: GetConfigResponse;
}

export function AppProvider({ children, config }: AppProviderProps) {
    return (
        <AppContext.Provider value={{ config }}>{children}</AppContext.Provider>
    );
}

export function useApp(): IAppContext {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
