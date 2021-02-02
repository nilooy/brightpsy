import braintree from "braintree";

const { merchantId, publicKey, privateKey } = Meteor.settings.braintree;

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId,
  publicKey,
  privateKey,
});
