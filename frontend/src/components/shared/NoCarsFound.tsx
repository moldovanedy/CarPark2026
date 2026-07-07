import { DirectionsCar } from "@mui/icons-material";
import "./NoCarsFound.css";

export function NoCarsFound() {
    return (
        <div className="no-cars__container">
            <DirectionsCar style={{ fontSize: 72 }} />
            <h1>No cars matched</h1>

            <span style={{ maxWidth: 500 }}>
                Try clearing some filters to match more cars or check spelling
                mistakes in the search.
            </span>
        </div>
    );
}
