import { TimeSlot } from './time-slot.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import SurveyParticipant from './survey-participant.entity';
import { Repetition } from '../enum/repitition.enum';

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

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.appointmentSurvey, {
    cascade: true,
  })
  slots: TimeSlot[];

  @OneToMany(
    () => SurveyParticipant,
    (surveyParticipant) => surveyParticipant.appointmentSurvey,
    {
      cascade: true,
    },
  )
  indisposedParticipants: SurveyParticipant[];

  constructor(
    title: string,
    repetition: Repetition,
    description: string,
    slots: TimeSlot[],
    indisposedParticipants: SurveyParticipant[],
    id?: string,
  ) {
    this.title = title;
    this.id = id;
    this.repetition = repetition;
    this.description = description;
    this.slots = slots;
    this.indisposedParticipants = indisposedParticipants;
  }
}
