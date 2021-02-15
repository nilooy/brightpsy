const { Orders } = require("@api/services/stripe/model/OrderSchema");

Meteor.methods({
  "appointment.getAllByDoctor"({}) {
    const orders = Orders.find({ doctorId: Meteor.userId() });
  },
});
