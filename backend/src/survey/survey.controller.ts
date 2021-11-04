import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { AppointmentSurvey } from '../entities/survey.entity';
import { SurveyService } from './survey.service';

@Controller('/api/survey')
export class SurveyController {
  private readonly logger = new Logger(SurveyController.name);

  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  getAllSurveys(): Promise<AppointmentSurvey[]> {
    this.logger.log('received GET for all surveys.');
    return this.surveyService.getAll();
  }

  @Get(':id')
  getSurveyById(@Param() params): Promise<AppointmentSurvey> {
    this.logger.log('received GET for surveys with id: ' + params.id + '.');
    return this.surveyService.getById(params.id);
  }

  @Post()
  createSurvey(@Body() survey: AppointmentSurvey): Promise<AppointmentSurvey> {
    this.logger.log('received POST for surveys.');
    return this.surveyService.create(survey);
  }

  @Delete(':id')
  deleteById(@Param() params): Promise<AppointmentSurvey> {
    this.logger.log('received DELETE for surveys with id: ' + params.id + '.');
    return this.surveyService.removeById(params.id);
  }
}
