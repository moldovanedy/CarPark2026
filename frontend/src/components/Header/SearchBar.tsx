import { Autocomplete, TextField } from "@mui/material";
import { ManufacturersList } from "../../constants/ManufacturersList";
import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { useCarsList } from "../../hooks/useCarsList";
import { useFilters } from "../../hooks/useFilters";
import { SearchableKeys } from "../../data/car";

const DEBOUNCE_MILLISECONDS = 500;

export function SearchBar(params: {
    currentValue: string | undefined;
    setCurrentValue: Dispatch<SetStateAction<string | undefined>>;
    setIsSearchOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const searchCallbackId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { carsList } = useCarsList();
    const { filters, setFilters } = useFilters();

    function suggest() {
        const MAX_SUGGESTIONS = 20;
        let newSuggestions: string[] = [];

        for (let i = 0; i < carsList.length; i++) {
            let car = carsList[i];
            if (newSuggestions.length >= MAX_SUGGESTIONS) {
                break;
            }

            for (let j = 0; j < SearchableKeys.length; j++) {
                if (newSuggestions.length >= MAX_SUGGESTIONS) {
                    break;
                }

                let key = SearchableKeys[j];
                let value: string | number = car[key];
                if (typeof value === "number") {
                    value = value.toString();
                }

                if (
                    params.currentValue?.includes(value) &&
                    newSuggestions.find(
                        (suggestion) => suggestion === value,
                    ) === undefined
                ) {
                    newSuggestions.push(value);
                }
            }
        }

        setSuggestions(newSuggestions);
    }

    function search(isFromSubmit?: boolean) {
        if (params.currentValue?.length === 0) {
            setFilters({ ...filters, searchString: undefined });
            return;
        }

        if (filters.searchString !== params.currentValue) {
            setFilters({ ...filters, searchString: params.currentValue });
        }

        if (!isFromSubmit) {
            suggest();
        }
    }

    useEffect(() => {
        if (params.currentValue?.length === 0) {
            setSuggestions(ManufacturersList);
        }
    }, []);

    useEffect(() => {
        if (searchCallbackId.current !== null) {
            clearTimeout(searchCallbackId.current);
        }

        searchCallbackId.current = setTimeout(() => {
            search();
        }, DEBOUNCE_MILLISECONDS);

        return () => {
            if (searchCallbackId.current !== null) {
                clearTimeout(searchCallbackId.current);
                searchCallbackId.current = null;
            }
        };
    }, [params.currentValue]);

    return (
        <Autocomplete
            options={suggestions}
            value={params.currentValue}
            sx={{ flexGrow: 1 }}
            getOptionLabel={(option) => option}
            freeSolo
            renderInput={(inputParams) => (
                <TextField
                    {...inputParams}
                    label="Search cars"
                    variant="outlined"
                    size="small"
                    value={params.currentValue}
                    onChange={(e) => {
                        params.setCurrentValue(e.target.value ?? "");
                    }}
                    onSubmit={() => {
                        search(true);
                    }}
                    onBlur={() => {
                        params.setIsSearchOpened(false);
                    }}
                />
            )}
        />
    );
}
