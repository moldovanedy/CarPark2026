import { Badge, IconButton } from "@mui/material";
import "./Header.css";
import { ThemeSelector } from "./ThemeSelector";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { SearchBar } from "./SearchBar";
import { ArrowBack, Phone, SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ContactDialog } from "./ContactDialog";

const SEARCH_BAR_BREAKPOINT = 600;

function OtherActions() {
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

    return (
        <>
            {/* <IconButton>
                <Favorite />
            </IconButton>

            <IconButton>
                <Badge badgeContent="2" color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton> */}

            <ContactDialog
                isOpen={isContactDialogOpen}
                setIsOpen={setIsContactDialogOpen}
            />

            <IconButton
                onClick={() => {
                    setIsContactDialogOpen(true);
                }}
            >
                <Phone />
            </IconButton>

            <ThemeSelector />
        </>
    );
}

export function Header() {
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>("");
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        if (windowWidth > SEARCH_BAR_BREAKPOINT) {
            setIsSearchOpened(false);
        }
    }, [windowWidth]);

    return (
        <div className="main-header">
            <h3>CarPark</h3>

            <div className="header-action-zone">
                {windowWidth > SEARCH_BAR_BREAKPOINT ? (
                    <>
                        <SearchBar
                            currentValue={currentValue}
                            setCurrentValue={setCurrentValue}
                            setIsSearchOpened={setIsSearchOpened}
                        />
                        <div style={{ width: 3 }}></div>
                        <OtherActions />
                    </>
                ) : isSearchOpened ? (
                    <>
                        <SearchBar
                            currentValue={currentValue}
                            setCurrentValue={setCurrentValue}
                            setIsSearchOpened={setIsSearchOpened}
                        />

                        <IconButton
                            onClick={() => {
                                setIsSearchOpened(false);
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton
                            onClick={() => {
                                setIsSearchOpened(true);
                            }}
                        >
                            {(currentValue.length ?? 0) > 0 ? (
                                <Badge variant="dot" color="secondary">
                                    <SearchOutlined />
                                </Badge>
                            ) : (
                                <SearchOutlined />
                            )}
                        </IconButton>

                        <OtherActions />
                    </>
                )}
            </div>
        </div>
    );
}
