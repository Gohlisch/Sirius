//@ts-check

import type {Repetition} from "./survey_dto";
import type {TimeSlot} from "./time_slot";

export class AppointmentSurvey {
    private _title: string;
    private _id: string;
    private _repetition: Repetition;
    private _description: string;
    private _slots: Array<TimeSlot>;
    private _indisposedParticipants: Array<string>;

    constructor(title: string, id: string, repetition: Repetition, description: string = '', slots: TimeSlot[] = [], indisposedParticipants: string[] = []) {
        this._title = title;
        this._id = id;
        this._repetition = repetition;
        this._description = description;
        this._slots = [...slots];
        this._indisposedParticipants = [...indisposedParticipants];
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get repetition(): Repetition {
        return this._repetition;
    }

    public set repetition(value: Repetition) {
        this._repetition = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get slots(): Array<TimeSlot> {
        return this._slots;
    }

    public set slots(value: Array<TimeSlot>) {
        this._slots = value;
    }

    public get indisposedParticipants(): Array<string> {
        return this._indisposedParticipants;
    }

    public set indisposedParticipants(value: Array<string>) {
        this._indisposedParticipants = value;
    }
}
