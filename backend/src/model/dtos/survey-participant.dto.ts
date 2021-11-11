import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class SurveyParticipantDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  id?: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDate()
  @ApiProperty({ description: 'date in milliseconds ' })
  voteDate: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  surveyId?: string;

  constructor(name: string, voteDate: Date, surveyId?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.voteDate = voteDate;
    this.surveyId = surveyId;
  }
}
