import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";

export function CarListProvider({ children }: PropsWithChildren) {
    const [carsList, setCarsList] = useState<Car[]>([]);

    const { filters, page, limit, setNumTotalPages } = useFilters();

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getCarList = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const carParams: GetCarsParams = {
                filters: filters,
                page,
                limit,
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
    }, [page, limit]);

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
