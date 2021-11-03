import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlotEntity } from '../entities/time-slot.entity';
import { TimeSlotService } from './time-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlotEntity])],
  providers: [TimeSlotService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
