export type Time = [number, number];

export type FloatTimeSign = 1 | -1;
export type FloatTime = [FloatTimeSign, number, number];

export type WeekDay = 'mo' | 'tu' | 'we' | 'th' | 'fr';
export type WeekTime = Record<WeekDay, Time>;

export type TimeBalance = 'positiv' | 'negativ' | 'neutral';
