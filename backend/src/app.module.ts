import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './model/entities/time-slot.entity';
import { TimeSlotModule } from './time-slot/time-slot.module';
import { SurveyModule } from './survey/survey.module';
import { AppointmentSurvey } from './model/entities/survey.entity';
import SurveyParticipant from './model/entities/survey-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'sirius',
      entities: [TimeSlot, AppointmentSurvey, SurveyParticipant],
      synchronize: true,
    }),
    TimeSlotModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
