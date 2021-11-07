import { AppointmentSurvey } from '../../model/entities/survey.entity';
import { AppointmentSurveyDto } from '../../model/dtos/survey.dto';
import { mapTimeSlotDtos } from '../time-slot/time-slot.mapper';
import { mapSurveyParticipantDtos } from '../survey-participant/survey-participant.mapper';

export function mapSurveyDto(dto: AppointmentSurveyDto): AppointmentSurvey {
  const survey = new AppointmentSurvey(
    dto.title,
    dto.repetition,
    dto.description,
    [],
    [],
    dto.id,
  );
  survey.participants = mapSurveyParticipantDtos(dto.participants, survey);
  survey.slots = mapTimeSlotDtos(dto.slots, survey);
  return survey;
}

export function mapSurveyDtos(
  dtos: AppointmentSurveyDto[],
): AppointmentSurvey[] {
  const surveys: AppointmentSurvey[] = [];

  for (const dto of dtos) {
    surveys.push(mapSurveyDto(dto));
  }

  return surveys;
}
