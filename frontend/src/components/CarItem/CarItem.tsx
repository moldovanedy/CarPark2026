import type { Car } from "../../models/Car";
import "./CarItem.css";
import { IMG_BASE_URL } from "../../data/constants";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { CarDetailsDialog } from "../CarDetailsDialog/CarDetailsDialog";
import { formatNumber } from "../../utils/NumberFormatter";

type Props = {
    car: Car;
};

export function CarItem({ car }: Props) {
    const [isDetailsDialogOpened, setIsDetailsDialogOpened] = useState(false);

    return (
        <Grid>
            <Card
                onClick={() => setIsDetailsDialogOpened(true)}
                variant="elevation"
                className="card"
            >
                <div style={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        className="carImage"
                        src={`${IMG_BASE_URL}/${car.image}`}
                    />

                    {/* <div className="card__favorite-button-wrapper">
                        <ToggleFavoriteButton car={car} />
                    </div> */}
                </div>

                <CardContent className="card__content">
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                        {car.manufacturer} {car.model} {car.constructionYear}
                    </Typography>

                    <Typography sx={{ marginBottom: 1 }}>
                        {car.fuelType} &#x2022; {formatNumber(car.mileage)} km
                        &#x2022;{" "}
                        {car.engineSize != 0 ? (
                            <>{formatNumber(car.engineSize)} cm3 &#x2022;</>
                        ) : (
                            <></>
                        )}{" "}
                        {car.power} HP
                    </Typography>

                    <div style={{ flexGrow: 1 }}></div>

                    <div className="row" style={{ justifyContent: "flex-end" }}>
                        <Typography className="price">
                            {formatNumber(car.price)} EUR
                        </Typography>

                        <div style={{ flexGrow: 1 }}></div>

                        {/* <AddToCartButton /> */}
                    </div>
                </CardContent>
            </Card>

            <CarDetailsDialog
                car={car}
                isModalOpened={isDetailsDialogOpened}
                setIsModalOpened={setIsDetailsDialogOpened}
            />
        </Grid>
    );
}
