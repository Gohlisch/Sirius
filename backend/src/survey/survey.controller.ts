import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ApiParam } from '@nestjs/swagger';

@Controller('/api/survey')
export class SurveyController {
  private readonly logger = new Logger(SurveyController.name);

  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async getAllSurveys(): Promise<AppointmentSurveyDto[]> {
    this.logger.log('received GET for all surveys.');
    return mapSurveyEntities(await this.surveyService.getAll());
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async getSurveyById(@Param() params): Promise<AppointmentSurveyDto> {
    this.logger.log('received GET for surveys with id: ' + params.id + '.');
    const survey = await this.surveyService.getById(params.id);

    if (survey) {
      return mapSurveyEntity(survey);
    } else {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
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

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deleteById(@Param() params): Promise<AppointmentSurveyDto> {
    this.logger.log('received DELETE for surveys with id: ' + params.id + '.');
    const survey = await this.surveyService.removeById(params.id);

    if (survey) {
      return mapSurveyEntity(survey);
    } else {
      throw new HttpException('user to delete not found', HttpStatus.NOT_FOUND);
    }
  }
}
