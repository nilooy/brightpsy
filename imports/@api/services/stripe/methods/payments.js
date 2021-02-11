const { stripe } = require("../config");

Meteor.methods({
  "stripe.checkOutSession"({ itemTitle, amount, quantity, toStripeId }) {
    const createCheckoutSession = Meteor.wrapAsync(
      stripe.checkout.sessions.create,
      stripe.checkout.sessions
    );

    console.log(amount);

    return createCheckoutSession({
      payment_method_types: ["card"],
      line_items: [
        {
          name: itemTitle,
          amount: amount * 100,
          quantity,
          currency: "eur",
        },
      ],
      payment_intent_data: {
        application_fee_amount: 1,
        transfer_data: {
          destination: toStripeId,
        },
      },
      success_url: Meteor.absoluteUrl("/app"),
      cancel_url: Meteor.absoluteUrl("/app"),
    });
  },
});
