import { tokenGenerator } from "../utils/tokenGen";

Meteor.methods({
  "twilio.tokenGen"() {
    return tokenGenerator(this.userId);
  },
});
