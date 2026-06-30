import { FilterAltOutlined } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useFilters } from "../../hooks/useFilters";
import { useEffect, useState } from "react";
import { FiltersModal } from "./FiltersModal";

export function FiltersButton() {
    const { filters } = useFilters();
    const [numFiltersApplied, setNumFiltersApplied] = useState(0);
    const [isModalOpened, setIsModalOpened] = useState(false);

    useEffect(() => {
        let numFilters = 0;
        if (
            filters.manufacturers !== undefined &&
            filters.manufacturers.length > 0
        ) {
            numFilters++;
        }
        if (filters.models !== undefined && filters.models.length > 0) {
            numFilters++;
        }

        if (filters.minPrice !== undefined && filters.minPrice >= 0) {
            numFilters++;
        }
        if (filters.maxPrice !== undefined && filters.maxPrice >= 0) {
            numFilters++;
        }

        if (filters.minMileage !== undefined && filters.minMileage >= 0) {
            numFilters++;
        }
        if (filters.maxMileage !== undefined && filters.maxMileage >= 0) {
            numFilters++;
        }

        if (
            filters.minConstructionYear !== undefined &&
            filters.minConstructionYear >= 0
        ) {
            numFilters++;
        }
        if (
            filters.maxConstructionYear !== undefined &&
            filters.maxConstructionYear >= 0
        ) {
            numFilters++;
        }

        if (filters.minEngineSize !== undefined && filters.minEngineSize >= 0) {
            numFilters++;
        }
        if (filters.maxEngineSize !== undefined && filters.maxEngineSize >= 0) {
            numFilters++;
        }

        if (filters.fuelTypes !== undefined && filters.fuelTypes.length > 0) {
            numFilters++;
        }
        if (filters.gearboxes !== undefined && filters.gearboxes.length > 0) {
            numFilters++;
        }

        setNumFiltersApplied(numFilters);
    }, [filters]);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span>Filters:</span>
            <Badge
                badgeContent={numFiltersApplied}
                overlap="circular"
                color="secondary"
            >
                <IconButton
                    color="primary"
                    onClick={() => {
                        setIsModalOpened(true);
                    }}
                >
                    <FilterAltOutlined />
                </IconButton>
            </Badge>

            <FiltersModal
                isOpened={isModalOpened}
                setIsOpened={setIsModalOpened}
            />
        </div>
    );
}
