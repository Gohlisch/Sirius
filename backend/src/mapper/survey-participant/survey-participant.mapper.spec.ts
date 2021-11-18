import SurveyParticipantDto from '../../model/dtos/survey-participant.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';
import { Repetition } from '../../model/enum/repitition.enum';
import SurveyParticipant from '../../model/entities/survey-participant.entity';
import {
  mapSurveyParticipantDto,
  mapSurveyParticipantDtos,
} from './survey-participant.mapper';

describe('survey-participant mapper', () => {
  const survey: AppointmentSurvey = new AppointmentSurvey(
    'title',
    Repetition.NEVER,
    'des',
    [],
    [],
  );
  const date: Date = new Date();
  const dto: SurveyParticipantDto = new SurveyParticipantDto(
    'name',
    date.toISOString(),
  );
  const surveyParticipant: SurveyParticipant = new SurveyParticipant(
    'name',
    date,
    survey,
  );

  it('should map dto to entity', function () {
    const surveyParticipantMapped = mapSurveyParticipantDto(dto, survey);
    expect(surveyParticipantMapped).toEqual(surveyParticipant);
  });

  it('should map dtos to entities', function () {
    const surveyParticipants: SurveyParticipant[] = [];
    surveyParticipants.push(surveyParticipant);
    surveyParticipants.push(new SurveyParticipant('name2', date, survey));

    const surveyParticipantDtos: SurveyParticipantDto[] = [];
    surveyParticipantDtos.push(dto);
    surveyParticipantDtos.push(
      new SurveyParticipantDto('name2', date.toISOString()),
    );
    const surveyParticipantsMapped = mapSurveyParticipantDtos(
      surveyParticipantDtos,
      survey,
    );

    expect(surveyParticipantsMapped).toEqual(surveyParticipants);
  });
});
