import React, { useState } from "react";
import { MultiSelect } from '@mantine/core';
import './AddProduct.css'

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
import Rent from "../components/Rent";
import Summary from "../components/Summary";
import { useNavigate } from "react-router-dom";
import {useMutation}from "@apollo/client"
import {ADD_PRODUCT} from "../mutation"
import {getLoggedIn} from "../common/localStorageSetup"

function AddProduct() {
    const [catagories, setCatagories] = useState([]);
    const [rentType, setRentType] = useState(null);
    const navigate = useNavigate();
    const [addProductToUser,{data,loading,error}]=useMutation(ADD_PRODUCT)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        rent: '',
    })
    const option = [
        { value: "ELECTRONICS", label: 'ELECTRONICS' },
        { value: 'FURNITURE', label: 'FURNITURE' },
        { value: 'HOME APPLIANCES', label: 'HOME APPLIANCES' },
        { value: 'SPORTING GOODS', label: 'SPORTING GOODS' },
        { value: 'OUTDOOR', label: 'OUTDOOR' },
        { value: 'TOY', label: 'TOY' },

    ];
    const title = ['Select a title for your product',
        'Select catagories',
        'Select description',
        'Select Price',
        'Summary'
    ]
    const nameList = ['title',
        'catagories',
        'description',
        'price',
        'Summary'
    ]

    const [titleId, setTitleId] = useState(0);
    const onInputChange = (e) => {
        console.log(e.target.name,e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    

    const onNextClicked = () => {
        if(titleId==4){
            let productInput ={
                id:123,
                categories:catagories,
                description:formData.description,
                sellerId: getLoggedIn(),
                price:parseInt(formData.price) ,
                rent:parseInt(formData.rent),
                rentType:rentType,
                title:formData.title,
                createdAt: "2023-03-22T12:00:00Z",
                updatedAt: "2023-03-22T14:00:00Z"

            }
            addProductToUser({variables:{
                createProductInput:productInput
            }}).then(
                navigate('/my-products')
            )
            

           
            
        }
        setTitleId(titleId + 1);


    }
    const onBackClicked = () => {
        setTitleId(titleId - 1)
    }
    const getRent = ()=>{
        console.log(formData.rent)
        return formData.rent;
    }
    const getValue = () =>{
        if(titleId==0){
            return formData.title;

        }
        else if(titleId==2){
            return formData.description;
        }
        else if(titleId==3){
            return formData.price;
        }
        else{
            return "Something is wrong";
        }


    }
    if(error) alert(error.message)
    return (
        <div className="center">
            <h1>{title[titleId]}</h1>
            {
                (() => {
                    if (titleId === 1) {
                        return (
                            <MultiSelect
                                data={option}
                                
                                placeholder="Pick all relevent catagories"
                                value={catagories}
                                onChange={setCatagories}
                            />
                        )
                    }
                    else if(titleId==4){
                        return(
                            <Summary
                            title={formData.title}
                            categories={catagories}
                            description={formData.description}
                            price={formData.price}
                            rent={formData.rent}
                            rentType={rentType}
                            />
                        )
                    }
                   


                    return (<Form method="post">

                        <InputGroup size="lg" className="mb-3" >
                            <FormControl
                            as="textarea" className="shadow-none"
                                type="text"
                                name={nameList[titleId]}
                                rows={titleId ==0 ? 1 : 5 }
                                value={getValue(titleId)}
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={onInputChange}
                            />
                        </InputGroup>
                    </Form>);
                })()

            }
            {
                titleId===3 ?
                <Rent onInputChange={onInputChange}
                onSelectionChange={setRentType}
                rentType={rentType}
                rent={getRent()}

                />
                :null
            }




            <Button onClick={onNextClicked}
                style={{
                    float: "right",
                    backgroundColor: "rgb(139, 104, 139)",
                    
                }}
            >{titleId ==4 ? 'Submit' : 'Next'}</Button>
            {
                titleId === 0 ? null
                    : <Button onClick={onBackClicked}
                        style={{
                            float: "left",
                            backgroundColor: "rgb(139, 104, 139)"
                        }}
                    >Back</Button>

            }


        </div>
    )
}
export default AddProduct;