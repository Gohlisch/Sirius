import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { TimeSlotModule } from './time-slot/time-slot.module';
import { SurveyModule } from './survey/survey.module';
import { AppointmentSurvey } from './entities/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'sirius',
      entities: [TimeSlot, AppointmentSurvey],
      synchronize: true,
    }),
    TimeSlotModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
