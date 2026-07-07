import { IconButton } from "@mui/material";
import { useFavorites } from "../../hooks/useFavorites";
import type { Car } from "../../models/Car";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export function ToggleFavoriteButton(props: { car: Car }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <IconButton onClick={() => toggleFavorite(props.car)}>
            {isFavorite(props.car) ? (
                <Favorite color="error" />
            ) : (
                <FavoriteBorder color="error" />
            )}
        </IconButton>
    );
}
