import { Badge, IconButton } from "@mui/material";
import "./Header.css";
import { ThemeSelector } from "./ThemeSelector";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Favorite from "@mui/icons-material/Favorite";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { SearchBar } from "./SearchBar";
import { SearchOutlined } from "@mui/icons-material";

const SEARCH_BAR_BREAKPOINT = 600;

export function Header() {
    const { width: windowWidth } = useWindowDimensions();

    return (
        <div className="main-header">
            <h3>CarPark</h3>

            <div className="header-action-zone">
                {windowWidth > SEARCH_BAR_BREAKPOINT ? (
                    <>
                        <SearchBar />
                        <div style={{ width: 3 }}></div>
                    </>
                ) : (
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                )}

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
        </div>
    );
}
