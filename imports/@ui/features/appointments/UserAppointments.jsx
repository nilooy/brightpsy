import { userOrdersWithPackagesByUser } from "@ui/api-hooks/orders";
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
import AppointmentBook from "./AppointmentBook";

const UserAppointments = () => {
  const { data: orders = [] } = userOrdersWithPackagesByUser();

  console.log({ orders });

  console.log({ orders });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  function openAppointmentModal(order) {
    setSelectedAppointment(order);
    setIsAppointmentModalOpen(true);
  }
  function closeAppointmentModal() {
    setIsAppointmentModalOpen(false);
    setSelectedAppointment({});
  }

  return (
    <Container>
      <h1 className="text-gray-600 text-2xl my-3 font-bold border-b-2">
        Appuntamenti
      </h1>
      <Grid className="mt-" lg={4} xl={4}>
        {orders &&
          orders.map((order) => (
            <AppointmentCard
              onClick={() => openAppointmentModal(order)}
              key={order._id}
              data={order}
              isDoctor
            />
          ))}
      </Grid>

      {/* Appointment add or edit */}
      <AppointmentBook
        {...selectedAppointment}
        isAppointmentModalOpen={isAppointmentModalOpen}
        closeAppointmentModal={closeAppointmentModal}
      />
    </Container>
  );
};

export default UserAppointments;
