import { TimeSlot } from './time-slot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import SurveyParticipant from './survey-participant.entity';
import { Repetition } from '../enum/repitition.enum';

@Entity()
export class AppointmentSurvey {
  @PrimaryGeneratedColumn()
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
  participants: SurveyParticipant[];

  constructor(
    title: string,
    repetition: Repetition,
    description: string,
    slots: TimeSlot[],
    participants: SurveyParticipant[],
    id?: string,
  ) {
    this.title = title;
    this.id = id;
    this.repetition = repetition;
    this.description = description;
    this.slots = slots;
    this.participants = participants;
  }
}
