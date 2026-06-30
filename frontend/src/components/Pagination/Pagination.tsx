import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import "./Pagination.css";
import { Button } from "@mui/material";
import { useCarsList } from "../../hooks/useCarsList";

export function Pagination() {
    const [pagesArray, setPagesArray] = useState<number[]>([]);
    const [hasBackEllipsis, setHasBackEllipsis] = useState<boolean>(false);
    const [hasForwardEllipsis, setHasForwardEllipsis] =
        useState<boolean>(false);

    const { page, setPage, numTotalPages } = useFilters();
    const { carsList } = useCarsList();

    useEffect(() => {
        let arr = [];
        let index = 0;

        if (page - 2 > 1) {
            setHasBackEllipsis(true);
        }

        if (page + 2 < numTotalPages) {
            setHasForwardEllipsis(true);
        }

        const numBackPages = Math.max(2, page - numTotalPages + 4);
        let pageIndex = page - numBackPages;
        while (index < 5 && pageIndex <= numTotalPages) {
            if (pageIndex >= 1) {
                arr[index] = pageIndex;
                index++;
            }

            pageIndex++;
        }

        setPagesArray(arr);
    }, [carsList]);

    return (
        <div className="pagination">
            <span style={{ fontWeight: "bold" }}>Page:</span>
            <span></span>

            <Button
                variant="contained"
                className="pagination__control-button"
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }
                }}
                disabled={page === 1}
            >
                Prev
            </Button>

            {hasBackEllipsis ? (
                <>
                    <Button
                        variant="outlined"
                        className={"pagination__button"}
                        onClick={() => {
                            setPage(1);
                        }}
                    >
                        1
                    </Button>
                    <span>...</span>
                </>
            ) : (
                <></>
            )}

            {pagesArray.map((p) => (
                <Button
                    key={p}
                    variant="outlined"
                    className={`pagination__button${p === page ? " pagination__button--active" : ""}`}
                    onClick={() => {
                        if (p >= 1 && p <= numTotalPages) {
                            setPage(p);
                        }
                    }}
                >
                    {p}
                </Button>
            ))}

            {hasForwardEllipsis ? (
                <>
                    <span>...</span>
                    <Button
                        variant="outlined"
                        className={"pagination__button"}
                        onClick={() => {
                            setPage(numTotalPages);
                        }}
                    >
                        {numTotalPages}
                    </Button>
                </>
            ) : (
                <></>
            )}

            <Button
                variant="contained"
                className="pagination__control-button"
                onClick={() => {
                    if (page < numTotalPages) {
                        setPage(page + 1);
                    }
                }}
                disabled={page === numTotalPages}
            >
                Next
            </Button>
        </div>
    );
}
