import SurveyParticipantDto from '../model/dtos/survey-participant.dto';
import { AppointmentSurvey } from '../model/entities/survey.entity';
import { Repetition } from '../model/enum/repitition.enum';
import SurveyParticipant from '../model/entities/survey-participant.entity';
import { mapSurveyParticipantDto } from './survey-participant.mapper';

describe('survey-participant mapper', () => {
  let dto: SurveyParticipantDto;
  let survey: AppointmentSurvey;
  let date: Date;

  beforeAll(() => {
    date = new Date();
    dto = new SurveyParticipantDto('name', date);
    survey = new AppointmentSurvey('title', Repetition.NEVER, 'des', [], []);
  });

  it('should map dto to entity', function () {
    const surveyParticipant: SurveyParticipant = new SurveyParticipant(
      'name',
      date,
      survey,
    );
    const surveyParticipantMapped = mapSurveyParticipantDto(dto, survey);
    expect(surveyParticipantMapped).toEqual(surveyParticipant);
  });
});
