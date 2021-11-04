const {AppointmentRepository} = require("../models/appointment_repository");

test("AppointmentRepository: should be empty after construction", () => {
    const repo = new AppointmentRepository();
    expect(repo.getSurveys().length).toBe(0);
});