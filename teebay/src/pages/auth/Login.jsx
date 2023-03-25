import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from "../../mutation"
import {setUserId} from "../../common/localStorageSetup"
import {
    Form,
    Card,
    CardGroup,
    Row,
    InputGroup,
    FormControl,
    Button,
    Col
} from "react-bootstrap"
import './auth.css'

function Login() {
    const [loginInput, { data, loading, error }] = useLazyQuery(LOGIN_USER);
    const [formData, setFormData] = useState({

        email: "",

        password: "",


    });   
    
    
    useEffect(() => {

        // let isMounted = true;

     
        if (!error && !loading && data) {
            setUserId(data.user.id)

                if (data && data.user.password === formData.password) {
                    navigate('/my-products');
                }
                else {
                    alert("wrong password");
                }


        }

    }, [data,error,loading])
    
    const onInputChange = (e) => {
         
       // console.log(formData);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const navigate = useNavigate();
    function onLogInClicked() {
        loginInput({
            variables: {
                email: formData.email
            }
            
        })
        
        



    }

    function onSignUpClicked() {
        navigate('/');
    }

    if (loading) return <h1>Loading...</h1>
    if (error) {
        alert(error.message)
    }

    return (
        <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">
            <Card>

                <Card.Body>
                    <Form method="post">
                        <Card.Title className="mt-3">Log in</Card.Title>
                        <Form.Label>Email</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="email" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Email" onChange={onInputChange}/>
                        </InputGroup>

                        <Form.Label>Password</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="password" name="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Password" onChange={onInputChange} />
                        </InputGroup>


                        <div className="button-container">
                            <Button style={{
                                backgroundColor: "rgb(139, 104, 139)"
                            }} className="my-button" onClick={onLogInClicked} > Log in </Button>
                        </div>
                        <div className="sign-up-end-line">

                            <div> Don't have an account?</div>

                            <div className="sign-in" onClick={onSignUpClicked}> Sign up</div>


                        </div>

                    </Form>
                </Card.Body>
            </Card>


        </div>

    );
}

export default Login;