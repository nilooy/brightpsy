import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useAppointmentsByDoctor } from "@ui/api-hooks/appointment";
import { getRandomColor } from "@ui/utils/helpers";
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

function Event({ event }) {
  return (
    <span className="bg-red-200">
      <p className="text-sm">{event.title}</p>
      <p className="text-xs">{event.desc && ":  " + event.desc}</p>
    </span>
  );
}

function EventAgenda({ event }) {
  return (
    <span>
      <em className="text-green-400 bg-white">{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const eventStyleGetter = (event, start, end, isSelected) => {
  var style = {
    backgroundColor: "#02e44a",
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: "0px",
    display: "block",
  };
  return {
    style: style,
  };
};

const AppointmentCalender = () => {
  const { data: appointments = [] } = useAppointmentsByDoctor();

  const minTime = new Date();
  minTime.setHours(8, 30, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

  const formattedAppointments = appointments.length
    ? appointments.map(
        ({
          _id,
          startsAt,
          endsAt,
          user: {
            profile: { firstName, lastName },
          },
          package: { title },
        }) => ({
          id: _id,
          startsAt,
          endsAt,
          title: firstName + " " + lastName + " - " + title,
        })
      )
    : [];

  return (
    <div className="mt-10">
      <Calendar
        localizer={localizer}
        events={formattedAppointments}
        startAccessor="startsAt"
        endAccessor="endsAt"
        style={{ height: 500 }}
        culture="it"
        messages={messages}
        popup={true}
        min={minTime}
        max={maxTime}
        // showMultiDayTimes
        eventPropGetter={eventStyleGetter}
        components={{
          event: Event,
          agenda: {
            event: EventAgenda,
          },
        }}
      />
    </div>
  );
};

export default AppointmentCalender;
