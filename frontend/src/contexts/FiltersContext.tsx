import { createContext, type Dispatch, type SetStateAction } from "react";

export type FilterFuelType = "Petrol" | "Diesel" | "Electric";
export type FilterGearboxType = "Manual" | "Automatic";

export type Filters = {
    manufacturers?: string[];
    minPrice?: number;
    maxPrice?: number;
    minMileage?: number;
    maxMileage?: number;
    minConstructionYear?: number;
    maxConstructionYear?: number;
    minEngineSize?: number;
    maxEngineSize?: number;
    fuelTypes?: FilterFuelType[];
    gearboxes?: FilterGearboxType[];
};

export type FiltersContextType = {
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    resetFilters: () => void;

    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    numTotalPages: number;
    setNumTotalPages: Dispatch<SetStateAction<number>>;
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;

    sort: string;
    setSort: Dispatch<SetStateAction<string>>;

    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;
};

export const FiltersContext = createContext<FiltersContextType | undefined>(
    undefined,
);
