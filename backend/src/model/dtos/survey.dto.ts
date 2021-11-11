import { Repetition } from '../enum/repitition.enum';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TimeSlotDto } from './time-slot.dto';
import SurveyParticipantDto from './survey-participant.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AppointmentSurveyDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsEnum(Repetition)
  @ApiProperty({ enum: Repetition })
  repetition: Repetition;

  @IsString()
  @ApiProperty()
  description: string;

  @ValidateNested()
  @ApiProperty({ type: [TimeSlotDto] })
  slots: TimeSlotDto[];

  @ValidateNested()
  @IsOptional()
  @ApiProperty({ type: [SurveyParticipantDto] })
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
