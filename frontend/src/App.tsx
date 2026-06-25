import "./App.css";
import { Content } from "./components/Content/Content";
import { FiltersProvider } from "./contexts/FiltersProvider";
import { CarListProvider } from "./contexts/CarListProvider";
import { createTheme, ThemeProvider } from "@mui/material";

export function App() {
    const theme = createTheme({
        colorSchemes: {
            dark: true,
        },
        cssVariables: {
            colorSchemeSelector: "class",
        },
        palette: {
            primary: {
                main: "#00D2FE",
            },
            secondary: {
                main: "#7995A0",
            },
            error: {
                main: "#FF5449",
            },
            warning: {
                main: "#ed6c02",
            },
            info: {
                main: "#0288d1",
            },
            success: {
                main: "#2e7d32",
            },
        },
    });

    return (
        <ThemeProvider theme={theme} noSsr>
            <FiltersProvider>
                <CarListProvider>
                    <Content />
                </CarListProvider>
            </FiltersProvider>
        </ThemeProvider>
    );
}
