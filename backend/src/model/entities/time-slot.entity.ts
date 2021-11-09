import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: string;

  @Column()
  end: string;

  @ManyToOne(() => AppointmentSurvey, (survey) => survey.slots)
  appointmentSurvey: AppointmentSurvey;

  constructor(
    start: string,
    end: string,
    appointmentSurvey: AppointmentSurvey,
    id?: number,
  ) {
    this.start = start;
    this.end = end;
    this.appointmentSurvey = appointmentSurvey;
    this.id = id;
  }
}
