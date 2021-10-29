/**
 * @constructor
 * @param {Date} start
 * @param {Date} end
 * @param {Array<string>} participants
 */
export class TimeSlot {
    private _start: Date;
    private _end: Date;
    private _participants: Array<string>;

    constructor(start: Date, end: Date, participants: Array<string> = []) {
        this._start = start;
        this._end = end;
        this._participants = [...participants];
    }

    public get start(): Date {
        return this._start;
    }

    public set start(value: Date) {
        this._start = value;
    }

    public get end(): Date {
        return this._end;
    }

    public set end(value: Date) {
        this._end = value;
    }

    public get participants(): Array<string> {
        return this._participants;
    }

    public set participants(value: Array<string>) {
        this._participants = value;
    }
}
