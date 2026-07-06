import { Close, EvStationOutlined } from "@mui/icons-material";
import {
    AppBar,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { AddToCartButton } from "../AddToCartButton";
import type { Car } from "../../models/Car";
import { ToggleFavoriteButton } from "../ToggleFavoriteButton";
import "./CarDetailsDialog.css";
import { IMG_BASE_URL } from "../../data/constants";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ScreenBreakpoints } from "../../constants/ScreenBreakpoints";
import { formatNumber } from "../../utils/NumberFormatter";
import { Cog, Fan, Fuel, Gauge, Road } from "lucide-react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Overview(props: { car: Car; carName: string }) {
    const { width: windowWidth } = useWindowDimensions();

    return (
        <div className="car-dialog__overview-container">
            <img
                src={`${IMG_BASE_URL}/${props.car.image}`}
                style={{
                    maxWidth:
                        windowWidth > ScreenBreakpoints.SMALL_SCREEN
                            ? "70%"
                            : "95%",
                    maxHeight: 500,
                    borderRadius: 8,
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    textAlign: "center",
                }}
            >
                <h2>{props.carName}</h2>

                <Typography className="price" sx={{ fontSize: 20 }}>
                    Price: {formatNumber(props.car.price)} EUR
                </Typography>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 15,
                    }}
                >
                    <div className="car-dialog__favorite-button-wrapper">
                        <ToggleFavoriteButton car={props.car} />
                    </div>

                    <AddToCartButton />
                </div>
            </div>
        </div>
    );
}

function GeneralDetailsInfo(props: {
    icon: React.JSX.Element;
    propertyName: string;
    value: string;
}) {
    return (
        <div className="car-dialog__general-details-info">
            {props.icon}

            <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 14 }}>{props.propertyName}</span>
                <br />
                <span>
                    <b>{props.value}</b>
                </span>
            </div>
        </div>
    );
}

export function CarDetailsDialog(props: {
    car: Car;
    isModalOpened: boolean;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
    const handleClose = () => {
        props.setIsModalOpened(false);
    };

    const carName = `${props.car.manufacturer} ${props.car.model} ${props.car.constructionYear}`;
    //add newlines after each phrase
    const carDescription = props.car.description.replace(/([.!?])/g, "$1\n");

    return (
        <Dialog
            fullScreen
            open={props.isModalOpened}
            onClose={handleClose}
            slots={{ transition: Transition }}
        >
            <AppBar sx={{ position: "relative" }}>
                <Toolbar sx={{ gap: 1 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>

                    <h4 className="car-dialog__top-title">{carName}</h4>
                </Toolbar>
            </AppBar>

            <DialogContent>
                <Overview car={props.car} carName={carName} />

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <div className="car-dialog__general-details-container">
                            <GeneralDetailsInfo
                                icon={<Road size={32} />}
                                propertyName="Mileage"
                                value={`${formatNumber(props.car.mileage)} km`}
                            />

                            <GeneralDetailsInfo
                                icon={
                                    props.car.fuelType === "Electric" ? (
                                        <EvStationOutlined
                                            sx={{ fontSize: 32 }}
                                        />
                                    ) : (
                                        <Fuel size={32} />
                                    )
                                }
                                propertyName="Fuel"
                                value={props.car.fuelType}
                            />

                            <GeneralDetailsInfo
                                icon={<Cog size={32} />}
                                propertyName="Gearbox"
                                value={props.car.gearbox}
                            />

                            {props.car.engineSize <= 0 ? (
                                <></>
                            ) : (
                                <GeneralDetailsInfo
                                    icon={<Fan size={32} />}
                                    propertyName="Engine size"
                                    value={`${formatNumber(props.car.engineSize)} cm3`}
                                />
                            )}

                            <GeneralDetailsInfo
                                icon={<Gauge size={32} />}
                                propertyName="Power"
                                value={`${props.car.power} HP`}
                            />
                        </div>

                        <h4>Description:</h4>
                        <p style={{ whiteSpace: "pre-wrap", maxWidth: 850 }}>
                            {carDescription}
                        </p>

                        <div className="car-dialog__features-container">
                            {props.car.equipment.split(",").map((feature) => (
                                <Chip
                                    label={feature}
                                    key={feature}
                                    variant="outlined"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
