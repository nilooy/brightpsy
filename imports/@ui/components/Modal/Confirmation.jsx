import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import { GrAlert } from "@react-icons/all-files/gr/GrAlert";

const Confirmation = ({ isOpen, setOpen, title, body, onConfirm }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        {title && (
          <ModalHeader className="flex justify-center">
            <GrAlert className="self-center mr-2" />
            {title}
          </ModalHeader>
        )}
        {body && <ModalBody>{body}</ModalBody>}
        <ModalFooter>
          <button
            className="w-full sm:w-auto border border-gray-200 text-gray-600 p-3"
            layout="outline"
            onClick={() => setOpen(false)}
          >
            Anulla
          </button>
          <button
            className="w-full sm:w-auto bg-red-200 text-red-600 p-3"
            onClick={onConfirm}
          >
            Confermo
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Confirmation;
