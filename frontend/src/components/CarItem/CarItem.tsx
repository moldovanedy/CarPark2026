import type { Car } from "../../models/car";
import "./CarItem.css";
import { useFavorites } from "../../hooks/useFavorites";
import { IMG_BASE_URL } from "../../data/constants";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { ShoppingCart } from "@mui/icons-material";

type Props = {
    car: Car;
};

export function CarItem({ car }: Props) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <Grid>
            <Card variant="elevation" className="card">
                <div style={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        className="carImage"
                        src={`${IMG_BASE_URL}/${car.image}`}
                    />

                    <div className="card__favorite-button-wrapper">
                        <IconButton onClick={() => toggleFavorite(car)}>
                            {isFavorite(car) ? (
                                <Favorite color="error" />
                            ) : (
                                <FavoriteBorder color="error" />
                            )}
                        </IconButton>
                    </div>
                </div>

                <CardContent className="card__content">
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                        {car.manufacturer} {car.model} {car.constructionYear}
                    </Typography>

                    <Typography sx={{ marginBottom: 1 }}>
                        {car.fuelType} &#x2022; {car.mileage} km &#x2022;{" "}
                        {car.engineSize != 0 ? (
                            <>{car.engineSize} cm3 &#x2022;</>
                        ) : (
                            <></>
                        )}{" "}
                        {car.power} HP
                    </Typography>

                    <div style={{ flexGrow: 1 }}></div>

                    <div className="row" style={{ justifyContent: "flex-end" }}>
                        <Typography className="price">
                            {car.price} EUR
                        </Typography>

                        <div style={{ flexGrow: 1 }}></div>

                        <Button variant="contained">
                            <ShoppingCart />
                            <span>Add to cart</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}
