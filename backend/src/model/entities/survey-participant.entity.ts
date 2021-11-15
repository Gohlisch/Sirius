import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export default class SurveyParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: new Date(),
  })
  voteDate: Date;

  @ManyToOne(
    () => AppointmentSurvey,
    (appointmentSurvey) => appointmentSurvey.indisposedParticipants,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinTable()
  appointmentSurvey: AppointmentSurvey;

  constructor(
    name: string,
    voteDate: Date,
    survey: AppointmentSurvey,
    id?: number,
  ) {
    this.name = name;
    this.voteDate = voteDate;
    this.appointmentSurvey = survey;
    this.id = id;
  }
}
