import { useEffect, useState } from "react";

export type Dimensions = {
    width: number;
    height: number;
};

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};
