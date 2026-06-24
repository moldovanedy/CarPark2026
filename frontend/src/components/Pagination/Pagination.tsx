import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import "./Pagination.css";

export function Pagination() {
    const [pagesArray, setPagesArray] = useState<number[]>([]);
    const [hasBackEllipsis, setHasBackEllipsis] = useState<boolean>(false);
    const [hasForwardEllipsis, setHasForwardEllipsis] =
        useState<boolean>(false);

    const { page, setPage, numTotalPages } = useFilters();

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
    }, []);

    return (
        <div className="Pagination">
            <button
                type="button"
                className="Pagination__button"
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);
                    }
                }}
                disabled={page === 1}
            >
                Prev
            </button>

            {hasBackEllipsis ? (
                <>
                    <button
                        type="button"
                        className={`Pagination__button`}
                        onClick={() => {
                            setPage(1);
                        }}
                    >
                        1
                    </button>
                    <span>...</span>
                </>
            ) : (
                <></>
            )}

            {pagesArray.map((p) => (
                <button
                    key={p}
                    type="button"
                    className={`Pagination__button${p === page ? " Pagination__button--active" : ""}`}
                    onClick={() => {
                        if (p >= 1 && p <= numTotalPages) {
                            setPage(p);
                        }
                    }}
                >
                    {p}
                </button>
            ))}

            {hasForwardEllipsis ? (
                <>
                    <span>...</span>
                    <button
                        type="button"
                        className={`Pagination__button`}
                        onClick={() => {
                            setPage(numTotalPages);
                        }}
                    >
                        {numTotalPages}
                    </button>
                </>
            ) : (
                <></>
            )}

            <button
                type="button"
                className="Pagination__button"
                onClick={() => {
                    if (page < numTotalPages) {
                        setPage(page + 1);
                    }
                }}
                disabled={page === numTotalPages}
            >
                Next
            </button>
        </div>
    );
}
