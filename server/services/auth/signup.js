import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { addUserRoles } from "../../utils/authorization";

Meteor.methods({
  "auth.signup"(data) {
    const {
      firstName,
      lastName,
      email,
      tel,
      birthDate,
      password,
      confirmPassword,
      role,
    } = data;

    if (password !== confirmPassword) {
      throw new Meteor.Error(
        "auth.signup.passwordNotConfirm",
        "Password doesn't match with confirm password"
      );
    }

    const userId = Accounts.createUser({
      username: email,
      email: email,
      password: password,
      profile: {
        firstName,
        lastName,
        tel,
        birthDate,
      },
    });

    addUserRoles(userId, role);
  },
});
