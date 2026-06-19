import type { FloatTime, FloatTimeSign, Time } from '../static/importantTypes';

import { formatNumber } from './formatting';
import { getCookie } from './storage/cookieManager';

/**
 * Gibt die Differenz zwischen Start und Ende zurück
 * @param startTime Arbeitsbeginn
 * @param endTime Arbeitsende
 * @return Die Differenz zwischen Start und Ende
 */
export const calculateStartEndeTimeDiff = (startTime: Time, endTime: Time): Time => {
    const [startHours, startMins] = startTime;
    const [endHours, endMins] = endTime;

    let diffHours = endHours - startHours;
    let diffMins = endMins - startMins;

    if (diffMins < 0) {
        diffHours--;
        diffMins = diffMins + 60;
    }

    return [diffHours, diffMins];
};

/**
 * Berechnet die Differenz zwischen IST und SOLL
 * @param workTime Zeit die an dem Tag gearbeitet wird
 * @param sollTime Die zu erfüllende Arbeitszeit
 * @return Die Differenz zwischen Ist und Soll,
 *  sowie ob die positiv oder negativ ist
 */
export const calculateIstSollTimeDiff = (workTime: Time, sollTime: Time): [number, number, boolean] => {
    const [workHours, workMins] = workTime;
    const [sollHours, sollMins] = sollTime;

    let diffHours = workHours - sollHours;
    let diffMins: number;

    if (diffHours === 0 && workMins > sollMins) diffMins = workMins - sollMins;
    else if (diffHours > 0) {
        diffMins = 60 - sollMins + workMins;
        diffHours--;

        if (diffMins >= 60) {
            diffMins = diffMins - 60;
            diffHours++;
        }
    } else if (workMins > sollMins && workMins < 60) {
        diffMins = 60 - workMins + sollMins;
        diffHours++;
    } else diffMins = sollMins - workMins;

    if (diffMins < 0) {
        diffHours--;
        diffMins = diffMins + 60;
    }

    const positive = !((workHours === sollHours && workMins < sollMins) || workHours < sollHours);

    return [diffHours, diffMins, positive];
};

/**
 * Berechnet die reine Arbeitszeit (abzüglich Pause)
 * @param diffTime Zeit von Beginn bis Ende des Arbeitstages
 * @param pauseTime Pausenzeit
 * @return Die reine Arbeitszeit
 */
export const calculateWorkTime = (diffTime: Time, pauseTime: Time): Time => {
    const [diffHours, diffMins] = diffTime;
    const [pauseHours, pauseMins] = pauseTime;

    let workHours = diffHours - pauseHours;
    let workMins = diffMins - pauseMins;

    if (workMins < 0) {
        workHours--;
        workMins = workMins + 60;
    }

    return [workHours, workMins];
};

/**
 * Berechnet das Ende aus dem Start, der Pausenzeiten und dem Soll des Tages
 * @param startTime Arbeitsbeginn
 * @param pauseTime Pausenzeit
 * @param sollTime Wie viel Arbeitszeit soll erbracht werden
 * @return Das eigentliche Arbeitsende
 */
export const calculateNormalEnd = (startTime: Time, pauseTime: Time, sollTime: Time): Time => {
    const [startHours, startMins] = startTime;
    const [pauseHours, pauseMins] = pauseTime;
    const [sollHours, sollMins] = sollTime;

    let endHours = startHours + pauseHours + sollHours;
    let endMins = startMins + pauseMins + sollMins;

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

    return [endHours, endMins];
};

/**
 * Berechnet die gewertete Zeit aus dem gerundeten Start und dem gerundeten Ende
 * @param startTime Der Arbeitsbeginn
 * @param endTime Das Arbeitsende
 * @param pauseTime Die Pausenzeit
 * @return Die Zeit, die an dem Tag wirklich gearbeitet wird
 */
export const calculateIstTime = (startTime: Time, endTime: Time, pauseTime: Time): Time => {
    const [startHours, startMins] = roundStart(startTime);
    const [endHours, endMins] = roundEnd(endTime);
    const [_, pauseMins] = pauseTime;

    let istHours = endHours - startHours;
    let istMins = endMins - startMins - pauseMins;

    while (istMins < 0) {
        istHours--;
        istMins = istMins + 60;
    }

    if (istHours >= 12) istHours = istHours - 2;

    return [istHours, istMins];
};

/**
 * Gibt einem die Gleitzeit zurück, die man anhand der IstZeit macht
 * @param istTime Die aktuelle Arbeitszeit des Tages
 * @return Die Gleitzeit, die man damit macht
 */
export const calculateGleitzeit = (istTime: Time): Time => {
    const [istHours, istMins] = istTime;
    const [sollHours, sollMins] = getCookie('workTime') as Time;

    let gleitHours = istHours - sollHours;
    let gleitMins = istMins - sollMins;

    if (istHours < sollHours) {
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

    return [gleitHours, gleitMins];
};

/**
 * Arbeitsbeginn auf 10er und 5er abrunden
 * @param startTime Aktuelle Startzeit
 * @return Die abgerundete Startzeit
 */
export const roundStart = (startTime: Time): Time => {
    const startHours = startTime[0];
    let startMins = startTime[1];
    let tens = 0;

    while (startMins > 9) {
        startMins = startMins - 10;
        tens++;
    }

    if (startMins >= 5) startMins = 5;
    if (startMins <= 4) startMins = 0;

    startMins = startMins + tens * 10;

    return [startHours, startMins];
};

/**
 * Arbeitsende auf 10er und 5er aufrunden
 * @param endTime Aktuelle Endzeit
 * @return Das gerundete Ende
 */
export const roundEnd = (endTime: Time): Time => {
    let [endHours, endMins] = endTime;
    let tens = 0;

    if (endMins >= 56) {
        endMins = 0;
        endHours++;

        return [endHours, endMins];
    }

    while (endMins > 9) {
        endMins = endMins - 10;
        tens++;
    }

    if (endMins >= 6) {
        endMins = 0;
        tens++;
    } else if (endMins === 0) endMins = 0;
    else if (endMins <= 4) endMins = 5;

    endMins = endMins + tens * 10;

    return [endHours, endMins];
};

/**
 * Berechnet das Ende basierend auf dem eigentlichen Ende und der erwünschten Gleitzeit
 * @param {Time} normalEnd Die eigentliche Endzeit
 * @param {FloatTime} float Die gewünschte Gleitzeit
 * @return {Time}  Das Ende zu übergebenen Werten
 */
export const calculateEndForFloat = (normalEnd: Time, float: FloatTime): Time => {
    const [istEndHours, istEndMins] = normalEnd;
    const floatVorzeichen: FloatTimeSign = float[0];

    let floatTimeRounded: Time;

    if (floatVorzeichen === 1) floatTimeRounded = calculateTimeToAddForEndWithPositiveFloat(float);
    else floatTimeRounded = calculateTimeToAddForEndWithNegativeFloat(float);

    const [floatHours, floatMins] = floatTimeRounded;

    const sollEndHours = istEndHours + floatHours * floatVorzeichen;
    const sollEndMins = istEndMins + floatMins * floatVorzeichen;

    return [sollEndHours, sollEndMins];
};

/**
 * Berechnet die Zeit, die dem normalen Ende hinzugefügt werden muss,
 * um die gewünschte Gleitzeit zu bekommen, wenn diese positiv ist
 * @param {FloatTime} float Die gewünschte Gleitzeit
 * @return {Time} Zeit die zum Ende hinzugefügt werden muss
 */
export const calculateTimeToAddForEndWithPositiveFloat = (float: FloatTime): Time => {
    const floatHours = float[1];
    let floatMins = float[2];
    let tens = 0;

    if (floatHours !== 0 && floatMins === 0) {
        floatMins = 4;
        // Ausgleich, weil man normalerweise schon plus 4 Minuten macht
        return [floatHours, floatMins - 4];
    }

    while (floatMins > 9) {
        floatMins = floatMins - 10;
        tens++;
    }

    if (floatMins <= 4) floatMins = 4;
    else if (floatMins <= 9) floatMins = 9;

    floatMins = 10 * tens + floatMins;

    return [floatHours, floatMins - 4];
};

/**
 * Berechnet die Zeit, die dem normalen Ende hinzugefügt werden muss,
 * um die gewünschte Gleitzeit zu bekommen, wenn diese negative ist
 * @param {FloatTime} float Die gewünschte Gleitzeit
 * @return {Time} Zeit die zum Ende hinzugefügt werden muss
 */
export const calculateTimeToAddForEndWithNegativeFloat = (float: FloatTime): Time => {
    let [, gleitHours, gleitMins] = float;
    let tens = 0;

    if (gleitHours !== 0 && gleitMins === 0) {
        gleitMins = 56;
        gleitHours--;

        // Ausgleich, weil man normalerweise schon plus 4 Minuten macht
        return [gleitHours, gleitMins + 4];
    } else if (gleitHours === 0 && gleitMins === 0) return [gleitHours, 5];

    while (gleitMins > 9) {
        gleitMins = gleitMins - 10;
        tens++;
    }

    if (gleitMins === 0) {
        gleitMins = 6;
        tens--;
    } else if (gleitMins >= 6) gleitMins = 6;
    else if (gleitMins <= 5) gleitMins = 1;

    gleitMins = 10 * tens + gleitMins;

    return [gleitHours, gleitMins + 4];
};

/**
 * Nimmt die aktuelle Endezeit und gibt die Endezeit,
 * mit der die gleiche Menge an Gleitzeit gemacht wird und die am wenigsten Arbeitszeit erfordert
 * @param endTime Aktuelle Endezeit
 * @return Das optimierte Ende mit der geringsten Arbeitszeit
 */
export const calculateOptimizedEnd = (endTime: Time): Time => {
    let [endHours, endMins] = endTime;
    let tens = 0;

    while (endMins > 9) {
        endMins = endMins - 10;
        tens++;
    }

    if (endMins === 0 && tens === 0) {
        endMins = 56;
        endHours--;
    } else if (endMins === 0) {
        endMins = 6;
        tens--;
    } else if (endMins >= 6) endMins = 6;
    else if (endMins <= 5) endMins = 1;

    endMins = 10 * tens + endMins;

    return [endHours, endMins];
};

/**
 * Rechnet aus dem eigentlichen Ende und der Gleitzeit das Ende für diese Gleitzeit
 * @param {Time} normalEnd Das eigentliche Ende
 * @param {FloatTime} floatTime Die gewünschte Gleitzeit
 * @return {Time} Das Ende, um diese Gleitzeit zu machen
 */
export const roundTimeForFloat = (normalEnd: Time, floatTime: FloatTime): Time => {
    let [endHours, endMins] = calculateEndForFloat(normalEnd, floatTime);

    while (endMins >= 60) {
        endHours++;
        endMins = endMins - 60;
    }

    while (endMins < 0) {
        endHours--;
        endMins = endMins + 60;
    }

    return [endHours, endMins];
};

/**
 * Gibt die nächst größere valide Gleitzeit zurück
 * zum Beispiel: "+0.04" → "+0.09"
 * @param {FloatTime} float Die aktuelle Gleitzeit
 * @return {Time} Die nächst größere Gleitzeit
 */
export const calculateIncreasedValue = (float: FloatTime): Time => {
    const floatVorzeichen = float[0];
    let floatHours = float[1];
    let floatMins = float[2];

    floatHours = floatHours * floatVorzeichen;
    floatMins = floatMins * floatVorzeichen;

    if (Object.is(floatHours, -0)) floatHours = 0;

    if (floatMins === 59) {
        floatHours += 1;
        floatMins = 4;

        return [floatHours, floatMins];
    }

    if (floatHours === 0 && floatMins === -1) return [floatHours, 4];

    if (floatHours <= 0 && floatMins === -1) {
        floatHours += 1;
        floatMins = -56;
        return [floatHours, floatMins];
    }

    floatMins = floatMins + 5;
    return [floatHours, floatMins];
};

/**
 * Gibt die nächst kleinere valide Gleitzeit zurück
 * zum Beispiel: "+0.09" → "+0.04"
 * @param {FloatTime} float Die aktuelle Gleitzeit
 * @return {Time} Die nächst kleinere Gleitzeit
 */
export const calculateDecreasedValue = (float: FloatTime): Time => {
    const floatVorzeichen = float[0];
    let floatHours = float[1];
    let floatMins = float[2];
    // 1,0,4

    if (floatHours === 0 && floatMins === 4) return [floatHours, -1];

    floatHours = floatHours * floatVorzeichen;
    floatMins = floatMins * floatVorzeichen;

    if (Object.is(floatHours, -0)) floatHours = 0;

    if (floatMins === 4 && floatHours === 0) return [floatHours, -1];

    if (floatHours <= 0 && floatMins === -56) {
        floatHours -= 1;
        floatMins = -1;
        return [floatHours, floatMins];
    }

    if (floatMins === 4) {
        floatHours -= 1;
        floatMins = 59;
        return [floatHours, floatMins];
    }

    floatMins = floatMins - 5;
    return [floatHours, floatMins];
};

/**
 * Erzeugt einen lesbareren String, der zur Darstellung genutzt werden kann
 * @param float Die Gleitzeit, die aktuell in dem Feld steht
 * @return Die Gleitzeit als lesbarer String
 */
export const createGleitzeitAusgabeFromFloat = (float: Time): string => {
    let [gleitHours, gleitMins] = float;

    // Vorzeichen ermitteln
    const sign = gleitHours < 0 || gleitMins < 0 ? '-' : '+';

    // Absolutwerte nehmen
    gleitHours = Math.abs(gleitHours);
    gleitMins = Math.abs(gleitMins);

    return `${sign + gleitHours}.${formatNumber(gleitMins)}`;
};
