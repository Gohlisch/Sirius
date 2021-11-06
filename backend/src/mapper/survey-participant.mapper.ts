import SurveyParticipant from '../model/entities/survey-participant.entity';
import SurveyParticipantDto from '../model/dtos/survey-participant.dto';

export function mapSurveyParticipantDto(
  dto: SurveyParticipantDto,
): SurveyParticipant {
  return new SurveyParticipant(dto.name, dto.id);
}

export function mapSurveyParticipantDtos(
  dtos: SurveyParticipantDto[],
): SurveyParticipant[] {
  const participants: SurveyParticipant[] = [];

  for (const dto of dtos) {
    participants.push(mapSurveyParticipantDto(dto));
  }
  return participants;
}
