import React, { Dispatch, SetStateAction } from "react";
import { ContextError } from "../utils/context";

const SidebarContext = React.createContext<
  | {
      openItems: number[];
      setOpenItems: Dispatch<SetStateAction<number[]>>;
      isCollapsed: boolean;
      setIsCollapsed: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new ContextError("useSidebarContext", "SidebarContext");
  }
  return context;
}
