import "./Content.css";
import { CarItem } from "../CarItem/CarItem";
import { Header } from "../Header/Header";
import { SortingButton } from "../SortAndFilter/SortingButton";
import { useCarsList } from "../../hooks/useCarsList";
import { Pagination } from "../Pagination/Pagination";
import { Grid } from "@mui/material";
import { FiltersButton } from "../SortAndFilter/FiltersButton";
import { LoaderComponent } from "../shared/LoaderComponent";
import { ErrorMessage } from "../shared/ErrorMessage";
import { NoCarsFound } from "../shared/NoCarsFound";

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

            {isLoading && <LoaderComponent />}
            {isError && <ErrorMessage />}

            {!isLoading && !isError && (
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "center", alignItems: "stretch" }}
                >
                    {carsList.length <= 0 ? (
                        <NoCarsFound />
                    ) : (
                        carsList.map((car) => (
                            <CarItem key={car.vin} car={car} />
                        ))
                    )}
                </Grid>
            )}

            <div className="actions-bar" style={{ justifyContent: "flex-end" }}>
                <Pagination />
            </div>
        </div>
    );
}
