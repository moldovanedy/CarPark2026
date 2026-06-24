import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";

export function CarListProvider({ children }: PropsWithChildren) {
  const [carsList, setCarsList] = useState<Car[]>([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCarList = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await getCars();
      setCarsList(result.items);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

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
