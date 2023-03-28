import bootstrap from "bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormControl, Button, Card, InputGroup, Row, Col } from "react-bootstrap"
import { MultiSelect, Select } from "@mantine/core"
import { GET_PRODUCT_BY_ID,EDTT_PRODUCT } from "../mutation"
import { useQuery,useMutation } from "@apollo/client"

function EditProducts() {
    let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error,refetch } = useQuery(GET_PRODUCT_BY_ID, { variables: { id: parseInt(id) } })
    const [editProducts,{ data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDTT_PRODUCT )
    const [categories, setCategories] = useState([]);
    const [rentype, setRetType] = useState('per month')
    const rentypes = [
        { value: 'per week', label: 'per week' },
        { value: 'per month', label: 'per month' },
        { value: 'per year', label: 'per year' },
    ];

    const option = [
        { value: 'ELECTRONICS', label: 'ELECTRONICS' },
        { value: 'FURNITURE', label: 'FURNITURE' },
        { value: 'HOME APPLIANCES', label: 'HOME APPLIANCES' },
        { value: 'SPORTING GOODS', label: 'SPORTING GOODS' },
        { value: 'OUTDOOR', label: 'OUTDOOR' },
        { value: 'TOY', label: 'TOY' },

    ];

    const [formData, setFormData] = useState(
        {
            description: "",
            rent: "",
            price: "",
            title: "",



        }
    )
    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const joinALLCategories = (catagories) => {
        console.log(catagories);
        let categoriesName = [];
        for (let i = 0; i < catagories.length; i++) {
            categoriesName.push(catagories[i].name)
        }
        console.log(categoriesName);
        return categoriesName;
    }

    const onConfirmClicked=()=>{
        let productEditInput ={
            id:parseInt(id),
            categories:categories,
            description:formData.description,
            
            price:parseInt(formData.price) ,
            rent:parseInt(formData.rent),
            rentType:rentype,
            title:formData.title,
           

        }
        editProducts({variables:{
            updateProductInput:productEditInput
        }}).then(
            navigate('/my-products')
        )

    }

    useEffect(() => {
        refetch();
        if (!error && !loading) {
            console.log(data, joinALLCategories(data.product.categories), data.product.rentType);
            setCategories(joinALLCategories(data.product.categories));
            setRetType(data.product.rentType)
            setFormData({
                title:data.product.title,
                rent:(data.product.rent).toString(),
                price: (data.product.price).toString(),
                description:data.product.description

            })


        }
    }, [data, error, loading])


    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error || mutationError) {
        return <h1>{mutationError.message}</h1>
    }


    else return (

        <div style={{
            padding: "15px"
        }} className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">

            <Card>
                <Card.Body>
                    <Form method="post">
                        <h3>Title</h3>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="title" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Title" defaultValue={data.product.title} rows={3}
                                onChange={onInputChange} />
                        </InputGroup>
                        <h3>Categories</h3>

                        <MultiSelect
                            data={option}
                            width='50%'
                            placeholder="Categories"
                            value={categories}
                            onChange={setCategories}
                        />
                        <h3>Description</h3>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="textarea" className="shadow-none" type="text" name="description" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Description"
                                defaultValue={data.product.description}
                                rows={15}
                                onChange={onInputChange}
                            />
                        </InputGroup>
                        <Row>
                            <Col>
                                <h3>Price</h3>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="price" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Price"
                                        defaultValue={data.product.price}
                                        onChange={onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <h3>Rent</h3>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="rent" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Rent"
                                        defaultValue={data.product.rent}
                                        onChange={onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <h3>Type</h3>
                                <Select

                                    placeholder="Select option"
                                    data={rentypes}
                                    value={rentype}
                                    onChange={setRetType}

                                />

                            </Col>
                        </Row>



                    </Form>
                </Card.Body>
                <Button style={{
                    position: "sticky",
                    bottom: '1rem',
                    left: '110rem',
                    backgroundColor: "rgb(139, 104, 139)"

                }}
                    onClick={ onConfirmClicked}

                >
                    Confirm Edits
                </Button>


            </Card>
        </div>
    )
}
export default EditProducts;