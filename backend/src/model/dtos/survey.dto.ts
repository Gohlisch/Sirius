import { Repetition } from '../enum/repitition.enum';
import { TimeSlot } from '../entities/time-slot.entity';
import SurveyParticipant from '../entities/survey-participant.entity';
import { IsString, ValidateNested } from 'class-validator';

export class AppointmentSurveyDto {
  @IsString()
  id?: string;

  @IsString()
  title: string;

  @ValidateNested()
  repetition: Repetition;

  @IsString()
  description: string;

  @ValidateNested()
  slots: TimeSlot[];

  @ValidateNested()
  participants: SurveyParticipant[];

  constructor(
    title: string,
    id: string,
    repetition: Repetition,
    description: string,
    slots: TimeSlot[],
    participants: SurveyParticipant[],
  ) {
    this.title = title;
    this.id = id;
    this.repetition = repetition;
    this.description = description;
    this.slots = slots;
    this.participants = participants;
  }
}
