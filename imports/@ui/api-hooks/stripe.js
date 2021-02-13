import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useStripeAccount = () => {
  const name = "stripe.getAccount";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const useStripeLoginLink = () => {
  const name = "stripe.getLoginLink";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const useStripeUserBalance = () => {
  const name = "stripe.getUserBalance";
  return useQuery(name, async () => await methodCall(name, {}));
};
