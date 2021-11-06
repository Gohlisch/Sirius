import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from '../model/entities/time-slot.entity';
import { TimeSlotService } from './time-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  providers: [TimeSlotService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
