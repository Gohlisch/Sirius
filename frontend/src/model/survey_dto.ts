import type {TimeSlot} from "./time_slot";
import {weekdayToNumber} from "../util/util";
import type {AppointmentSurvey} from "./appointment_survey";

export enum Repetition { NEVER, DAILY, WEEKLY };

export class SurveyDto {
    private _title: string;
    private _description: string;
    private _repetition: Repetition;
    private _day: Array<string> | undefined;
    private _weekday: Array<string> | undefined;
    private _start: Array<string>;
    private _end: Array<string>;

    constructor(title: string, description: string, repetition: Repetition, day: Array<string>, weekday: Array<string>, start: Array<string>, end: Array<string>) {
    this._title = title;
    this._description = description;
    this._repetition = repetition;
    this._day = day;
    this._weekday = weekday;
    this._start = start;
    this._end = end;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get repetition(): Repetition {
        return this._repetition;
    }

    public set repetition(value: Repetition) {
        this._repetition = value;
    }

    public get day(): Array<string> | undefined {
        return this._day;
    }

    public set day(value: Array<string>) {
        this._day = value;
    }

    public get weekday(): Array<string> | undefined {
        return this._weekday;
    }

    public set weekday(value: Array<string>) {
        this._weekday = value;
    }

    public get start(): Array<string> {
        return this._start;
    }

    public set start(value: Array<string>) {
        this._start = value;
    }

    public get end(): Array<string> {
        return this._end;
    }

    public set end(value: Array<string>) {
        this._end = value;
    }
}