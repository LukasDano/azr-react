import type { FloatTime, Time } from '../static/importantTypes';
import { getStorageValue } from './storage/localStorageManger';

export const calculateNormalEnd = (startVal: Time, pauseVal: Time, sollVal: Time): Time => {
    const start = { ...startVal };
    const pause = { ...pauseVal };
    const soll = { ...sollVal };

    let endHours = start.hours + pause.hours + soll.hours;
    let endMins = start.minutes + pause.minutes + soll.minutes;

    if (endHours >= 24) endHours = endHours - 24;

    // Wenn Start-Minuten + Pausen-Minuten + Soll-Minuten >= 120 sind
    if (endMins >= 120) {
        endMins = endMins - 120;
        endHours += 2;
    }

    // Wenn Start-Minuten + Pausen-Minuten + Soll-Minuten >= 60 sind
    if (endMins >= 60) {
        endMins = endMins - 60;
        endHours++;
    }

    return { hours: endHours, minutes: endMins };
};

export const calculateCurrentNormalEnd = (start: Time): Time => {
    const breakTime = getStorageValue('breakTime');
    const workTime = getStorageValue('workTime');

    return calculateNormalEnd(start, breakTime, workTime);
};

export const calculateStartEndeTimeDiff = (startVal: Time, endVal: Time): Time => {
    const start = { ...startVal };
    const end = { ...endVal };

    let diffHours = end.hours - start.hours;
    let diffMins = end.minutes - start.minutes;

    if (diffMins < 0) {
        diffHours--;
        diffMins = diffMins + 60;
    }

    return { hours: diffHours, minutes: diffMins };
};

export const calculateIstSollTimeDiff = (workVal: Time, sollVal: Time): FloatTime => {
    const work = { ...workVal };
    const soll = { ...sollVal };

    let diffHours = work.hours - soll.hours;
    let diffMins;

    if (diffHours === 0 && work.minutes > soll.minutes) diffMins = work.minutes - soll.minutes;
    else if (diffHours > 0) {
        diffMins = 60 - soll.minutes + work.minutes;
        diffHours--;

        if (diffMins >= 60) {
            diffMins = diffMins - 60;
            diffHours++;
        }
    } else if (work.minutes > soll.minutes && work.minutes < 60) {
        diffMins = 60 - work.minutes + soll.minutes;
        diffHours++;
    }
    else diffMins = soll.minutes - work.minutes;

    if (diffMins < 0) {
        diffHours--;
        diffMins = diffMins + 60;
    }

    const positive = !(
        (work.minutes === soll.minutes && work.minutes < work.minutes) ||
        work.minutes < soll.minutes
    );

    return { positive: positive, time: { hours: diffHours, minutes: diffMins } };
};

export const calculateWorkTime = (diffVal: Time, pauseVal: Time): Time => {
    const diff = { ...diffVal };
    const pause = { ...pauseVal };

    let workHours = diff.hours - pause.hours;
    let workMins = diff.minutes - pause.minutes;

    if (workMins < 0) {
        workHours--;
        workMins = workMins + 60;
    }

    return { hours: workHours, minutes: workMins };
};

export const calculateIstTime = (start: Time, end: Time, pause: Time): Time => {
    const roundedStart = roundStart({ ...start });
    const roundedEnd = roundEnd({ ...end });

    let istHours = roundedEnd.hours - roundedStart.hours;
    let istMins = roundedEnd.minutes - roundedStart.minutes - pause.minutes;

    while (istMins < 0) {
        istHours--;
        istMins = istMins + 60;
    }

    if (istHours >= 12) istHours = istHours - 2;

    return { hours: istHours, minutes: istMins };
};

export const calculateGleitzeit = (istVal: Time): FloatTime => {
    const ist = { ...istVal };
    const soll = getStorageValue("workTime");

    let gleitHours = ist.hours - soll.hours;
    let gleitMins = ist.minutes - soll.minutes;

    if (ist.hours < soll.hours) {
        gleitHours++;
        gleitMins = gleitMins - 60;
    }

    if (gleitHours > 0 && gleitMins < 0) {
        gleitHours--;
        gleitMins = gleitMins + 60;
    }

    if (gleitMins < -59) {
        gleitHours--;
        gleitMins = gleitMins + 60;
    }

    const hasNegativeValues = (gleitHours < 0 || gleitHours < 0)
    return { positive: !hasNegativeValues, time: { hours: gleitHours, minutes: gleitMins } };
};

const roundStart = (startVal: Time): Time => {
    const start = { ...startVal };
    let tens = 0;

    while (start.minutes > 9) {
        start.minutes = start.minutes - 10;
        tens++;
    }

    if (start.minutes >= 5) start.minutes = 5;
    if (start.minutes <= 4) start.minutes = 0;

    const startMins = start.minutes + tens * 10;

    return { hours: start.hours, minutes: startMins };
};

const roundEnd = (endVal: Time): Time => {
    const end = { ...endVal };
    let tens = 0;

    if (end.minutes >= 56) {
        end.minutes = 0;
        end.hours++;

        return { hours: end.hours, minutes: end.minutes };
    }

    while (end.minutes > 9) {
        end.minutes = end.minutes - 10;
        tens++;
    }

    if (end.minutes >= 6) {
        end.minutes = 0;
        tens++;
    }
    else if (end.minutes === 0) end.minutes = 0;
    else if (end.minutes <= 4) end.minutes = 5;

    end.minutes = end.minutes + tens * 10;

    return { hours: end.hours, minutes: end.minutes };
};

export const calculateEndForFloat = (normalEndVal: Time, floatVal: FloatTime): Time => {
    const normalEnd = { ...normalEndVal };
    const float = { ...floatVal };
    let floatTimeRounded: Time;

    if (float.positive)
        floatTimeRounded = calculateTimeToAddForEndWithPositiveFloat(float);
    else
        floatTimeRounded = calculateTimeToAddForEndWithNegativeFloat(float);

    const gleitVorzeichen = float.positive ? 1 : -1;
    const sollEndHours = normalEnd.hours + floatTimeRounded.hours * gleitVorzeichen;
    const sollEndMins = normalEnd.minutes + floatTimeRounded.minutes * gleitVorzeichen;

    return { hours: sollEndHours, minutes: sollEndMins };
};

const calculateTimeToAddForEndWithPositiveFloat = (float: FloatTime): Time => {
    let { hours: floatHours, minutes: floatMins } = { ...float.time };
    let tens = 0;

    if (floatHours !== 0 && floatMins === 0) {
        floatMins = 4;
        // Ausgleich, weil man normalerweise schon plus 4 Minuten macht
        return { hours: floatHours, minutes: (floatMins - 4) };
    }

    while (floatMins > 9) {
        floatMins = floatMins - 10;
        tens++;
    }

    if (floatMins <= 4) floatMins = 4;
    else if (floatMins <= 9) floatMins = 9;

    floatMins = 10 * tens + floatMins;

    return { hours: floatHours, minutes: (floatMins - 4) };
};

const calculateTimeToAddForEndWithNegativeFloat = (float: FloatTime): Time => {
    let { hours: floatHours, minutes: floatMins } = { ...float.time };
    let tens = 0;

    if (floatHours !== 0 && floatMins === 0) {
        floatMins = 56;
        floatHours--;

        // Ausgleich, weil man normalerweise schon plus 4 Minuten macht
        return { hours: floatHours, minutes: (floatMins + 4) };

    } else if (floatHours === 0 && floatMins === 0) {
        floatMins = 1;

        return { hours: floatHours, minutes: (floatMins + 4) };
    }

    while (floatMins > 9) {
        floatMins = floatMins - 10;
        tens++;
    }

    if (floatMins === 0) {
        floatMins = 6;
        tens--;
    }
    else if (floatMins >= 6) floatMins = 6;
    else if (floatMins <= 5) floatMins = 1;

    floatMins = 10 * tens + floatMins;

    return { hours: floatHours, minutes: (floatMins + 4) };
};

export const calculateOptimizedEnd = (endVal: Time): Time => {
    const end = { ...endVal };
    let tens = 0;

    while (end.minutes > 9) {
        end.minutes = end.minutes - 10;
        tens++;
    }

    if (end.minutes === 0 && tens === 0) {
        end.minutes = 56;
        end.hours--;
    } else if (end.minutes === 0) {
        end.minutes = 6;
        tens--;
    }
    else if (end.minutes >= 6) end.minutes = 6;
    else if (end.minutes <= 5) end.minutes = 1;

    end.minutes = 10 * tens + end.minutes;

    return { hours: end.hours, minutes: end.minutes };
}

export const roundTimeForFloat = (normalEnd: Time, float: FloatTime): Time => {
    const endForFloat = calculateEndForFloat({ ...normalEnd }, { ...float });

    while (endForFloat.minutes >= 60) {
        endForFloat.hours++;
        endForFloat.minutes = endForFloat.minutes - 60;
    }

    while (endForFloat.minutes < 0) {
        endForFloat.hours--;
        endForFloat.minutes = endForFloat.minutes + 60;
    }

    return { hours: endForFloat.hours, minutes: endForFloat.minutes };
}

export const calculateIncreasedValue = (float: FloatTime): FloatTime => {
    const floatVorzeichen = float.positive ? 1 : -1;
    const floatTime = { ...float.time };

    // 1,0,4
    floatTime.hours = floatTime.hours * floatVorzeichen;
    floatTime.minutes = floatTime.minutes * floatVorzeichen;

    if (floatTime.hours === -0) floatTime.hours = 0;

    if (floatTime.minutes === 59) {
        floatTime.hours += 1;
        floatTime.minutes = 4;

        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    if (floatTime.hours === 0 && floatTime.minutes === -1) {
        floatTime.minutes = 4;
        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    if (floatTime.hours <= 0 && floatTime.minutes === -1) {
        floatTime.hours += 1;
        floatTime.minutes = -56;
        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    floatTime.minutes = floatTime.minutes + 5;
    return {
        positive: isFloatPositive(floatTime),
        time: { hours: floatTime.hours, minutes: floatTime.minutes }
    };
}

export const calculateDecreasedValue = (float: FloatTime): FloatTime => {
    const floatVorzeichen = float.positive ? 1 : -1;
    const floatTime = { ...float.time };

    // 1,0,4
    if (floatTime.hours === 0 && floatTime.minutes === 4) {
        floatTime.minutes = -1;

        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    floatTime.hours = floatTime.hours * floatVorzeichen;
    floatTime.minutes = floatTime.minutes * floatVorzeichen;

    if (floatTime.hours === -0) floatTime.hours = 0;

    if (floatTime.minutes === 4 && floatTime.hours === 0) {
        floatTime.minutes = -1
        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    if (floatTime.hours <= 0 && floatTime.minutes === -56) {
        floatTime.hours -= 1;
        floatTime.minutes = -1;
        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    if (floatTime.minutes === 4) {
        floatTime.hours -= 1;
        floatTime.minutes = 59;
        return {
            positive: isFloatPositive(floatTime),
            time: { hours: floatTime.hours, minutes: floatTime.minutes }
        };
    }

    floatTime.minutes = floatTime.minutes - 5;
    return {
        positive: isFloatPositive(floatTime),
        time: { hours: floatTime.hours, minutes: floatTime.minutes }
    };
}

const isFloatPositive = (time: Time): boolean => {
    return (time.hours >= 0 && time.minutes >= 0);
};
