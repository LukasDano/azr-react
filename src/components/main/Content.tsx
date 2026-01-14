import { useContext } from "react";
import { AppContext, type AppContextValues } from "../context/AppContext";
import type { Time } from "../../utils/importantTypes";
import { addTimes, convertTimeToDate } from "../../utils/timeUtils";
import { Countdown } from "./Countdown";


export const Content = () => {
    const { startTime, updateStartTime } = useContext<AppContextValues>(AppContext);

    const breakTime: Time = { hours: 0, minutes: 30 };
    const workTime: Time = { hours: 7, minutes: 6 };

    const handleStartTimeChange = (newVaule: string): void => {
        const [newH, newMin] = newVaule.split(":");

        const newTime: Time = {
            hours: parseInt(newH, 10),
            minutes: parseInt(newMin, 10)
        };

        updateStartTime(newTime);
    };

    const formatTime = (time: Time): string => {
        const h = String(time.hours).padStart(2, "0");
        const m = String(time.minutes).padStart(2, "0");
        return `${h}:${m}`;
    };

    const getEndTime = (start: Time): Time => {
        const withoutBreak = addTimes(start, workTime);
        return addTimes(withoutBreak, breakTime);
    }

    return (
        <>
            <input
                type="time"
                value={formatTime(startTime)}
                onChange={(evt) => handleStartTimeChange(evt.target.value)}
            />

            <Countdown
                end={convertTimeToDate(getEndTime(startTime))}
            />
        </>
    )
}