import React, { useState, useEffect } from "react";
import Products from "../components/Products";
import './productList.css'
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import UserNavbar from "../components/UserNavbar";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { DELETE_PRODUCT, GET_PRODUCTS_BY_SELLER_ID, GET_ALL_PROD, BROUGHT_PRODUCTS, LENT_PRODUCTS, RENTED_PRODUCTS, SOLD_PRODUCTS } from "../mutation"
import { getLoggedIn } from '../common/localStorageSetup'

function ActivityHistory() {

    const navigate = useNavigate();
    const [myProducts, setMyProducts] = useState([])
    const [rentColor, setRentcolor] = useState('white')
    const [lentColor, setLentcolor] = useState('white')
    const [broughtColor, setBroughtcolor] = useState('mediumpurple')
    const [soldColor, setSoldcolor] = useState('white')

    const { data: productData, loading: productLoading, error: productError, refetch } = useQuery(BROUGHT_PRODUCTS, {
        variables: {
            id: parseInt(getLoggedIn())
        }
    })
    const { data: soldData, loading: soldLoding, error: soldError } = useQuery(SOLD_PRODUCTS, {
        variables: {
            id: parseInt(getLoggedIn())
        }
    })



    const { data: lentData, loading: lentLoading, error: lentError } = useQuery(LENT_PRODUCTS, {
        variables: {
            id: parseInt(getLoggedIn())
        }
    })


    useEffect(() => {

        // let isMounted = true;
        if (!productLoading && !productError) {
            // setMyProducts(productData.userById.productsBought)
            setMyProducts(productData.userById.productsBought)
        }

        refetch()
        console.log("why");

    }, [productData, productLoading, productError])

    // useEffect(() => {

    //     // let isMounted = true;
    //     if(!soldLoding && !soldError & soldData){
    //         console.log(soldData);
    //         setMyProducts(soldData.findSoldItemOfAUser)
    //     }




    // }, [soldData,soldLoding,soldError])









    // const onAddProductClicked = () => {
    //     navigate('/add-products')


    // }
    const alignBorrowedTypes = (rentSystem) => {
        let borrowed = [];
        console.log(rentSystem)
        for (let i = 0; i < rentSystem.length; i++) {
            for (let j = 0; j < rentSystem[i].products.length; j++)
                borrowed.push(rentSystem[i].products[j])
        }
        console.log(borrowed.categories);
        return borrowed;
    }
    const onSoldProductClicked = () => {


        setMyProducts(soldData?.findSoldItemOfAUser)
        setSoldcolor("mediumpurple");
        setRentcolor("white");
        setLentcolor("white");
        setBroughtcolor("white");

    }
    const onBorrowedProductClicked = () => {


        setMyProducts(alignBorrowedTypes(productData?.userById?.productsRentedSE))
        setSoldcolor("white");
        setRentcolor("mediumpurple");
        setLentcolor("white");
        setBroughtcolor("white");

    }
    const onBroughtProductClicked = () => {


        setMyProducts(productData?.userById.productsBought);
        setSoldcolor("white");
        setRentcolor("white");
        setLentcolor("white");
        setBroughtcolor("mediumpurple");

    }
    const onLentProductClicked = () => {


        setMyProducts(lentData?.findLentItemsOfAUser)
        setSoldcolor("white");
        setRentcolor("white");
        setLentcolor("mediumpurple");
        setBroughtcolor("white");

    }
    const onEditProductClicked = (id) => {
        navigate(`/each-product/${id}`)


    }
    if (productLoading) <h1>Loading....</h1>
    if (productError) {
        alert(productError.message)
    }


    return (
        <>
            <UserNavbar />
            <div style={{
                marginTop:'10px'
            }}>
                <Row>
                    <Col style={{
                        textAlign: "center",
                        cursor: "pointer",
                        borderBottom:`5px solid ${broughtColor}`
                        
                    }} onClick={onBroughtProductClicked}>
                        <h3 >Bought</h3>
                    </Col>
                    <Col style={{
                        textAlign: "center",
                        cursor: "pointer",
                        borderBottom:`5px solid ${soldColor}`
                    }} onClick={
                        onSoldProductClicked
                    } >
                        <h3 >Sold</h3>
                    </Col>
                    <Col style={{
                        textAlign: "center",
                        cursor: "pointer",
                        borderBottom:`5px solid ${rentColor}`
                    }} onClick={onBorrowedProductClicked}>
                        <h3 >Borrowed</h3>
                    </Col>
                    <Col style={{
                        textAlign: "center",
                        cursor: "pointer",
                        borderBottom:`5px solid ${lentColor}`
                    }} onClick={onLentProductClicked}>
                        <h3 >Lent</h3>
                    </Col>
                </Row>
            </div>

            <div className="min-vw-100 min-vh-100  justify-content-center align-items-center container-fluid">

                {myProducts?.length > 0 ? myProducts.map((item, index) =>
                    <><div className="products-container" key={index}>
                        {<Products title={item.title}
                            categories={item.categories}
                            price={item.price}
                            rent={item.rent}
                            description={item.description}
                            views={0}
                            handleOpenTrash={() => { }}
                            onCardClick={() => { }}
                            disable={true}
                        />}
                    </div></>
                ) : <Card style={{
                    textAlign: "center"
                }}>
                    <h1>No product found</h1>
                </Card>}

            </div>


        </>

    )

}
export default ActivityHistory;
