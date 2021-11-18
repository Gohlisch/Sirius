import SurveyParticipant from '../../model/entities/survey-participant.entity';
import SurveyParticipantDto from '../../model/dtos/survey-participant.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';

export function mapSurveyParticipantDto(
  dto: SurveyParticipantDto,
  survey: AppointmentSurvey,
): SurveyParticipant {
  return new SurveyParticipant(dto.name, new Date(dto.voteDate), survey);
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

export function mapSurveyParticipantEntity(
  entity: SurveyParticipant,
): SurveyParticipantDto {
  return new SurveyParticipantDto(
    entity.name,
    new Date(entity.voteDate).toISOString(),
    entity.appointmentSurvey.id,
    entity.id,
  );
}

export function mapSurveyParticipantEntities(
  entities: SurveyParticipant[],
): SurveyParticipantDto[] {
  const participantDtos: SurveyParticipantDto[] = [];

  if(entities) {
    for (const entity of entities) {
      participantDtos.push(mapSurveyParticipantEntity(entity));
    }
  }

  return participantDtos;
}
