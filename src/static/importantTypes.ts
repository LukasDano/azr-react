export type Time = [number, number];

export type FloatTimeSign = 1 | -1;
export type FloatTime = [FloatTimeSign, number, number];

export type WeekDay = "mo" | "tu" | "we" | "th" | "fr";
export type WeekTime = Record<WeekDay, Time>;

export type TimeBalance = "positiv" | "negativ" | "neutral";

export type FeiertageHamburg = {
    Neujahr: Date;
    Karfreitag: Date;
    Ostermontag: Date;
    TagDerArbeit: Date;
    ChristiHimmelfahrt: Date;
    Pfingstmontag: Date;
    TagDerDeutschenEinheit: Date;
    Reformationstag: Date;
    Heiligabend: Date;
    ErsterWeihnachtsfeiertag: Date;
    ZweiterWeihnachtsfeiertag: Date;
    Silvester: Date;
};
