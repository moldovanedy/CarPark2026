import { IconButton, useColorScheme } from "@mui/material";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";

export function ThemeSelector() {
    const { mode, setMode } = useColorScheme();

    let icon;
    switch (mode) {
        case "dark":
            icon = <DarkMode />;
            break;
        case "light":
            icon = <LightMode />;
            break;
        default:
        case "system":
            icon = <SettingsBrightness />;
            break;
    }

    const clickCallback = () => {
        switch (mode) {
            case "dark":
                setMode("light");
                break;
            case "light":
                setMode("system");
                break;
            default:
            case "system":
                setMode("dark");
                break;
        }
    };

    return <IconButton onClick={clickCallback}>{icon}</IconButton>;
}
