import { TimeSlot } from '../../model/entities/time-slot.entity';
import { TimeSlotDto } from '../../model/dtos/time-slot.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';

export function mapTimeSlotDto(
  dto: TimeSlotDto,
  survey: AppointmentSurvey,
): TimeSlot {
  return new TimeSlot(
    new Date(dto.start).toISOString(),
    new Date(dto.end).toISOString(),
    survey,
  );
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
    new Date(timeSlot.start),
    new Date(timeSlot.end),
    timeSlot.appointmentSurvey.id,
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
