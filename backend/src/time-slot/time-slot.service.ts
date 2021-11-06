import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from '../model/entities/time-slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
  ) {}

  save(timeSlot: TimeSlot): Promise<TimeSlot> {
    return this.timeSlotRepository.save(timeSlot);
  }
}
