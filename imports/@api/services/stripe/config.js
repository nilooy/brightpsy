export const stripe = require("stripe")(Meteor.settings.stripe.secretKey);
