import { stripe } from "../config";
import { Orders } from "../model/OrderSchema";

Meteor.methods({
  // Create orders
  "stripe.checkoutSuccess"({ sessionId }) {
    check(sessionId, String);

    if (Orders.findOne({ checkoutSessionId: sessionId })) {
      return Meteor.Error("order-exist", "Amount is not paid");
    }

    const getSession = Meteor.wrapAsync(
      stripe.checkout.sessions.retrieve,
      stripe.checkout.sessions
    );

    const session = getSession(sessionId);

    if (session.payment_status !== "paid")
      return Meteor.Error("payments-error", "Amount is not paid");

    // Create order log
    Orders.insert({
      packageId: session.metadata.itemId,
      doctorId: session.metadata.doctorId,
      userId: Meteor.userId(),
      stripeCustomerId: session.customer,
      quantity: session.metadata.quantity,
      checkoutSessionId: session.id,
      amount: session.amount_total / 100, // stripe returns amounts in cents,
      payment_intent: session.payment_intent,
      payment_status: session.payment_status,
    });

    return {
      success: true,
      packageId: session.metadata.itemId,
    };
  },

  "stripe.getOrdersByDoctor"({ appointmentExist }) {
    check(appointmentExist, Boolean);
    return Orders.find({
      doctorId: Meteor.userId(),
      appointmentId: { $exists: appointmentExist },
    }).fetch();
  },

  "stripe.getOrdersWithPackageByDoctor"({ appointmentExist }) {
    check(appointmentExist, Boolean);

    return Orders.rawCollection()
      .aggregate([
        {
          $match: {
            doctorId: Meteor.userId(),
            appointmentId: { $exists: appointmentExist },
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
});
