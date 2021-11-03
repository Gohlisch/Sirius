import { Test, TestingModule } from '@nestjs/testing';
import { TimeSlotService } from './time-slot.service';

describe('TimeSlotService', () => {
  let service: TimeSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSlotService],
    }).compile();

    service = module.get<TimeSlotService>(TimeSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
