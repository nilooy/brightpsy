const { Orders } = require("@api/services/stripe/model/OrderSchema");

Meteor.methods({
  "appointment.getAllByDoctor"({}) {
    return Orders.find({ doctorId: Meteor.userId() });
  },
});
