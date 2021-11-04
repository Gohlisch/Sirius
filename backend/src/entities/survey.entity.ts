import { TimeSlot } from './time.slot';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum Repetition {
  NEVER,
  DAILY,
  WEEKLY,
}

@Entity()
export class AppointmentSurvey {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Repetition,
  })
  repetition: Repetition;

  @Column()
  description: string;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.appointmentSurvey)
  slots: Array<TimeSlot>;

  //indisposedParticipants: Array<string>;

  constructor(
    title: string,
    id: string,
    repetition: Repetition,
    description = '',
    slots: TimeSlot[] = [],
    /*indisposedParticipants: string[] = [],*/
  ) {
    this.title = title;
    this.id = id;
    this.repetition = repetition;
    this.description = description;
    this.slots = [...slots];
    //this.indisposedParticipants = [...indisposedParticipants];
  }
}
