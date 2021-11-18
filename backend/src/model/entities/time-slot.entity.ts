import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SurveyParticipant from './survey-participant.entity';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => AppointmentSurvey, (survey) => survey.slots, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  appointmentSurvey: AppointmentSurvey;

  @OneToMany(
    () => SurveyParticipant,
    (surveyParticipant) => surveyParticipant.appointmentSurvey,
    {
      cascade: true,
    },
  )
  participants: SurveyParticipant[];

  constructor(
    start: Date,
    end: Date,
    appointmentSurvey: AppointmentSurvey,
    participants?: Array<SurveyParticipant>,
    id?: number,
  ) {
    this.start = start;
    this.end = end;
    this.appointmentSurvey = appointmentSurvey;
    this.participants = participants;
    this.id = id;
  }
}
