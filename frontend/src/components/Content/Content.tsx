import "./Content.css";
import { CarItem } from "../CarItem/CarItem";
import { Header } from "../Header/Header";
import { SortingButton } from "../SortAndFilter/SortingButton";
import { useCarsList } from "../../hooks/useCarsList";
import { Pagination } from "../Pagination/Pagination";
import { Grid } from "@mui/material";
import { FiltersButton } from "../SortAndFilter/FiltersButton";

export function Content() {
    const { carsList, isLoading, isError } = useCarsList();

    return (
        <div className="content">
            <Header />

            <div className="actions-bar">
                <div className="filter-and-sort">
                    <FiltersButton />
                    <SortingButton />
                </div>

                <Pagination />
            </div>

            {isLoading && <p>Data is loading...</p>}
            {isError && <p>Something went wrong</p>}

            {!isLoading && !isError && (
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "center", alignItems: "stretch" }}
                >
                    {carsList.map((car) => (
                        <CarItem key={car.vin} car={car} />
                    ))}
                </Grid>
            )}

            <div className="actions-bar" style={{ justifyContent: "flex-end" }}>
                <Pagination />
            </div>
        </div>
    );
}
