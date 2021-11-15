import { IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class SurveyParticipantDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  id?: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty({
    description: 'date as date string',
    example: '2011-10-05T14:48:00.000Z',
  })
  voteDate: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  surveyId?: string;

  constructor(name: string, voteDate: string, surveyId?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.voteDate = voteDate;
    this.surveyId = surveyId;
  }
}
