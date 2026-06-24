// import type { Car } from "../../models/car";
import "./SortingPanel.css";
// import SortIcon from '../../assets/sort.svg?react'

// const SORT_FIELDS: { value: keyof Car | "", label: string }[] = [
//     { value: "", label: "Default" },
//     { value: "manufacturer", label: "Manufacturer" },
//     { value: "model", label: "Model" },
//     { value: "constructionYear", label: "Construction Year" },
//     { value: "mileage", label: "Mileage" },
//     { value: "price", label: "Price" },
//     { value: "power", label: "Power" },
// ]

// const PAGE_SIZES = [5, 10, 20, 50]

export function SortingPanel() {
  // const order: string = "asc"

  return (
    <div className="SortingPanel">
      {/* <label className="SortingPanel__field">
                <span className="SortingPanel__label">Sort by</span>
                <div className="SortingPanel__select">
                    <select
                        value={""}
                        onChange={(e) => {}}
                    >
                        {SORT_FIELDS.map((field) => (
                            <option key={field.value} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>
            </label>

            <button
                type="button"
                className="SortingPanel__order"
                onClick={() => {}}
                disabled={false}
                aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
                title={order === "asc" ? "Ascending" : "Descending"}
            >
                <SortIcon
                    className={`SortingPanel__orderIcon${order === "desc" ? " SortingPanel__orderIcon--desc" : ""}`}
                />
            </button>

            <label className="SortingPanel__field">
                <span className="SortingPanel__label">Per page</span>
                <div className="SortingPanel__select">
                    <select
                        value={0}
                        onChange={(e) => {}}
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </label> */}
    </div>
  );
}
