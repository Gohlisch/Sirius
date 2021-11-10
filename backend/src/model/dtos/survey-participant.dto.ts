import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export default class SurveyParticipantDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsDate()
  voteDate: Date;

  @IsString()
  @IsOptional()
  surveyId?: string;

  constructor(name: string, voteDate: Date, surveyId?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.voteDate = voteDate;
    this.surveyId = surveyId;
  }
}
