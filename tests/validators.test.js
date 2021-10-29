const TimeSlot = require("../models/time_slot");
const validateStartBeforeEnd = require("../logic/validators");

test("TimeSlot: true if start before end date", () => {
    const slot = new TimeSlot(
        new Date(2021, 1, 1, 1),
        new Date(2021, 1, 1, 2),
        []);
    expect(validateStartBeforeEnd(slot)).toBe(true);
});

test("TimeSlot: false if start after end date", () => {
    const startAfterEnd = new TimeSlot(
        new Date(2021, 1, 1, 2),
        new Date(2021, 1, 1, 1),
        []);
    expect(validateStartBeforeEnd(startAfterEnd)).toBe(false);
});
