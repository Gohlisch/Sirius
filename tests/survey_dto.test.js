const {surveyDtoToAppointmentSurvey} = require("../models/survey_dto");

test("slots should be generated", ()=> {
    const dto = {
        title: '123',
        description: '123',
        repetition: 'daily',
        start: [ '01:01' ],
        end: [ '01:01' ],
        day: undefined,
        weekday: undefined
    };
    const survey = surveyDtoToAppointmentSurvey(dto, 'jaloley');
    expect(survey).toBeDefined();
    expect(survey.slots).toBeDefined();
    expect(survey.slots[0].start).toBeDefined();
    expect(survey.slots[0].end).toBeDefined();
});
