import SurveyParticipant from '../../model/entities/survey-participant.entity';
import SurveyParticipantDto from '../../model/dtos/survey-participant.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';

export function mapSurveyParticipantDto(
  dto: SurveyParticipantDto,
  survey: AppointmentSurvey,
): SurveyParticipant {
  return new SurveyParticipant(
    dto.name,
    new Date(dto.voteDate).toISOString(),
    survey,
  );
}

export function mapSurveyParticipantDtos(
  dtos: SurveyParticipantDto[],
  survey: AppointmentSurvey,
): SurveyParticipant[] {
  const participants: SurveyParticipant[] = [];

  for (const dto of dtos) {
    participants.push(mapSurveyParticipantDto(dto, survey));
  }
  return participants;
}
