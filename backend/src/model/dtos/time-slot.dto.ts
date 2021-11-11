import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimeSlotDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  id?: number;

  @IsDate()
  @ApiProperty({ description: 'date in milliseconds ' })
  start: Date;

  @IsDate()
  @ApiProperty({ description: 'date in milliseconds ' })
  end: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  surveyId?: string;

  constructor(start: Date, end: Date, surveyId?: string, id?: number) {
    this.start = start;
    this.end = end;
    this.surveyId = surveyId;
    this.id = id;
  }
}
