import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";

export function AddToCartButton() {
    return (
        <Button variant="contained">
            <ShoppingCart />
            <span>Add to cart</span>
        </Button>
    );
}
