import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmationModal({message,onDelete,handleClose,showModal,BuyRent}) {
  

  const handleDelete = () => {
    onDelete();
    handleClose();
  }

  

  return (
    <>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{BuyRent? null: "Delete Product"  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {BuyRent? "No":"Cancel"  }
          </Button>
          <Button variant="danger" onClick={handleDelete}>
          {BuyRent? "Yes" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;