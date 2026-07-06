import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { SortingControls } from "./SortingControls";
import { Sort } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ScreenBreakpoints } from "../../constants/ScreenBreakpoints";

export function SortingButton() {
    const { width: windowWidth } = useWindowDimensions();
    const [isModalOpened, setIsModalOpened] = useState(false);

    useEffect(() => {
        setIsModalOpened(false);
    }, [windowWidth]);

    return windowWidth > ScreenBreakpoints.MEDIUM_SCREEN ? (
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
            <SortingControls />
        </div>
    ) : (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <IconButton
                color="primary"
                onClick={() => {
                    setIsModalOpened(true);
                }}
            >
                <Sort />
            </IconButton>
            <span>Sort</span>

            <Dialog
                open={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <DialogTitle>Sort cars</DialogTitle>

                <DialogContent>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 15,
                            marginTop: 8,
                        }}
                    >
                        <SortingControls />
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setIsModalOpened(false);
                        }}
                    >
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
