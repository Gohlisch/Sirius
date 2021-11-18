import type {Repetition} from "./survey_dto";
import type {TimeSlot} from "./time_slot";

export interface AppointmentSurvey {
    title: string,
    id?: string,
    repetition: Repetition,
    description: string,
    slots: Array<TimeSlot>,
    indisposedParticipants: Array<any>,
}
