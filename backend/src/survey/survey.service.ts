import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentSurvey } from '../model/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  static surveyIdLength = 10;
  constructor(
    @InjectRepository(AppointmentSurvey)
    private surveyRepository: Repository<AppointmentSurvey>,
  ) {}

  /**
   * returns all saved surveys.
   */
  getAll(): Promise<AppointmentSurvey[]> {
    return this.surveyRepository.find({ relations: ['slots', 'participants'] });
  }

  /**
   * finds a survey for given id.
   * @param id of survey to search for
   */
  getById(id: string): Promise<AppointmentSurvey> {
    return this.surveyRepository.findOne({
      where: {
        id,
      },
      relations: ['slots', 'participants'],
    });
  }

  /**
   * removes survey by id.
   * @param id from survey to remove
   */
  async removeById(id: string): Promise<AppointmentSurvey> {
    const appointmentSurvey = await this.getById(id);
    if (appointmentSurvey) {
      return this.surveyRepository.remove(appointmentSurvey); // ToDo check if works
    }
  }

  /**
   * removes the given survey from db.
   * @param survey
   */
  remove(survey: AppointmentSurvey): Promise<AppointmentSurvey> {
    return this.surveyRepository.remove(survey);
  }

  async create(survey: AppointmentSurvey): Promise<AppointmentSurvey> {
    if (survey.id === undefined) {
      survey.id = await this.generateSurveyId();
    }
    return this.surveyRepository.save(survey);
  }

  async checkIfIdExists(id: string): Promise<boolean> {
    return !!(await this.surveyRepository.findOne({ where: { id } }));
  }

  private async generateSurveyId(): Promise<string> {
    let generatedId = '';
    do {
      generatedId = SurveyService.generateRandomString();
    } while (await this.checkIfIdExists(generatedId));

    return generatedId;
  }

  private static generateRandomString(): string {
    const urlAllowedChars =
      'ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz1234567890-_~.';
    let string = '';

    for (let i = 0; i < SurveyService.surveyIdLength; ++i) {
      string = string.concat(
        urlAllowedChars[Math.floor(urlAllowedChars.length * Math.random())],
      );
    }

    return string;
  }
}
