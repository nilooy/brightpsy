import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const userOrdersByDoctor = ({ appointmentExist }) => {
  const name = "stripe.getOrdersByDoctor";
  return useQuery(
    name,
    async () => await methodCall(name, { appointmentExist })
  );
};

export const userOrdersWithPackagesByDoctor = ({ appointmentExist }) => {
  const name = "stripe.getOrdersWithPackageByDoctor";
  return useQuery(
    name,
    async () => await methodCall(name, { appointmentExist })
  );
};

export const userOrdersWithPackagesByUser = () => {
  const name = "stripe.getOrdersWithPackageByUser";
  return useQuery(name, async () => await methodCall(name));
};
