import { userOrdersWithPackagesByDoctor } from "@ui/api-hooks/orders";
import Container from "@ui/components/Basic/Container";
import AppointmentCard from "@ui/features/appointments/AppointmentCard";
import Grid from "@ui/components/Grid/Grid";
import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import { DateTimePicker } from "@material-ui/pickers";
import Input from "@ui/components/Form/Input";

const Appointments = () => {
  const { data: orders = [] } = userOrdersWithPackagesByDoctor({
    appointmentExist: false,
  });

  console.log({ orders });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(null);

  function openAppointmentModal(order) {
    setSelectedAppointment(order);
    setIsModalOpen(true);
  }
  function closeAppointmentModal() {
    setIsModalOpen(false);
  }

  return (
    <Container>
      <h1 className="text-gray-600 text-2xl my-3 font-bold border-b-2">
        In Aspetto per approvazione
      </h1>
      <Grid className="mt-" lg={4} xl={4}>
        {orders &&
          orders.map((order) => (
            <AppointmentCard
              onClick={() => openAppointmentModal(order)}
              key={order._id}
              data={order}
            />
          ))}
      </Grid>

      {/* Appointment add or edit */}
      <Modal
        className="w-full h-full px-6 py-4 overflow-scroll bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-full relative"
        isOpen={isModalOpen}
        onClose={closeAppointmentModal}
      >
        <ModalHeader>{selectedAppointment?.package?.title}</ModalHeader>
        <ModalBody className="pb-5">
          {selectedAppointment?.quantity &&
            [...Array(selectedAppointment.quantity).keys()].map((item) => (
              <Grid
                lg={3}
                xl={3}
                key={item}
                className="my-4 border p-2 bg-white shadow-lg rounded-md"
              >
                <p className="m-auto text-xl">Sedute {item + 1}</p>
                <div className="mt-2 self-center">
                  <DateTimePicker
                    label="Data e orario"
                    value={selectedDate}
                    onChange={handleDateChange}
                    ampm={false}
                    inputVariant="outlined"
                  />
                </div>
                <Input
                  label="Durata"
                  type="number"
                  name="duration"
                  placeholder="eg:50"
                />
              </Grid>
            ))}
        </ModalBody>
        <ModalFooter>
          <div className="fixed z-10 bottom-0 left-0 w-full py-4 sm:px-12 px-4 bg-gray-100 mt-6 flex justify-end rounded-bl rounded-br">
            <button
              onClick={closeAppointmentModal}
              className="btn text-sm focus:outline-none text-gray-600 border border-gray-300 py-2 px-6 mr-4 rounded hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              Annulla
            </button>
            <button
              className="bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 rounded text-gray-800 font-medium px-8 py-2 text-sm focus:outline-none"
              type="submit"
            >
              Aggiorna
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Appointments;
