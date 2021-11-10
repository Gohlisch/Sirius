import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { AppointmentSurveyDto } from '../model/dtos/survey.dto';
import {
  mapSurveyDto,
  mapSurveyEntities,
  mapSurveyEntity,
} from '../mapper/survey/survey.mapper';

@Controller('/api/survey')
export class SurveyController {
  private readonly logger = new Logger(SurveyController.name);

  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async getAllSurveys(): Promise<AppointmentSurveyDto[]> {
    this.logger.log('received GET for all surveys.');
    return mapSurveyEntities(await this.surveyService.getAll());
  }

  @Get(':id')
  async getSurveyById(@Param() params): Promise<AppointmentSurveyDto> {
    this.logger.log('received GET for surveys with id: ' + params.id + '.');
    return mapSurveyEntity(await this.surveyService.getById(params.id));
  }

  @Post() // ToDo redirect to ("address"/survey/"id")
  async createSurvey(
    @Body() survey: AppointmentSurveyDto,
  ): Promise<AppointmentSurveyDto> {
    this.logger.log('received POST for surveys.');
    return mapSurveyEntity(
      await this.surveyService.create(mapSurveyDto(survey)),
    );
  }

  @Delete(':id')
  async deleteById(@Param() params): Promise<AppointmentSurveyDto> {
    this.logger.log('received DELETE for surveys with id: ' + params.id + '.');
    return mapSurveyEntity(await this.surveyService.removeById(params.id));
  }
}
