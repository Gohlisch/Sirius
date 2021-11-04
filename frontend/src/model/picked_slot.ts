import type { TimeSlot } from "./time_slot";

export interface PickedSlot {
    slot: TimeSlot,
    picked: boolean
}