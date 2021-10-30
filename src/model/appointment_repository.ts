import {AppointmentSurvey} from "./appointment_survey";
import {randomString} from "../util/util";
import {TimeSlot} from "./time_slot";

export class AppointmentRepository {
    private _surveys: Array<AppointmentSurvey> = [];

    public getSurveys(): Array<AppointmentSurvey> {
        return this._surveys;
    }

    public getSurvey(id: string): AppointmentSurvey {
        return this._surveys.find(a => a.id===id);
    }

    public addSurvey(survey: AppointmentSurvey): void {
        this._surveys.push(survey);
    }
}

export const appointmentRepository = new AppointmentRepository();

appointmentRepository.addSurvey(new AppointmentSurvey(
    "FB42 Sportgruppe - Erstes Treffen",
    randomString(5),
    "never",
    "Hallo zusammen! Für unsere neugegründete Sportgruppe wollen wir ein initiales Treffen abhalten, bitte tragt ein, wann ihr Zeit habt! - Erik",
    [
        new TimeSlot(new Date("2021-06-15T08:00:00"), new Date("2021-06-15T09:00:00"), ["Erik", "Yoshua", "Frodo"]),
        new TimeSlot(new Date("2021-06-22T08:00:00"), new Date("2021-06-22T09:00:00"), ["Erik", "Peter", "Yoshua", "Frodo"]),
        new TimeSlot(new Date("2021-06-29T08:00:00"), new Date("2021-06-29T09:00:00"), ["Erik", "Peter", "Natalie", "Yoshua"]),
        new TimeSlot(new Date("2021-07-06T08:00:00"), new Date("2021-07-06T09:00:00"), ["Erik", "Natalie", "Frodo"]),
        new TimeSlot(new Date("2021-06-15T09:00:00"), new Date("2021-06-15T10:00:00"), ["Erik", "Yoshua", "Frodo"]),
        new TimeSlot(new Date("2021-06-22T09:00:00"), new Date("2021-06-22T10:00:00"), ["Erik", "Peter", "Yoshua", "Frodo"]),
        new TimeSlot(new Date("2021-06-29T09:00:00"), new Date("2021-06-29T10:00:00"), ["Erik", "Peter", "Natalie", "Yoshua"]),
        new TimeSlot(new Date("2021-07-06T09:00:00"), new Date("2021-07-06T10:00:00"), ["Erik", "Natalie", "Frodo"]),
    ]));
appointmentRepository.addSurvey(new AppointmentSurvey(
    "Lerngruppe Webtechnologien",
    randomString(5),
    "daily",
    "Wann habt ihr Zeit für die Lerngruppe? Teilt den Link gerne!",
    [
        new TimeSlot(new Date("2021-06-15T08:00:00"), new Date("2021-06-15T09:00:00"), []),
        new TimeSlot(new Date("2021-06-22T08:00:00"), new Date("2021-06-22T09:00:00"), []),
        new TimeSlot(new Date("2021-06-29T08:00:00"), new Date("2021-06-29T09:00:00"), []),
        new TimeSlot(new Date("2021-07-06T08:00:00"), new Date("2021-07-06T09:00:00"), []),
    ]));
appointmentRepository.addSurvey(new AppointmentSurvey(
    "Projektarbeit",
    randomString(5),
    "weekly",
    "Wir müssen noch einen Termin für unsere Gruppenarbeiten finden, bitte tragt einen Wochentag+Uhrzeit ein, wann es euch passt! LG Annika",
    [
        new TimeSlot(new Date("2021-06-22T05:00:00"), new Date("2021-06-22T06:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T07:00:00"), new Date("2021-06-22T08:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T08:00:00"), new Date("2021-06-22T09:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T09:00:00"), new Date("2021-06-22T10:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T10:00:00"), new Date("2021-06-22T11:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T12:00:00"), new Date("2021-06-22T13:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T13:00:00"), new Date("2021-06-22T14:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T14:00:00"), new Date("2021-06-22T15:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T15:00:00"), new Date("2021-06-22T16:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T16:00:00"), new Date("2021-06-22T17:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-22T17:00:00"), new Date("2021-06-22T18:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T05:00:00"), new Date("2021-06-23T06:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T07:00:00"), new Date("2021-06-23T08:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T08:00:00"), new Date("2021-06-23T09:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T09:00:00"), new Date("2021-06-23T10:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T10:00:00"), new Date("2021-06-23T11:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T12:00:00"), new Date("2021-06-23T13:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T13:00:00"), new Date("2021-06-23T14:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T14:00:00"), new Date("2021-06-23T15:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T15:00:00"), new Date("2021-06-23T16:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T16:00:00"), new Date("2021-06-23T17:00:00"), ["Annika"]),
        new TimeSlot(new Date("2021-06-23T17:00:00"), new Date("2021-06-23T18:00:00"), ["Annika"]),
    ]));