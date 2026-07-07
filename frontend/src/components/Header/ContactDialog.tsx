import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

export function ContactDialog(props: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <Dialog
            open={props.isOpen}
            onClose={() => {
                props.setIsOpen(false);
            }}
        >
            <DialogTitle>Contact sales</DialogTitle>

            <DialogContent>
                <p>
                    <b>Address:</b> str. Principală nr. 123, Ernei, Mureș,
                    Romania
                </p>
                <p>
                    <b>Phone:</b> +40770 123 456
                </p>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.location.href = "tel:+40770123456";
                    }}
                >
                    Dial
                </Button>
            </DialogActions>
        </Dialog>
    );
}
