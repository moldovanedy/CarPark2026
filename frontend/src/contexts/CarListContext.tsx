import { createContext } from "react";
import type { Car } from "../models/Car";

type CarListContextType = {
    carsList: Car[];
    isError: boolean;
    isLoading: boolean;
};

export const CarListContext = createContext<CarListContextType | undefined>(
    undefined,
);
