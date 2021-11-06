import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => AppointmentSurvey, (survey) => survey.slots)
  appointmentSurvey: AppointmentSurvey;

  constructor(
    start: Date,
    end: Date,
    appointmentSurvey: AppointmentSurvey,
    id?: number,
  ) {
    this.start = start;
    this.end = end;
    this.appointmentSurvey = appointmentSurvey;
    this.id = id;
  }
}
