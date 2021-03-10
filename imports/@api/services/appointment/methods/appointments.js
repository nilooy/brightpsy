const { startOfDay, endOfDay } = require("date-fns");
const { Appointments } = require("../model/AppointmentCollection");

Meteor.methods({
  "appointment.create"({
    startsAt,
    endsAt,
    packageId,
    userId,
    doctorId,
    orderId,
  }) {
    check(startsAt, Date);
    check(endsAt, Date);
    check(packageId, String);
    check(userId, String);
    check(doctorId, String);
    check(orderId, String);

    return Appointments.insert({
      startsAt,
      endsAt,
      packageId,
      userId,
      doctorId,
      orderId,
    });
  },
  "appointment.getAllByDoctor"({}) {
    return Appointments.rawCollection()
      .aggregate([
        {
          $match: {
            doctorId: Meteor.userId(),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "price_packages",
            localField: "packageId",
            foreignField: "_id",
            as: "package",
          },
        },
        { $unwind: "$package" },
      ])
      .toArray();
  },

  "appointment.getAllByDoctorByDay"({ doctorId, date }) {
    console.log(new Date(date));

    return Appointments.find({
      startsAt: { $gte: startOfDay(date), $lte: endOfDay(date) },
    }).fetch();
  },
});
