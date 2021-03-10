import React, { useEffect, useRef, useState } from "react";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Grid from "@ui/components/Grid/Grid";
import { useAvailabilityByUserId } from "@ui/api-hooks/availability";
import {
  getEachMinInterval,
  objectToDate,
  dateToTime,
  objectToDateString,
} from "@ui/utils/time";
import { getDay, isWithinInterval } from "date-fns";
import { addMinutes } from "date-fns/esm";
import { useAppointmentsByDate } from "@ui/api-hooks/appointment";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import HoldMyUi from "holdmyui";
import useMediaQuery from "@ui/utils/useMediaQuery";
import { toast } from "react-toastify";
import Success from "@ui/components/Success/Success";
import { useHistory } from "react-router-dom";
import { privatePath } from "@ui/routes/privatePath";

const AppointmentBook = ({
  doctorId,
  userId,
  package,
  _id: orderId,
  isAppointmentModalOpen,
  closeAppointmentModal,
}) => {
  const history = useHistory();
  const today = utils().getToday();

  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTime, setSelectedTime] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [formState, setFormState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const leftSection = useRef();
  const rightSection = useRef();

  const { screenSm, screenXs } = useMediaQuery();

  useEffect(() => {
    if (!isAppointmentModalOpen) {
      setFormState({
        loading: false,
        success: false,
        error: "",
      });
    }
  }, [isAppointmentModalOpen]);

  useEffect(() => {
    if (selectedDay && (screenSm || screenXs)) {
      rightSection?.current?.scrollIntoView(true);
      console.log("here");
    }
  }, [selectedDay, screenSm, screenXs]);

  const {
    data: availability,
    isLoading: loadingAvailability,
  } = useAvailabilityByUserId({ userId: doctorId });
  const {
    data: existingAppointments = [],
    refetch: refetchAppointments,
    isLoading: loadingExistingAppointments,
  } = useAppointmentsByDate({
    doctorId,
    date: objectToDate(selectedDay),
  });

  const interval = package?.duration;

  const handleSelectTime = (value) => setSelectedTime(value);

  useEffect(() => {
    if (!selectedDay || !availability) return;
    const weekIndex = getDay(objectToDate(selectedDay));

    const dayByIndex = Object.keys(availability).find(
      (day) =>
        availability[day].dayIndex === weekIndex && availability[day].isEnabled
    );

    if (!dayByIndex) {
      setTimeSlots([]);
      return;
    }

    const selectedAval = { day: dayByIndex, ...availability[dayByIndex] };

    setTimeSlots([]);
    selectedAval?.timeSlots.forEach(({ from, to }) => {
      setTimeSlots((timeSl) => [
        ...timeSl,
        ...getEachMinInterval({
          dateString: objectToDateString(selectedDay),
          start: from,
          end: to,
          interval,
        }),
      ]);
    });

    refetchAppointments();
  }, [selectedDay, availability, userId]);

  const filteredTimeSlots = timeSlots.filter(
    (tl) =>
      !existingAppointments?.find(({ startsAt, endsAt }) =>
        isWithinInterval(tl, { start: startsAt, end: endsAt })
      )
  );

  const startsAt = new Date(
    `${objectToDateString(selectedDay)} ${selectedTime}`
  );
  const endsAt = addMinutes(startsAt, interval);

  const handleBookAppointment = () => {
    setFormState({ ...formState, loading: true });

    Meteor.call(
      "appointment.create",
      {
        startsAt,
        endsAt,
        doctorId,
        userId,
        orderId,
        packageId: package._id,
      },
      (err, data) => {
        if (err) {
          setFormState({ error: err, loading: false, success: false });
          console.log(err);
        }

        setFormState({ error: "", loading: false, success: true });
      }
    );
  };

  const successBody = () => (
    <Success
      title="Hai prenotato con success"
      msg={`per ${startsAt
        .toLocaleString()
        .slice(0, startsAt.toLocaleString().length - 3)}`}
      btn1={{
        text: "Chatta con psicologo",
        onClick: () => history.push(privatePath.inboxById(doctorId)),
      }}
      btn2={{
        text: "Torna a dashboard",
        onClick: () => history.push(privatePath.dashboard),
      }}
    />
  );

  const modalBody = () => (
    <>
      <ModalHeader>{package?.title}</ModalHeader>

      <ModalBody className="pb-5">
        <Grid className="text">
          <div className="flex justify-center" ref={leftSection}>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              calendarClassName="lg:text-base" // added this
              shouldHighlightWeekends
              minimumDate={today}
              maximumDate={{ ...today, year: today.year + 1 }}
            />
          </div>
          <div
            ref={rightSection}
            style={{ height: leftSection?.current?.clientHeight }}
            className="overflow-y-scroll"
          >
            {filteredTimeSlots.length ? (
              <div className="flex flex-col justify-center shadow-lg">
                {filteredTimeSlots.map((timeSlot) => {
                  const time = dateToTime(timeSlot);
                  return (
                    <button
                      key={time}
                      className={`px-2 py-4 my-1 border text-lg  hover:bg-green-200 hover:text-green-700 ${
                        selectedTime === time
                          ? "bg-green-100 text-green-500"
                          : ""
                      }`}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p
                className="text-lg text-center flex flex-col justify-center bg-gray-100 shadow-lg border"
                style={{ height: leftSection?.current?.clientHeight }}
              >
                Nessun orario disponibile in questa data
                <br />
                Seleziona un altro data
              </p>
            )}
          </div>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
          <button
            onClick={closeAppointmentModal}
            className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out"
          >
            Annulla
          </button>
          {selectedDay && selectedTime && (
            <button
              className="bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 rounded text-gray-800 font-medium px-8 py-2 text-sm focus:outline-none"
              onClick={handleBookAppointment}
            >
              Prenota
            </button>
          )}
        </div>
      </ModalFooter>
    </>
  );

  return (
    <Modal
      className="w-full h-full px-6 py-4 overflow-scroll bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-full relative"
      isOpen={isAppointmentModalOpen}
      onClose={closeAppointmentModal}
    >
      <HoldMyUi
        when={
          loadingAvailability ||
          loadingExistingAppointments ||
          formState.loading
        }
        preloader="Ripple"
        preloaderTop="50vh"
        color="#4ac959"
        padding="0px"
        type="fixed"
      >
        {formState.success ? successBody() : modalBody()}
      </HoldMyUi>
    </Modal>
  );
};

export default AppointmentBook;
