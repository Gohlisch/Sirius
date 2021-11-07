import { TimeSlot } from '../../model/entities/time-slot.entity';
import { TimeSlotDto } from '../../model/dtos/time-slot.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';

export function mapTimeSlotDto(
  dto: TimeSlotDto,
  survey: AppointmentSurvey,
): TimeSlot {
  return new TimeSlot(dto.start, dto.end, survey);
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
