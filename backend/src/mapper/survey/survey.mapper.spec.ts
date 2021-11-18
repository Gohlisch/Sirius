import { AppointmentSurveyDto } from '../../model/dtos/survey.dto';
import { Repetition } from '../../model/enum/repitition.enum';
import { TimeSlotDto } from '../../model/dtos/time-slot.dto';
import SurveyParticipantDto from '../../model/dtos/survey-participant.dto';
import { TimeSlot } from '../../model/entities/time-slot.entity';
import { AppointmentSurvey } from '../../model/entities/survey.entity';
import SurveyParticipant from '../../model/entities/survey-participant.entity';
import { mapSurveyDto } from './survey.mapper';

describe('survey mapper', () => {
  // time slot dtos
  const timeSlotDtos: TimeSlotDto[] = [];
  const start = new Date();
  const end = new Date();
  const timeSlotDto = new TimeSlotDto(start.toISOString(), end.toISOString());
  timeSlotDtos.push(timeSlotDto);
  timeSlotDtos.push(timeSlotDto);

  // time slot
  const timeSlots: TimeSlot[] = [];
  const timeSlot = new TimeSlot(start, end, undefined);
  timeSlots.push(timeSlot);
  timeSlots.push(timeSlot);

  //participant dtos
  const participantsDtos: SurveyParticipantDto[] = [];
  const surveyParticipantDto: SurveyParticipantDto = new SurveyParticipantDto(
    'name',
    start.toISOString(),
  );
  participantsDtos.push(surveyParticipantDto);
  participantsDtos.push(surveyParticipantDto);

  // participants
  const participants: SurveyParticipant[] = [];
  const participant = new SurveyParticipant('name', start, undefined);
  participants.push(participant);
  participants.push(participant);

  // survey
  const survey = new AppointmentSurvey(
    'title',
    Repetition.NEVER,
    'desc',
    timeSlots,
    participants,
  );

  const dto = new AppointmentSurveyDto(
    'title',
    Repetition.NEVER,
    'desc',
    timeSlotDtos,
    participantsDtos,
  );

  it('should map dto to entity', function () {
    const mappedSurvey = mapSurveyDto(dto);

    // check survey
    expect(mappedSurvey.title).toEqual(survey.title);
    expect(mappedSurvey.repetition).toEqual(survey.repetition);
    expect(mappedSurvey.description).toEqual(survey.description);

    // check timeSlots
    expect(mappedSurvey.slots.at(0).appointmentSurvey).toBe(mappedSurvey);
    expect(mappedSurvey.slots.at(0).start).toEqual(timeSlots.at(0).start);
    expect(mappedSurvey.slots.at(0).end).toEqual(timeSlots.at(0).end);
    expect(mappedSurvey.slots.at(1).appointmentSurvey).toEqual(mappedSurvey);
    expect(mappedSurvey.slots.at(1).start).toEqual(timeSlots.at(1).start);
    expect(mappedSurvey.slots.at(1).end).toEqual(timeSlots.at(1).end);

    // check participants
    expect(mappedSurvey.participants.at(0).name).toEqual(
      participants.at(0).name,
    );
    expect(mappedSurvey.participants.at(0).voteDate).toEqual(
      participants.at(0).voteDate,
    );
    expect(mappedSurvey.participants.at(0).appointmentSurvey).toBe(
      mappedSurvey,
    );
    expect(mappedSurvey.participants.at(1).name).toEqual(
      participants.at(1).name,
    );
    expect(mappedSurvey.participants.at(1).voteDate).toEqual(
      participants.at(1).voteDate,
    );
    expect(mappedSurvey.participants.at(1).appointmentSurvey).toBe(
      mappedSurvey,
    );
  });
});
