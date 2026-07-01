import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import "./Pagination.css";
import { Button, IconButton } from "@mui/material";
import { useCarsList } from "../../hooks/useCarsList";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ScreenBreakpoints } from "../../constants/ScreenBreakpoints";

export function Pagination() {
    const [pagesArray, setPagesArray] = useState<number[]>([]);
    const [hasBackEllipsis, setHasBackEllipsis] = useState<boolean>(false);
    const [hasForwardEllipsis, setHasForwardEllipsis] =
        useState<boolean>(false);

    const { page, setPage, numTotalPages } = useFilters();
    const { width: windowWidth } = useWindowDimensions();
    const { carsList } = useCarsList();

    useEffect(() => {
        let arr = [];
        let index = 0;
        setHasForwardEllipsis(false);
        setHasBackEllipsis(false);

        /* on large screens, we have 5 pages, on smaller ones, 3 (or just 1 if too small) */
        const maxShownPages =
            windowWidth > ScreenBreakpoints.MEDIUM_SCREEN ? 5 : 3;

        const numBackPages = Math.max(
            Math.floor(maxShownPages / 2),
            page - numTotalPages + maxShownPages - 1,
        );
        let pageIndex = page - numBackPages;

        if (pageIndex > 1) {
            setHasBackEllipsis(true);
        }

        while (index < maxShownPages && pageIndex <= numTotalPages) {
            if (pageIndex >= 1) {
                arr[index] = pageIndex;
                index++;
            }

            pageIndex++;
        }

        if (pageIndex - 1 < numTotalPages) {
            setHasForwardEllipsis(true);
        }

        setPagesArray(arr);
    }, [carsList, numTotalPages, page, windowWidth]);

    return (
        <div className="pagination">
            <span style={{ fontWeight: "bold" }}>Page:</span>
            <span></span>

            {/* on large screens, we have text, on smaller ones, just icons */}
            {windowWidth > ScreenBreakpoints.MEDIUM_SCREEN ? (
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
            ) : (
                <IconButton
                    color="primary"
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }
                    }}
                    disabled={page === 1}
                >
                    <ChevronLeft />
                </IconButton>
            )}

            {hasBackEllipsis && windowWidth > ScreenBreakpoints.XS_SCREEN ? (
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

            {/* if the screen is too small, there simply is no room for other elements, use a single button 
             with the current page */}
            {windowWidth > ScreenBreakpoints.XS_SCREEN ? (
                pagesArray.map((p) => (
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
                ))
            ) : (
                // TODO (later): use a modal to let the user select the page
                <Button
                    variant="outlined"
                    className={"pagination__button pagination__button--active"}
                >
                    {page}
                </Button>
            )}

            {hasForwardEllipsis && windowWidth > ScreenBreakpoints.XS_SCREEN ? (
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

            {windowWidth > ScreenBreakpoints.MEDIUM_SCREEN ? (
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
            ) : (
                <IconButton
                    color="primary"
                    onClick={() => {
                        if (page < numTotalPages) {
                            setPage(page + 1);
                        }
                    }}
                    disabled={page === numTotalPages}
                >
                    <ChevronRight />
                </IconButton>
            )}
        </div>
    );
}
