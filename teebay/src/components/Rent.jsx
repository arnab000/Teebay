import React, { useState } from "react";
import {
   Row,
   Col,
   Form,
   FormControl,
   InputGroup
} from "react-bootstrap"
import { Select } from '@mantine/core';

function Rent({ onInputChange, onSelectionChange,rentType,rent }) {
   const data = [
      { value: 'per week', label: 'per week' },
      { value: 'per month', label: 'per month' },
      { value: 'per year', label: 'per year' },
   ];
   return (
      <>
      <h4>Rent</h4>

         <Row>
            <Col>
               <Form method="post">

                  <InputGroup size="sm" className="mb-3" >
                     <FormControl
                         className="shadow-none"
                        type="text"
                        name='rent'
                        rows={2}

                        value={rent}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={onInputChange}
                     />
                  </InputGroup>
               </Form>
            </Col>
            <Col>
               <Select
                  
                  placeholder="Select option"
                  data={data}
                  value={rentType}
                  onChange={onSelectionChange}
               />

            </Col>
         </Row>
      </>
   )
}
export default Rent;