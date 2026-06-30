import {
    Autocomplete,
    Box,
    Button,
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
import { CheckBox } from "@mui/icons-material";
import { useFilters } from "../../hooks/useFilters";

export function FiltersModal(props: {
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const currentYear = new Date().getFullYear();
    const last25Years = Array.from({ length: 25 }, (_, i) => currentYear - i);

    const { filters, setFilters } = useFilters();

    const [manufacturers, setManufacturers] = useState<string[]>(
        filters.manufacturers ?? [],
    );
    // const [models, setModels] = useState<string[]>(filters.models ?? []);
    const [minPrice, setMinPrice] = useState(filters.minPrice);
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
    const [minMileage, setMinMileage] = useState(filters.minMileage);
    const [maxMileage, setMaxMileage] = useState(filters.maxMileage);
    const [minConstructionYear, setMinConstructionYear] = useState(
        filters.minConstructionYear,
    );
    const [maxConstructionYear, setMaxConstructionYear] = useState(
        filters.maxConstructionYear,
    );
    const [minEngineSize, setMinEngineSize] = useState(filters.minEngineSize);
    const [maxEngineSize, setMaxEngineSize] = useState(filters.maxEngineSize);

    useEffect(() => {
        if (filters.manufacturers !== manufacturers) {
            setFilters({ ...filters, manufacturers: manufacturers });
        }
    }, [manufacturers]);

    useEffect(() => {
        if (filters.minPrice !== minPrice || filters.maxPrice !== maxPrice) {
            setFilters({ ...filters, minPrice: minPrice, maxPrice: maxPrice });
        }
    }, [minPrice, maxPrice]);

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

                        <FormControl style={{ minWidth: 170 }}>
                            <TextField label="Models" placeholder="Models" />
                        </FormControl>

                        <div className="composite-fields__parent">
                            <h4>Price (€):</h4>
                            <FormControl style={{ minWidth: 130 }}>
                                <Autocomplete
                                    options={PriceSteps}
                                    value={minPrice}
                                    onChange={(_e, value) => {
                                        if (typeof value === "string") {
                                            let result = parseInt(value);
                                            setMinPrice(
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMinPrice(value ?? undefined);
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                            setMaxPrice(
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMaxPrice(value ?? undefined);
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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

                        <div className="composite-fields__parent">
                            <h4>Mileage (km):</h4>
                            <FormControl style={{ minWidth: 130 }}>
                                <Autocomplete
                                    options={MileageSteps}
                                    value={minMileage}
                                    onChange={(_e, value) => {
                                        if (typeof value === "string") {
                                            let result = parseInt(value);
                                            setMinMileage(
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMinMileage(value ?? undefined);
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                            setMaxMileage(
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMaxMileage(value ?? undefined);
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMinConstructionYear(
                                                value ?? undefined,
                                            );
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMaxConstructionYear(
                                                value ?? undefined,
                                            );
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMinEngineSize(
                                                value ?? undefined,
                                            );
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                                                isNaN(result)
                                                    ? undefined
                                                    : result,
                                            );
                                        } else {
                                            setMaxEngineSize(
                                                value ?? undefined,
                                            );
                                        }
                                    }}
                                    getOptionLabel={(option) =>
                                        option.toString()
                                    }
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
                    </div>

                    <div className="checkbox-fields__parent">
                        <FormGroup sx={{ gap: 0.3, marginLeft: 1 }}>
                            <FormLabel>Fuel type:</FormLabel>
                            <FormControlLabel
                                value="petrol"
                                control={<CheckBox color="primary" />}
                                label="Petrol/Gasoline"
                            />
                            <FormControlLabel
                                value="diesel"
                                control={<CheckBox color="primary" />}
                                label="Diesel"
                            />
                            <FormControlLabel
                                value="electric"
                                control={<CheckBox color="primary" />}
                                label="Electric"
                            />
                        </FormGroup>

                        <FormGroup sx={{ gap: 0.3, marginLeft: 1 }}>
                            <FormLabel>Gearboxes:</FormLabel>
                            <FormControlLabel
                                value="manual"
                                control={<CheckBox color="primary" />}
                                label="Manual"
                            />
                            <FormControlLabel
                                value="automatic"
                                control={<CheckBox color="primary" />}
                                label="Automatic"
                            />
                        </FormGroup>
                    </div>
                </div>

                <div style={{ width: "100%", marginTop: 25, flexShrink: 0 }}>
                    <div style={{ float: "right" }}>
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
