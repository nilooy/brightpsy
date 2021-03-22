import {
  useStripeAccount,
  useStripeLoginLink,
  useStripeUserBalance,
} from "@ui/api-hooks/stripe";
import HoldMyUi from "holdmyui";
import React, { useState } from "react";

const Accounts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const stripeAccount = useStripeAccount();
  const stripeLoginLink = useStripeLoginLink();
  const b = useStripeUserBalance();

  console.log({ b });

  console.log(stripeAccount);

  const connectWithStripe = () => {
    setIsLoading(true);
    Meteor.call("stripe.createAccount", {}, (err, data) => {
      if (err) console.log(err);

      if (data?.url) {
        window.location.href = data.url;
      }

      setIsLoading(false);
    });
  };

  const goToDashboard = () => {
    const { data } = stripeLoginLink;
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const isVerified = !stripeAccount.data?.requirements?.currently_due?.includes(
    "individual.verification.document",
    "individual.verification.additional_document"
  );
  const isAccountExist = stripeAccount.data?.details_submitted;

  return (
    <HoldMyUi
      when={isLoading || stripeAccount.isLoading}
      preloader="Ripple"
      preloaderTop="50vh"
      color="#4ac959"
      type="fixed"
      padding="0px"
    >
      {isAccountExist && (
        <div className="bg-green-200 p-3 mt-2">
          <p className="self-center text-lg text-green-800 text-center ">
            Stripe Payment Connected
          </p>
        </div>
      )}
      {!isAccountExist && (
        <div className="bg-gray-200 p-10 mt-10">
          <div className="flex justify-between flex-wrap">
            <p className="self-center text-lg text-gray-500">
              Connect with stripe per ricevere i pagamenti a il tuo account
            </p>
            <button
              onClick={connectWithStripe}
              className="bg-green-200 text-green-700 text-xl px-4 py-2"
            >
              Connect with stripe
            </button>
          </div>
        </div>
      )}

      {!isVerified && (
        <div className="bg-gray-200 p-8 mt-6">
          <div className="flex justify-between flex-wrap">
            <p className="self-center text-lg text-gray-500">
              Verify your payment account with document
            </p>
            <button
              onClick={connectWithStripe}
              className="bg-orange-200 text-orange-700 text-xl px-4 py-2 my-2"
            >
              Verify Account
            </button>
          </div>
        </div>
      )}

      {isAccountExist && (
        <>
          <div className="bg-gray-200 p-10 mt-6">
            <div className="flex justify-between ">
              <p className="self-center text-lg text-gray-500">
                Check you transactions and payment informations
              </p>
              <button
                onClick={goToDashboard}
                className="bg-green-200 text-green-700 text-xl px-4 py-2"
              >
                Payment Dashboard
              </button>
            </div>
          </div>

          <div className="bg-gray-200 p-10 mt-6">
            <div className="flex justify-between ">
              <p className="self-center text-lg text-gray-500">
                Cambia i dati di pagamento
              </p>
              <button
                onClick={goToDashboard}
                className="bg-blue-200 text-blue-700 text-xl px-4 py-2"
              >
                Modifica
              </button>
            </div>
          </div>
        </>
      )}
    </HoldMyUi>
  );
};

export default Accounts;
