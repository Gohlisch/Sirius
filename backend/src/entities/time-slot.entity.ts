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
  appointmentSurveys: AppointmentSurvey[];

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }
}
