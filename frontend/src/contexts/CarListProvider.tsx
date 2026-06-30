import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams, type SortOrder } from "../data/car";
import type { Car } from "../models/Car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";

export function CarListProvider({ children }: PropsWithChildren) {
    const [carsList, setCarsList] = useState<Car[]>([]);

    const { filters, page, limit, sort, setNumTotalPages } = useFilters();

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
