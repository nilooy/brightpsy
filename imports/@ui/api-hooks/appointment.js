import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useAppointmentsByDate = ({ doctorId, date }) => {
  const name = "appointment.getAllByDoctorByDay";
  return useQuery(
    name,
    async () => await methodCall(name, { doctorId, date }),
    {
      enabled: !!doctorId || !!date,
    }
  );
};

export const useAppointmentsByDoctor = () => {
  const name = "appointment.getAllByDoctor";
  return useQuery(name, async () => await methodCall(name, {}));
};
