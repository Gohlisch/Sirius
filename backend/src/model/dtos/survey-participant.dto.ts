import { IsDate, IsNumber, IsString } from 'class-validator';

export default class SurveyParticipantDto {
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsDate()
  voteDate: Date;

  @IsString()
  appointmentSurveyId: string;
}
