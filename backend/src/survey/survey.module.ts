import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
