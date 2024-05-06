import React from "react";
import useCountdown from "../../hooks/use-count-down";

const CountdownTimer = ({ endTime }) => {
    const remainingTime = useCountdown(endTime);

    const getColor = () => {
        if (remainingTime <= 60 && remainingTime > 5) {
            return "orange";
        } else if (remainingTime <= 5) {
            return "red";
        } else {
            return "green";
        }
    };

    return (
        <div style={{ color: getColor() }}>
            {remainingTime > 0 ? remainingTime : 0} seconds left
        </div>
    );
};

export default CountdownTimer;
