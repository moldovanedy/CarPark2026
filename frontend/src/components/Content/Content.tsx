import "./Content.css";
import { CarItem } from "../CarItem/CarItem";
import { useFilters } from "../../hooks/useFilters";
import { Header } from "../Header/Header";
import { SortingPanel } from "../SortingPanel/SortingPanel";
import { useCarsList } from "../../hooks/useCarsList";
import { Pagination } from "../Pagination/Pagination";
import { Grid } from "@mui/material";

export function Content() {
    const { filters } = useFilters();
    const { carsList, isLoading, isError } = useCarsList();

    const filteredCarsList = carsList.filter((car) => {
        const filteredManufacturer =
            filters.manufacturer === "" ||
            car.manufacturer
                .toLowerCase()
                .includes(filters.manufacturer.toLowerCase());

        return filteredManufacturer;
    });

    return (
        <div className="content">
            <Header />

            <SortingPanel />

            {isLoading && <p>Data is loading...</p>}
            {isError && <p>Something went wrong</p>}

            {!isLoading && !isError && (
                <>
                    <div className="filter-and-sort">
                        <Pagination />
                    </div>

                    <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: "center", alignItems: "stretch" }}
                    >
                        {filteredCarsList.map((car) => (
                            <CarItem key={car.vin} car={car} />
                        ))}
                    </Grid>

                    <div className="filter-and-sort">
                        <Pagination />
                    </div>
                </>
            )}
        </div>
    );
}
