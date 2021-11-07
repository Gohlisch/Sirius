import { IsDate, IsNumber, IsString } from 'class-validator';

export default class SurveyParticipantDto {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsDate()
  voteDate: Date;

  @IsString()
  surveyId?: string;

  constructor(name: string, voteDate: Date, surveyId?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.voteDate = voteDate;
    this.surveyId = surveyId;
  }
}
