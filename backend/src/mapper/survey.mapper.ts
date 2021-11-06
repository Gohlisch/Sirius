import { AppointmentSurvey } from '../model/entities/survey.entity';
import { AppointmentSurveyDto } from '../model/dtos/survey.dto';
import { mapTimeSlotDtos } from './time-slot.mapper';
import { mapSurveyParticipantDtos } from './survey-participant.mapper';

export default function mapSurveyDto(
  dto: AppointmentSurveyDto,
): AppointmentSurvey {
  return new AppointmentSurvey(
    dto.title,
    dto.repetition,
    dto.description,
    mapTimeSlotDtos(dto.slots),
    mapSurveyParticipantDtos(dto.participants),
  );
}
