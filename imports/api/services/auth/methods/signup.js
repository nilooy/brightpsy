import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { addUserRoles } from "../../../utils/authorization";

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
        imageUrl:
          "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82",
      },
    });

    addUserRoles(userId, role);
  },
});
