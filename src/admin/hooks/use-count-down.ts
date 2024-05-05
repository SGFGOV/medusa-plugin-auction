import { useState, useEffect } from "react";

const useCountdown = (endTime): number => {
    const [remainingTime, setRemainingTime] = useState(endTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endTime]);

    return remainingTime;
};

export default useCountdown;
