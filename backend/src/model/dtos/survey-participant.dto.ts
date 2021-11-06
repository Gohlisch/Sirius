import { IsDate, IsNumber, IsString } from 'class-validator';

export default class SurveyParticipantDto {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsDate()
  voteDate: Date;

  constructor(name: string, voteDate: Date, id?: number) {
    this.id = id;
    this.name = name;
    this.voteDate = voteDate;
  }
}
