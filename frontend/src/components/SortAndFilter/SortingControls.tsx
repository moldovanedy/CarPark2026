import { useFilters } from "../../hooks/useFilters";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// the values MUST be a string because a select element does not work well with custom types
const SORT_FIELDS: { value: string; label: string }[] = [
    { value: "default|asc", label: "Default" },
    { value: "manufacturer|asc", label: "Manufacturer asc." },
    { value: "manufacturer|desc", label: "Manufacturer desc." },
    { value: "model|asc", label: "Model asc." },
    { value: "model|desc", label: "Model desc." },
    { value: "constructionYear|asc", label: "Construction Year asc." },
    { value: "constructionYear|desc", label: "Construction Year desc." },
    { value: "mileage|asc", label: "Mileage asc." },
    { value: "mileage|desc", label: "Mileage desc." },
    { value: "price|asc", label: "Price asc." },
    { value: "price|desc", label: "Price desc." },
    { value: "power|asc", label: "Power asc." },
    { value: "power|desc", label: "Power desc." },
];

const PAGE_SIZES = [10, 20, 50, 100];

export function SortingControls() {
    const { limit, setLimit, sort, setSort } = useFilters();

    return (
        <>
            <FormControl>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                    autoWidth
                    style={{ minWidth: 110 }}
                    labelId="sort-by-label"
                    id="sort-by"
                    label="Sort by"
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                    }}
                >
                    {SORT_FIELDS.map((field) => (
                        <MenuItem key={field.value} value={field.value}>
                            {field.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="items-per-page-label">
                    Items per page
                </InputLabel>
                <Select
                    autoWidth
                    style={{ minWidth: 130 }}
                    labelId="items-per-page-label"
                    id="items-per-page"
                    label="Items per page"
                    value={limit}
                    onChange={(e) => {
                        setLimit(e.target.value);
                    }}
                >
                    {PAGE_SIZES.map((pageSize) => (
                        <MenuItem key={pageSize} value={pageSize}>
                            {pageSize}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
