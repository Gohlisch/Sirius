import { ApiStore } from "../../lib/ApiStore";
import type { AppointmentSurvey } from "../../model/appointment_survey"

class SurveyApiStore extends ApiStore<AppointmentSurvey> {
    constructor() {
        super("survey", "id");
    }
}

export const surveyApiStore = new SurveyApiStore();