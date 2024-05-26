import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * ConfirmDeleteModal component to confirm deletion of a venue.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Whether the modal is shown.
 * @param {function} props.handleClose - Function to handle closing the modal.
 * @param {function} props.handleConfirm - Function to handle confirming the deletion.
 * @returns {JSX.Element} - The rendered component.
 */
const ConfirmDeleteModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this venue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
