import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentSurvey } from '../model/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
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

  create(survey: AppointmentSurvey): Promise<AppointmentSurvey> {
    return this.surveyRepository.save(survey);
  }
}
