import { Badge, IconButton, TextField } from "@mui/material";
import { useFilters } from "../../hooks/useFilters";
import "./Header.css";
import { ThemeSelector } from "./ThemeSelector";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Favorite from "@mui/icons-material/Favorite";

export function Header() {
    const { filters, updateFilter } = useFilters();

    return (
        <div className="filtersPanel">
            <h3>CarPark</h3>

            <TextField
                label="Search cars"
                variant="outlined"
                size="small"
                value={filters.manufacturer}
                onChange={(e) => updateFilter("manufacturer", e.target.value)}
                sx={{ flexGrow: 1 }}
            />

            <div style={{ width: 3 }}></div>

            <IconButton>
                <Favorite />
            </IconButton>

            <IconButton>
                {/* TODO: dynamic badge content */}
                <Badge badgeContent="2" color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>

            <ThemeSelector />
        </div>
    );
}
