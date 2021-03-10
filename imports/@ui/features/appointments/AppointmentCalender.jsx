import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useAppointmentsByDoctor } from "@ui/api-hooks/appointment";
const locales = {
  it: require("date-fns/locale/it"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "Tutti giorni",
  previous: "<",
  next: ">",
  today: "Oggi",
  month: "Mese",
  week: "Settimana",
  day: "Giorno",
  agenda: "Agenda",
  date: "Data",
  time: "Tempo",
  event: "Evento",
  showMore: (total) => `+ Mostra altri (${total})`,
};

const AppointmentCalender = () => {
  const { data: appointments = [] } = useAppointmentsByDoctor();

  console.log({ appointments });

  const formattedAppointments = appointments.length
    ? appointments.map(
        ({
          _id,
          startsAt,
          endsAt,
          user: {
            profile: { firstName, lastName },
          },
        }) => ({
          id: _id,
          start: startsAt,
          end: endsAt,
          title: firstName + " " + lastName,
        })
      )
    : [];

  return (
    <div className="mt-10">
      <Calendar
        localizer={localizer}
        events={formattedAppointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        culture="it"
        messages={messages}
      />
    </div>
  );
};

export default AppointmentCalender;
