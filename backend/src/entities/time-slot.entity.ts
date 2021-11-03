/**
 * @constructor
 * @param {Date} start
 * @param {Date} end
 * @param {Array<string>} participants
 */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TimeSlotEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  start: Date;
  @Column()
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }
}
