import React, { useState,useEffect } from "react";
import Products from "../components/Products";
import './productList.css'
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import UserNavbar from "../components/UserNavbar";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client"
import {DELETE_PRODUCT, GET_PRODUCTS_BY_SELLER_ID} from "../mutation"
import {getLoggedIn} from '../common/localStorageSetup'

function ProductList() {
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();
    const [deleteProductId,setDeleteProductId]=useState(null)
    const {data: productData,loading: productLoading ,error : productError,refetch} =useQuery(GET_PRODUCTS_BY_SELLER_ID,{variables:{id:getLoggedIn()}})
    const [deleteProduct,{data,loading ,error }] =useMutation(DELETE_PRODUCT)

    useEffect(() => {

        // let isMounted = true;

        refetch()
        console.log("why");

    }, [deleteProductId,productData,productLoading,productLoading,data,error,loading])

    
    

 


  
    const handleDelete = () => {

        // Handle delete operation here


        // const reducedproducts = [...products];
        // reducedproducts.splice(deleteId, 1);
        // setproducts(reducedproducts);
        deleteProduct({variables:{id:deleteId}}).then(setDeleteProductId(deleteId)).then(handleClose());


        //  handleClose();
    }
    const handleOpen = (id) => {
        setDeleteId(id)
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);

    const onAddProductClicked = () => {
        navigate('/add-products')


    }
    const onEditProductClicked = (id) => {
        navigate(`/edit-products/${id}`)


    }
    if(productLoading) <h1>Loading....</h1>
     if(productError){
        alert(productError.message)
     }


    return (
        <>
            <UserNavbar />
            <div className="center-div">
                <h1> My Products </h1>
            </div>
            <div className="min-vw-100 min-vh-100  justify-content-center align-items-center container-fluid">

                {productData && productData.productsBySellerId.map((item, index) =>
                    <><div className="products-container" key={index}>
                        {<Products title={item.title}
                            categories={item.categories}
                            price={item.price}
                            rent={item.rent}
                            description={item.description}
                            views={0}
                            handleOpenTrash={() => handleOpen(item.id)}
                            onCardClick={()=>onEditProductClicked(item.id)}
                            disable={false}
                             />}
                    </div><DeleteConfirmationModal message="Are you sure you want to delete this product?" onDelete={handleDelete} handleClose={handleClose} showModal={showModal}
                    BuyRent={false} /></>
                )}
            </div>
            <Button style={{
                position: "sticky",
                bottom: '1rem',
                left: '110rem',
                backgroundColor: "rgb(139, 104, 139)"

            }}
                onClick={onAddProductClicked}
            >
                Add products
            </Button>

        </>

    )

}
export default ProductList;