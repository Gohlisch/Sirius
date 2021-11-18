import { IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import SurveyParticipantDto from './survey-participant.dto';

export class TimeSlotDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  id?: number;

  @IsDateString()
  @ApiProperty({
    description: 'date as iso date string',
    example: '2011-10-05T14:48:00.000Z',
  })
  start: string;

  @IsDateString()
  @ApiProperty({
    description: 'date as iso date string',
    example: '2011-10-05T14:48:00.000Z',
  })
  end: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  surveyId?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => SurveyParticipantDto)
  @ApiPropertyOptional({ type: [SurveyParticipantDto] })
  participants: SurveyParticipantDto[];

  constructor(start: string, end: string, surveyId?: string, participants?:Array<SurveyParticipantDto>, id?: number) {
    this.start = start;
    this.end = end;
    this.surveyId = surveyId;
    this.participants = participants;
    this.id = id;
  }
}
