import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlotEntity } from './entities/time-slot.entity';
import { TimeSlotModule } from './time-slot/time-slot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'sirius',
      entities: [TimeSlotEntity],
      synchronize: true,
    }),
    TimeSlotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
