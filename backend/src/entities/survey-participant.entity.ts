import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class surveyParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
