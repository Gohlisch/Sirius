import { TimeSlot } from '../model/entities/time-slot.entity';
import { TimeSlotDto } from '../model/dtos/time-slot.dto';

export function mapTimeSlotDto(dto: TimeSlotDto): TimeSlot {
  return new TimeSlot(dto.start, dto.end, dto.appointmentSurvey);
}

export function mapTimeSlotDtos(dtos: TimeSlotDto[]): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];

  for (const dto of dtos) {
    timeSlots.push(mapTimeSlotDto(dto));
  }
  return timeSlots;
}
