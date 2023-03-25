import React, { useState } from 'react';
import { Modal, Button,Row,Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

function RentdateModal({ startDate, setStartDate, endDate, setEndDate, handleClose, showModal,onConfirm }) {


    const handleDelete = () => {
        onConfirm();
        handleClose();
    }



    return (
        <>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rental period</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <h4>From</h4>
                            <DatePicker
                                value={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </Col>
                        <Col>
                        <h4>To</h4>
                            <DatePicker
                                value={endDate}
                                onChange={date => setEndDate(date)}
                            />
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Go back
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm rent
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RentdateModal;