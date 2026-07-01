import { TextField } from "@mui/material";

export function SearchBar() {
    return (
        <TextField
            label="Search cars"
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
        />
    );
}
