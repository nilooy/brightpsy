const { privatePath } = require("@ui/routes/privatePath");
const { stripe } = require("../config");

Meteor.methods({
  "stripe.checkOutSession"({
    itemId,
    itemTitle,
    itemImages,
    amount,
    quantity,
    toStripeId,
    cancelUrl,
    doctorId,
  }) {
    const createCheckoutSession = Meteor.wrapAsync(
      stripe.checkout.sessions.create,
      stripe.checkout.sessions
    );

    const singlePackagecost = amount * 100; // stripe requires amount in cents
    const user = Meteor.user();

    console.log(user);

    const checkoutSession = createCheckoutSession({
      payment_method_types: ["card"],
      line_items: [
        {
          name: itemTitle,
          images: itemImages,
          amount: singlePackagecost,
          quantity,
          currency: "eur",
        },
      ],
      // method: "instant",
      payment_intent_data: {
        application_fee_amount: 1,
        transfer_data: {
          destination: toStripeId,
        },
      },
      success_url: Meteor.absoluteUrl(
        privatePath.paymentSuccess + "?session_id={CHECKOUT_SESSION_ID}"
      ),
      cancel_url: cancelUrl,
      client_reference_id: user._id,
      customer_email: user.username,
      metadata: {
        itemId,
        doctorId,
        quantity,
      },
    });

    return checkoutSession;
  },
});
