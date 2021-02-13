import { privatePath } from "@ui/routes/privatePath";
import { stripe } from "../config";

Meteor.methods({
  "stripe.createAccount"() {
    const createAccount = Meteor.wrapAsync(
      stripe.accounts.create,
      stripe.accounts
    );
    const createAccountLink = Meteor.wrapAsync(
      stripe.accountLinks.create,
      stripe.accountLinks
    );

    const user = Meteor.user();

    console.log(user);

    let account = {};

    if (user?.stripe?.id) {
      account["id"] = user.stripe.id;
    } else {
      account = createAccount({
        country: "IT",
        type: "express",
        email: user.username,
      });

      if (account) {
        Meteor.users.update(Meteor.userId(), {
          $set: { [`stripe.id`]: account.id },
        });
      }
    }

    console.log(account);

    const accountLinks = createAccountLink({
      account: account.id,
      refresh_url: Meteor.absoluteUrl(privatePath.accounts),
      return_url: Meteor.absoluteUrl(privatePath.accounts),
      type: "account_onboarding",
    });

    return {
      url: accountLinks.url,
    };
  },

  "stripe.getAccount"() {
    const user = Meteor.user();

    const getAccount = Meteor.wrapAsync(
      stripe.accounts.retrieve,
      stripe.accounts
    );

    return user?.stripe?.id ? getAccount(user?.stripe?.id) : {};
  },
  "stripe.getLoginLink"() {
    const user = Meteor.user();

    const createLoginLink = Meteor.wrapAsync(
      stripe.accounts.createLoginLink,
      stripe.accounts
    );

    return user?.stripe?.id ? createLoginLink(user?.stripe?.id) : {};
  },
  "stripe.getUserBalance"() {
    const user = Meteor.user();

    const getUserBalance = Meteor.wrapAsync(
      stripe.balance.retrieve,
      stripe.balance
    );

    return getUserBalance({
      stripeAccount: user?.stripe?.id,
    });
  },
});
