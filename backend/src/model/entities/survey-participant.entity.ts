import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentSurvey } from './survey.entity';

@Entity()
export default class SurveyParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: new Date().toISOString(),
  })
  voteDate: string;

  @ManyToOne(
    () => AppointmentSurvey,
    (appointmentSurvey) => appointmentSurvey.participants,
  )
  appointmentSurvey: AppointmentSurvey;

  constructor(
    name: string,
    voteDate: string,
    survey: AppointmentSurvey,
    id?: number,
  ) {
    this.name = name;
    this.voteDate = voteDate;
    this.appointmentSurvey = survey;
    this.id = id;
  }
}
