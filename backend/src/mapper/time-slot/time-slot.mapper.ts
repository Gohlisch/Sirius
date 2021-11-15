import { TimeSlot } from '../../model/entities/time-slot.entity';
import { TimeSlotDto } from '../../model/dtos/time-slot.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';
import { mapSurveyParticipantDtos, mapSurveyParticipantEntities } from '../survey-participant/survey-participant.mapper';

export function mapTimeSlotDto(
  dto: TimeSlotDto,
  survey: AppointmentSurvey,
): TimeSlot {
  return new TimeSlot(new Date(dto.start), new Date(dto.end), survey);
}

export function mapTimeSlotDtos(
  dtos: TimeSlotDto[],
  survey: AppointmentSurvey,
): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];

  for (const dto of dtos) {
    timeSlots.push(mapTimeSlotDto(dto, survey));
  }
  return timeSlots;
}

export function mapTimeSlotEntity(timeSlot: TimeSlot): TimeSlotDto {
  return new TimeSlotDto(
    timeSlot.start.toISOString(),
    timeSlot.end.toISOString(),
    timeSlot.appointmentSurvey.id,
    mapSurveyParticipantEntities(timeSlot.participants),
    timeSlot.id,
  );
}

export function mapTimeSlotEntities(entities: TimeSlot[]): TimeSlotDto[] {
  const timeSlotEntities: TimeSlotDto[] = [];

  for (const entity of entities) {
    timeSlotEntities.push(mapTimeSlotEntity(entity));
  }

  return timeSlotEntities;
}
