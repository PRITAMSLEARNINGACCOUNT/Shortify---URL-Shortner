"use client";
import { UserInterface } from "@/lib/Interfaces";
import { createContext } from "react";
interface ContextType {
  User: UserInterface | null;
}
const Context = createContext<ContextType>({ User: null });
export default Context;
