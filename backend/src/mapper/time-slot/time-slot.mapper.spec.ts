import { TimeSlotDto } from '../../model/dtos/time-slot.dto';
import { AppointmentSurvey } from '../../model/entities/survey.entity';
import { Repetition } from '../../model/enum/repitition.enum';
import { TimeSlot } from '../../model/entities/time-slot.entity';
import { mapTimeSlotDto, mapTimeSlotDtos } from './time-slot.mapper';

describe('time-slot mapper', () => {
  const start = new Date();
  const end = new Date();
  const dto = new TimeSlotDto(start, end);
  const survey: AppointmentSurvey = new AppointmentSurvey(
    'title',
    Repetition.NEVER,
    'des',
    [],
    [],
  );
  const timeSlot = new TimeSlot(start, end, survey);

  it('should map dto to entity', function () {
    const mappedTimeSlot = mapTimeSlotDto(dto, survey);

    expect(mappedTimeSlot).toEqual(timeSlot);
  });

  it('should map dtos to entity', function () {
    const timeSlots: TimeSlot[] = [];
    timeSlots.push(timeSlot);
    timeSlots.push(timeSlot);

    const timeSlotDtos: TimeSlotDto[] = [];
    timeSlotDtos.push(dto);
    timeSlotDtos.push(dto);

    const mappedTimeSlots = mapTimeSlotDtos(timeSlotDtos, survey);

    expect(mappedTimeSlots).toEqual(timeSlots);
  });
});
