import {TimeSlot} from "./time_slot";
import {weekdayToNumber} from "../util/util";
import {AppointmentSurvey} from "./appointment_survey";

export type Repetition = "never" | "daily" | "weekly";

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

export function surveyDtoToAppointmentSurvey(dto: SurveyDto, id: string): AppointmentSurvey {
    const appointmentSurvey = new AppointmentSurvey(
        dto.title,
        id,
        dto.repetition,
        dto.description
    );

    if(dto.repetition === "never") {
        if(typeof(dto.day)==="string") {
            appointmentSurvey.slots.push(
                new TimeSlot(
                    new Date(`${dto.day}T${dto.start}:00`),
                    new Date(`${dto.day}T${dto.end}:00`)
                )
            );
        } else {
            appointmentSurvey.slots = dto.day.map((day, i) => {
                return new TimeSlot(
                    new Date(`${day}T${dto.start[i]}:00`),
                    new Date(`${day}T${dto.end[i]}:00`)
                );
            });
        }
    } else if(dto.repetition === "daily") {
        if(typeof(dto.start)==="string") {
            appointmentSurvey.slots.push(
                new TimeSlot(
                    new Date(`0001-01-01T${dto.start}:00`),
                    new Date(`0001-01-01T${dto.end}:00`)
                ));
        } else {
            appointmentSurvey.slots = dto.start.map((time, i) => {
                return new TimeSlot(
                    new Date(`0001-01-01T${dto.start[i]}:00`),
                    new Date(`0001-01-01T${dto.end[i]}:00`)
                );
            });
        }
    } else {
        if (typeof(dto.weekday) === "string") {
            appointmentSurvey.slots.push(
                new TimeSlot(
                    new Date(`0001-01-0${weekdayToNumber(dto.weekday)}T${dto.start}:00`),
                    new Date(`0001-01-0${weekdayToNumber(dto.weekday)}T${dto.end}:00`)
                )
            );
        } else {
            appointmentSurvey.slots = dto.weekday.map((weekday, i) => {
                return new TimeSlot(
                    new Date(`0001-01-0${weekdayToNumber(weekday)}T${dto.start[i]}:00`),
                    new Date(`0001-01-0${weekdayToNumber(weekday)}T${dto.end[i]}:00`)
                );
            });
        }
    }

    return appointmentSurvey;
}

/**
 * @TODO:  remove empty strings in client before submission
 * @param {SurveyDto} dto
 */
export function removeEmptyDtoEntries(dto: SurveyDto): void {
    for(const attr in dto) {
        if(dto[attr].filter) {
            dto[attr] = dto[attr].filter((x) => x !== "");
        }
    }
}
