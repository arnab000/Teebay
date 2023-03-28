import bootstrap from "bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormControl, Button, Card, InputGroup, Row, Col } from "react-bootstrap"
import { MultiSelect, Select } from "@mantine/core"
import { GET_PRODUCT_BY_ID, EDTT_PRODUCT, BUY,RENT } from "../mutation"
import { useQuery, useMutation } from "@apollo/client"
import { getLoggedIn } from "../common/localStorageSetup";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import RentdateModal from "../components/RentDatesModal";
import UserNavbar from "../components/UserNavbar";

function BuyOrRent() {

    let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { id: parseInt(id) } })
    const [buyproduct, { data: BuyData, loading: BuyLoading, error: Buyerror }] = useMutation(BUY)
    const [rentProduct, { data: RentData, loading: RentLoading, error: Renterror }] = useMutation(RENT)
    const [showModal, setShowModal] = useState(false);
    const [showModalRent, setShowModalRent] = useState(false);
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const handleOpen = (id) => {

        setShowModal(true);
    }
    const onConfirmRent = ()=>{
        rentProduct({variables:{
            endTime:endDate,
            productId:parseInt(id),
            startTime :startDate,
            userId:parseInt(getLoggedIn())
        }}).then(
            alert("You are succesfully rented this")
        )
    }
    const handleClose = () => setShowModal(false);
    const handleToggle = ()=> setShowModalRent(!showModalRent);


    const option = [
        'ELECTRONICS',
        'FURNITURE',
        'HOME APPLIANCES',
        'SPORTING GOODS',
        'OUTDOOR',
        'TOY',

    ];


    const joinALLCategories = (catagories) => {
        console.log(catagories);
        let categoriesName = [];
        for (let i = 0; i < catagories.length; i++) {
            categoriesName.push(catagories[i].name)
        }
        console.log(categoriesName);
        return categoriesName;
    }

    const handleDelete = () => {
        let rentInput = {
            userId: parseInt(getLoggedIn()),
            id: parseInt(id),


        }
        // editProducts({variables:{
        //     updateProductInput:productEditInput
        // }}).then(
        //     navigate('/my-products')
        // )
        buyproduct({
            variables: {
                updateBoughtStatus: rentInput
            }
        }).then(
            alert("You have bought the time")
        )

    }

    useEffect(() => {
        if (!error && !loading) {



        }
    }, [data, error, loading])


    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error.message}</h1>
    }


    else return (
        <><UserNavbar /><div style={{
            padding: "15px"
        }} className=" justify-content-center align-items-center container-fluid">

            <Card>
                <Card.Body>


                    <Card.Title className="text-dark">{data.product.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{joinALLCategories(data.product.categories).join(', ')}</Card.Subtitle>

                    <Card.Text className="text-muted">Price: {data.product.price} $</Card.Text>
                    <Card.Text className="text-dark">{data.product.description}</Card.Text>

                    <Button style={{
                        float: "right",
                        backgroundColor: "rgb(139, 104, 139)"
                    }}
                        onClick={handleOpen}


                    >
                        Buy
                    </Button>
                    <Button style={{
                        float: "right",
                        backgroundColor: "rgb(139, 104, 139)"
                    }}
                        onClick={handleToggle}

                    >
                        Rent
                    </Button>

                </Card.Body>



            </Card>
            <DeleteConfirmationModal message="Are you sure you want to buy this product?" onDelete={handleDelete} handleClose={handleClose} showModal={showModal}
                BuyRent={true} />

            <RentdateModal setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} handleClose={handleToggle} showModal={showModalRent}
                onConfirm={onConfirmRent} />

        </div></>
    )
}
export default BuyOrRent;