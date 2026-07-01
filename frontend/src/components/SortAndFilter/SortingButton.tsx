import { Box, Button, IconButton, Modal } from "@mui/material";
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

            <Modal
                open={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: 180,
                        maxHeight: "70vh",
                        maxWidth: "90vw",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <h2 style={{ textAlign: "center", marginTop: 0 }}>
                        Sorting
                    </h2>

                    <SortingControls />

                    <Button
                        variant="contained"
                        onClick={() => {
                            setIsModalOpened(false);
                        }}
                    >
                        Apply
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
