import { ApiStore } from "../_ApiStore";
import type { AppointmentSurvey } from "../../model/appointment_survey"

function dtoToEntity(dto): AppointmentSurvey {
    dto.slots = dto.slots.map(slot =>{
        slot.start = new Date(slot.start);
        slot.end = new Date(slot.end);
        return slot;
    });
    return dto;
}

class SurveyApiStore extends ApiStore<AppointmentSurvey> {
    constructor() {
        super("survey", "id", dtoToEntity);
    }
}

export const surveyApiStore = new SurveyApiStore();