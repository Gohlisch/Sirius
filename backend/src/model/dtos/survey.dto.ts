import { Repetition } from '../enum/repitition.enum';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TimeSlotDto } from './time-slot.dto';
import SurveyParticipantDto from './survey-participant.dto';

export class AppointmentSurveyDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  title: string;

  @IsEnum(Repetition)
  repetition: Repetition;

  @IsString()
  description: string;

  @ValidateNested()
  slots: TimeSlotDto[];

  @ValidateNested()
  participants: SurveyParticipantDto[];

  constructor(
    title: string,
    repetition: Repetition,
    description: string,
    slots: TimeSlotDto[],
    participants: SurveyParticipantDto[],
    id?: string,
  ) {
    this.title = title;
    this.repetition = repetition;
    this.description = description;
    this.slots = slots;
    this.participants = participants;
    this.id = id;
  }
}
