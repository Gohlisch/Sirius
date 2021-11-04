import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentSurvey } from '../entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentSurvey])],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
