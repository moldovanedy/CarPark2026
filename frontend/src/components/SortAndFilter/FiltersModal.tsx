import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Modal,
    TextField,
} from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import "./FiltersModal.css";
import { ManufacturersList } from "../../constants/ManufacturersList";
import { PriceSteps } from "../../constants/PriceSteps";
import { MileageSteps } from "../../constants/MileageSteps";
import { EngineSizeSteps } from "../../constants/EngineSizeSteps";
import { useFilters } from "../../hooks/useFilters";
import type {
    FilterFuelType,
    FilterGearboxType,
} from "../../contexts/FiltersContext";

function ManufacturersFilter() {
    const { filters, setFilters } = useFilters();

    const [manufacturers, setManufacturers] = useState<string[] | undefined>(
        filters.manufacturers,
    );

    useEffect(() => {
        if (filters.manufacturers !== manufacturers) {
            setFilters({ ...filters, manufacturers: manufacturers });
        }
    }, [manufacturers]);

    return (
        <FormControl style={{ minWidth: 170 }}>
            <Autocomplete
                multiple
                options={ManufacturersList}
                value={manufacturers}
                onChange={(_e, value) => {
                    setManufacturers(value);
                }}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Manufacturers"
                        placeholder="Manufacturers"
                    />
                )}
            />
        </FormControl>
    );
}

function PriceFilter() {
    const { filters, setFilters } = useFilters();

    const [minPrice, setMinPrice] = useState(filters.minPrice);
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

    useEffect(() => {
        if (filters.minPrice !== minPrice || filters.maxPrice !== maxPrice) {
            setFilters({ ...filters, minPrice: minPrice, maxPrice: maxPrice });
        }
    }, [minPrice, maxPrice]);

    return (
        <div className="composite-fields__parent">
            <h4>Price (€):</h4>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={PriceSteps}
                    value={minPrice}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMinPrice(isNaN(result) ? undefined : result);
                        } else {
                            setMinPrice(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Minimum"
                            placeholder="Min price"
                        />
                    )}
                />
            </FormControl>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={PriceSteps}
                    value={maxPrice}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMaxPrice(isNaN(result) ? undefined : result);
                        } else {
                            setMaxPrice(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Maximum"
                            placeholder="Max price"
                        />
                    )}
                />
            </FormControl>
        </div>
    );
}

function MileageFilter() {
    const { filters, setFilters } = useFilters();

    const [minMileage, setMinMileage] = useState(filters.minMileage);
    const [maxMileage, setMaxMileage] = useState(filters.maxMileage);

    useEffect(() => {
        if (
            filters.minMileage !== minMileage ||
            filters.maxMileage !== maxMileage
        ) {
            setFilters({
                ...filters,
                minMileage: minMileage,
                maxMileage: maxMileage,
            });
        }
    }, [minMileage, maxMileage]);

    return (
        <div className="composite-fields__parent">
            <h4>Mileage (km):</h4>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={MileageSteps}
                    value={minMileage}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMinMileage(isNaN(result) ? undefined : result);
                        } else {
                            setMinMileage(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Minimum"
                            placeholder="Min km"
                        />
                    )}
                />
            </FormControl>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={MileageSteps}
                    value={maxMileage}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMaxMileage(isNaN(result) ? undefined : result);
                        } else {
                            setMaxMileage(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Maximum"
                            placeholder="Max km"
                        />
                    )}
                />
            </FormControl>
        </div>
    );
}

function ConstructionYearFilter() {
    const currentYear = new Date().getFullYear();
    const last25Years = Array.from({ length: 25 }, (_, i) => currentYear - i);
    const { filters, setFilters } = useFilters();

    const [minConstructionYear, setMinConstructionYear] = useState(
        filters.minConstructionYear,
    );
    const [maxConstructionYear, setMaxConstructionYear] = useState(
        filters.maxConstructionYear,
    );

    useEffect(() => {
        if (
            filters.minConstructionYear !== minConstructionYear ||
            filters.maxConstructionYear !== maxConstructionYear
        ) {
            setFilters({
                ...filters,
                minConstructionYear: minConstructionYear,
                maxConstructionYear: maxConstructionYear,
            });
        }
    }, [minConstructionYear, maxConstructionYear]);

    return (
        <div className="composite-fields__parent">
            <h4>Construction years:</h4>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={last25Years}
                    value={minConstructionYear}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMinConstructionYear(
                                isNaN(result) ? undefined : result,
                            );
                        } else {
                            setMinConstructionYear(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Minimum"
                            placeholder="Oldest"
                        />
                    )}
                />
            </FormControl>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={last25Years}
                    value={maxConstructionYear}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMaxConstructionYear(
                                isNaN(result) ? undefined : result,
                            );
                        } else {
                            setMaxConstructionYear(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Maximum"
                            placeholder="Newest"
                        />
                    )}
                />
            </FormControl>
        </div>
    );
}

function EngineSizeFilter() {
    const { filters, setFilters } = useFilters();

    const [minEngineSize, setMinEngineSize] = useState(filters.minEngineSize);
    const [maxEngineSize, setMaxEngineSize] = useState(filters.maxEngineSize);

    useEffect(() => {
        if (
            filters.minEngineSize !== minEngineSize ||
            filters.maxEngineSize !== maxEngineSize
        ) {
            setFilters({
                ...filters,
                minEngineSize: minEngineSize,
                maxEngineSize: maxEngineSize,
            });
        }
    }, [minEngineSize, maxEngineSize]);

    return (
        <div className="composite-fields__parent">
            <h4>Engine size (cm3):</h4>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={EngineSizeSteps}
                    value={minEngineSize}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMinEngineSize(
                                isNaN(result) ? undefined : result,
                            );
                        } else {
                            setMinEngineSize(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Minimum"
                            placeholder="Min cm3"
                        />
                    )}
                />
            </FormControl>
            <FormControl style={{ minWidth: 130 }}>
                <Autocomplete
                    options={EngineSizeSteps}
                    value={maxEngineSize}
                    onChange={(_e, value) => {
                        if (typeof value === "string") {
                            let result = parseInt(value);
                            setMaxEngineSize(
                                isNaN(result) ? undefined : result,
                            );
                        } else {
                            setMaxEngineSize(value ?? undefined);
                        }
                    }}
                    getOptionLabel={(option) => option.toString()}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Maximum"
                            placeholder="Max cm3"
                        />
                    )}
                />
            </FormControl>
        </div>
    );
}

function FuelTypesFilter() {
    const { filters, setFilters } = useFilters();

    const [fuelTypes, setFuelTypes] = useState<FilterFuelType[] | undefined>(
        filters.fuelTypes,
    );

    const updateFuelTypes = (fuelType: FilterFuelType, isAdded: boolean) => {
        if (
            isAdded &&
            (fuelTypes === undefined ||
                fuelTypes?.find((x) => {
                    return x === fuelType;
                }) === undefined)
        ) {
            if (fuelTypes !== undefined) {
                setFuelTypes([...fuelTypes, fuelType]);
            } else {
                setFuelTypes([fuelType]);
            }
        } else if (!isAdded) {
            setFuelTypes(
                fuelTypes?.filter((x) => {
                    return x !== fuelType;
                }) ?? [],
            );
        }
    };

    useEffect(() => {
        if (filters.fuelTypes !== fuelTypes) {
            setFilters({ ...filters, fuelTypes: fuelTypes });
        }
    }, [fuelTypes]);

    return (
        <FormGroup sx={{ gap: 0.3, marginLeft: 1 }}>
            <FormLabel>Fuel types:</FormLabel>
            <FormControlLabel
                value="Petrol"
                control={
                    <Checkbox
                        color="primary"
                        checked={
                            fuelTypes?.find(
                                (fuelType) => fuelType === "Petrol",
                            ) != undefined
                        }
                        onChange={(_, isChecked) => {
                            updateFuelTypes("Petrol", isChecked);
                        }}
                    />
                }
                label="Petrol/Gasoline"
            />
            <FormControlLabel
                value="Diesel"
                control={
                    <Checkbox
                        color="primary"
                        checked={
                            fuelTypes?.find(
                                (fuelType) => fuelType === "Diesel",
                            ) != undefined
                        }
                        onChange={(_, isChecked) => {
                            updateFuelTypes("Diesel", isChecked);
                        }}
                    />
                }
                label="Diesel"
            />
            <FormControlLabel
                value="Electric"
                control={
                    <Checkbox
                        color="primary"
                        checked={
                            fuelTypes?.find(
                                (fuelType) => fuelType === "Electric",
                            ) != undefined
                        }
                        onChange={(_, isChecked) => {
                            updateFuelTypes("Electric", isChecked);
                        }}
                    />
                }
                label="Electric"
            />
        </FormGroup>
    );
}

function GearboxesFilter() {
    const { filters, setFilters } = useFilters();

    const [gearboxes, setGearboxes] = useState<FilterGearboxType[] | undefined>(
        filters.gearboxes,
    );

    const updateGearboxes = (gearbox: FilterGearboxType, isAdded: boolean) => {
        if (
            isAdded &&
            (gearboxes === undefined ||
                gearboxes?.find((x) => {
                    return x === gearbox;
                }) === undefined)
        ) {
            if (gearboxes !== undefined) {
                setGearboxes([...gearboxes, gearbox]);
            } else {
                setGearboxes([gearbox]);
            }
        } else if (!isAdded) {
            setGearboxes(
                gearboxes?.filter((x) => {
                    return x !== gearbox;
                }) ?? [],
            );
        }
    };

    useEffect(() => {
        if (filters.gearboxes !== gearboxes) {
            setFilters({ ...filters, gearboxes: gearboxes });
        }
    }, [gearboxes]);

    return (
        <FormGroup sx={{ gap: 0.3, marginLeft: 1 }}>
            <FormLabel>Gearboxes:</FormLabel>
            <FormControlLabel
                value="Manual"
                control={
                    <Checkbox
                        color="primary"
                        checked={
                            gearboxes?.find(
                                (gearbox) => gearbox === "Manual",
                            ) != undefined
                        }
                        onChange={(_, isChecked) => {
                            updateGearboxes("Manual", isChecked);
                        }}
                    />
                }
                label="Manual"
            />
            <FormControlLabel
                value="Automatic"
                control={
                    <Checkbox
                        color="primary"
                        checked={
                            gearboxes?.find(
                                (gearbox) => gearbox === "Automatic",
                            ) != undefined
                        }
                        onChange={(_, isChecked) => {
                            updateGearboxes("Automatic", isChecked);
                        }}
                    />
                }
                label="Automatic"
            />
        </FormGroup>
    );
}

export function FiltersModal(props: {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const { setFilters } = useFilters();

    return (
        <Modal
            open={props.isOpened}
            onClose={() => {
                props.setIsOpened(false);
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: 320,
                    width: "70%",
                    maxHeight: "70vh",
                    maxWidth: "90vw",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <h2 style={{ textAlign: "center", marginTop: 0 }}>Filters</h2>

                <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
                    <div className="filters-modal-main-content">
                        <ManufacturersFilter />

                        <PriceFilter />
                        <MileageFilter />
                        <ConstructionYearFilter />
                        <EngineSizeFilter />
                    </div>

                    <div className="checkbox-fields__parent">
                        <FuelTypesFilter />
                        <GearboxesFilter />
                    </div>
                </div>

                <div style={{ width: "100%", marginTop: 25, flexShrink: 0 }}>
                    <div style={{ float: "right", display: "flex", gap: 15 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                setFilters({});
                                props.setIsOpened(false);
                            }}
                        >
                            Clear filters
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                props.setIsOpened(false);
                            }}
                        >
                            {/* TODO: get the total number of results possible (might not be possible to to efficiently 
                            since the server does not return this value, only the entire dataset, which is not OK) */}
                            Show results
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
