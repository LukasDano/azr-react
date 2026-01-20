export type TimeAdv = {
    hours: number;
    minutes: number;
};

export type FloatTimeAdv = {
    positive: boolean;
    time: Time;
};

﻿export type Time = [number, number];

type FloatTimeSign = 1 | -1;
export type FloatTime = [FloatTimeSign, number, number];
