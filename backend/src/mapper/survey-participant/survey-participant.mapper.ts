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

export function mapSurveyParticipantEntity(
  participant: SurveyParticipant,
): SurveyParticipantDto {
  return new SurveyParticipantDto(
    participant.name,
    new Date(participant.voteDate),
    participant.appointmentSurvey.id,
    participant.id,
  );
}

export function mapSurveyParticipantEntities(
  participants: SurveyParticipant[],
): SurveyParticipantDto[] {
  const mappedParticipants: SurveyParticipantDto[] = [];

  for (const entity of participants) {
    mappedParticipants.push(mapSurveyParticipantEntity(entity));
  }

  return mappedParticipants;
}
