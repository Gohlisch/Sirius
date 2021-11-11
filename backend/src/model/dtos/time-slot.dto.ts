import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  constructor(start: string, end: string, surveyId?: string, id?: number) {
    this.start = start;
    this.end = end;
    this.surveyId = surveyId;
    this.id = id;
  }
}
