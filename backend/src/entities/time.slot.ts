/**
 * @constructor
 * @param {Date} start
 * @param {Date} end
 * @param {Array<string>} participants
 */
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export class TimeSlot {
  @PrimaryColumn()
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
