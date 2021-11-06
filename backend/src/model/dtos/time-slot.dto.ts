import { IsDate, IsNumber, ValidateNested } from 'class-validator';
import { AppointmentSurvey } from '../entities/survey.entity';

export class TimeSlotDto {
  @IsNumber()
  id?: number;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @ValidateNested()
  appointmentSurvey: AppointmentSurvey;

  constructor(start: Date, end: Date, appointmentSurvey: AppointmentSurvey) {
    this.start = start;
    this.end = end;
    this.appointmentSurvey = appointmentSurvey;
  }
}
