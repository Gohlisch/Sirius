import type {TimeSlot} from "../model/time_slot";

/**
 * @param {TimeSlot} timeslot - to be validated
 * @returns {boolean}
 */
export function validateStartBeforeEnd(timeslot: TimeSlot): boolean {
    return timeslot.start < timeslot.end;
}
