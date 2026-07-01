import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams, type SortOrder } from "../data/car";
import type { Car } from "../models/Car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";
import type { Filters } from "./FiltersContext";

/**
 * Will swap the min and max of the relevant values if needed, in order to get correct results.
 * @param filters
 * @returns True if at least one filter was changed, false otherwise.
 */
function cleanupFilters(filters: Filters): boolean {
    let wasChanged = false;
    if (
        filters.minPrice !== undefined &&
        filters.maxPrice !== undefined &&
        filters.minPrice > filters.maxPrice
    ) {
        let temp = filters.maxPrice;
        filters.maxPrice = filters.minPrice;
        filters.minPrice = temp;
        wasChanged = true;
    }

    if (
        filters.minMileage !== undefined &&
        filters.maxMileage !== undefined &&
        filters.minMileage > filters.maxMileage
    ) {
        let temp = filters.maxMileage;
        filters.maxMileage = filters.minMileage;
        filters.minMileage = temp;
        wasChanged = true;
    }

    if (
        filters.minConstructionYear !== undefined &&
        filters.maxConstructionYear !== undefined &&
        filters.minConstructionYear > filters.maxConstructionYear
    ) {
        let temp = filters.maxConstructionYear;
        filters.maxConstructionYear = filters.minConstructionYear;
        filters.minConstructionYear = temp;
        wasChanged = true;
    }

    if (
        filters.minEngineSize !== undefined &&
        filters.maxEngineSize !== undefined &&
        filters.minEngineSize > filters.maxEngineSize
    ) {
        let temp = filters.maxEngineSize;
        filters.maxEngineSize = filters.minEngineSize;
        filters.minEngineSize = temp;
        wasChanged = true;
    }

    return wasChanged;
}

export function CarListProvider({ children }: PropsWithChildren) {
    const [carsList, setCarsList] = useState<Car[]>([]);

    const { filters, page, limit, sort, setNumTotalPages, setFilters } =
        useFilters();

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getCarList = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            let sortKey =
                sort === ""
                    ? undefined
                    : (sort.substring(0, sort.lastIndexOf("|")) as keyof Car);
            let orderKey =
                sort === ""
                    ? undefined
                    : (sort.substring(sort.lastIndexOf("|") + 1) as SortOrder);

            const carParams: GetCarsParams = {
                filters,
                page,
                limit,
                sort: sortKey,
                order: orderKey,
            };

            let wasChanged = cleanupFilters(filters);
            if (wasChanged) {
                setFilters(filters);
            }

            const result = await getCars(carParams);
            setNumTotalPages(result.totalPages);
            setCarsList(result.items);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCarList();
    }, [page, limit, sort, filters]);

    const context = {
        carsList,
        isError,
        isLoading,
    };

    return (
        <CarListContext.Provider value={context}>
            {children}
        </CarListContext.Provider>
    );
}
