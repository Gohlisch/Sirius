import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    (appointmentSurvey) => appointmentSurvey.participants,
  )
  appointmentSurvey: AppointmentSurvey;
}
