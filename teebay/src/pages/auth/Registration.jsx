import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {SIGN_UP_USER} from "../../mutation"
import {
    Form,
    Card,
    Row,
    InputGroup,
    FormControl,
    Button,
    Col
} from "react-bootstrap"
import './auth.css'

function Registration() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",

    });
    const [createUser,{data,loading,error}]= useMutation(SIGN_UP_USER);

    const [showSubmitButton,setShowSubmitbutton]=useState(true);

    const navigate = useNavigate();
    function onSignInClicked(){
        navigate('/log-in');
    }

    const onInputChange = (e) => {
         
        console.log(formData);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onConfirmPassword = (e) =>{
        console.log(e.target.value,formData.password);
        if(e.target.value===formData.password){
            setShowSubmitbutton(false);
             
        }
    }
    const onRegisterButtonClicked = (e) =>{
        console.log(formData);
        let userInput ={
            name:formData.firstname+formData.lastname,
            id:123,
            email:formData.email,
            phone:formData.phone,
            address:formData.address,
            password:formData.password,
        }
        console.log(userInput);
        createUser({
            variables:{
                createUserInput:userInput
            }
        });

    }
    if(loading) return <h1>Loading.....</h1>

    if(error){
        alert(error.message);
    }


    return (
        <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">
            
            <Card>

                <Card.Body>
                    <Form method="post"  >
                        <Card.Title className="mt-3">Sign  up</Card.Title>
                        <Row>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="firstName" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="First Name" onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="lastName" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Last Name" onChange={onInputChange}/>
                                </InputGroup>

                            </Col>



                        </Row>
                        <Form.Label>Address</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="address" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Address" onChange={onInputChange} />
                        </InputGroup>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="email" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Email" onChange={onInputChange}/>
                                </InputGroup>

                            </Col>
                            <Col>
                                <Form.Label>Phone Number</Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="phone" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Phone Number" onChange={onInputChange}/>
                                </InputGroup>

                            </Col>
                        </Row>
                        <Form.Label>Password</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Password" onChange={onInputChange} />
                        </InputGroup>

                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="confirmPassword" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Password" onChange={onConfirmPassword}/>
                        </InputGroup>




                    </Form>

                    <div className="button-container">
                        <Button className="my-button" disabled={showSubmitButton} onClick={onRegisterButtonClicked} > Register </Button>
                    </div>
                    <div className="sign-up-end-line">
                        
                                <div> Already have an account?</div>
                            
                                <div className="sign-in" onClick={onSignInClicked}> Sign in</div>
                            

                    </div>



                </Card.Body>
            </Card>



        </div>

    );
}

export default Registration;