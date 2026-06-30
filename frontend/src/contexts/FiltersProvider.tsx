import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { Filters, FiltersContextType } from "./FiltersContext";
import { FiltersContext } from "./FiltersContext";

const defaultFilters: Filters = {};

export function FiltersProvider({ children }: PropsWithChildren) {
    const [page, setPage] = useState<number>(1);

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [numTotalPages, setNumTotalPages] = useState<number>(1);
    const [limit, setLimit] = useState<number>(50);
    const [sort, setSort] = useState<string>("default|asc");

    const resetFilters = () => setFilters(defaultFilters);

    const context: FiltersContextType = {
        filters,
        setFilters,
        resetFilters,

        page,
        setPage,
        numTotalPages,
        setNumTotalPages,
        limit,
        setLimit,

        sort,
        setSort,

        showFavoritesOnly: false,
        handleFavoritesToggle: () => {},
    };

    return (
        <FiltersContext.Provider value={context}>
            {children}
        </FiltersContext.Provider>
    );
}
