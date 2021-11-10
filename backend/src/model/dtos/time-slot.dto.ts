import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class TimeSlotDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsString()
  @IsOptional()
  surveyId?: string;

  constructor(start: Date, end: Date, surveyId?: string, id?: number) {
    this.start = start;
    this.end = end;
    this.surveyId = surveyId;
    this.id = id;
  }
}
