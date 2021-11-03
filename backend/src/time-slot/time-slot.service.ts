import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlotEntity } from '../entities/time-slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlotEntity)
    private timeSlotRepository: Repository<TimeSlotEntity>,
  ) {}

  save(timeSlot: TimeSlotEntity): Promise<TimeSlotEntity> {
    return this.timeSlotRepository.save(timeSlot);
  }
}
