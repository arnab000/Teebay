import React, { useState,useEffect } from "react";
import Products from "../components/Products";
import './productList.css'
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import UserNavbar from "../components/UserNavbar";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client"
import {DELETE_PRODUCT, GET_PRODUCTS_BY_SELLER_ID,GET_ALL_PROD} from "../mutation"
import {getLoggedIn} from '../common/localStorageSetup'

function AllProduct() {
   
    const navigate = useNavigate();
    
    const {data: productData,loading: productLoading ,error : productError,refetch} =useQuery(GET_ALL_PROD)
    

    useEffect(() => {

        // let isMounted = true;

        refetch()
        console.log("why");

    }, [productData,productLoading,productError])

    
    

 


  

    // const onAddProductClicked = () => {
    //     navigate('/add-products')


    // }
    const onEditProductClicked = (item) => {
        console.log(item)
        if(item.sellerId===parseInt(getLoggedIn()))
        navigate(`/edit-products/${item.id}`)
        else if(item.sold!==true)
        navigate(`/each-product/${item.id}`)
        else if(item.sold===true){
            alert("Product has been sold")
        }


    }
    if(productLoading) <h1>Loading....</h1>
     if(productError){
        alert(productError.message)
     }


    return (
        <>
            <UserNavbar />
            <div className="center-div">
                <h1> ALL Products </h1>
            </div>
            <div className="min-vw-100 min-vh-100  justify-content-center align-items-center container-fluid">

                {productData && productData.products.map((item, index) =>
                    <><div className="products-container" key={index}>
                        {<Products title={item.title}
                            categories={item.categories}
                            price={item.price}
                            rent={item.rent}
                            description={item.description}
                            views={0}
                            handleOpenTrash={() => {}}
                            onCardClick={()=>onEditProductClicked(item)}
                            disable={true}
                             />}
                    </div></>
                )}
                
            </div>
           

        </>

    )

}
export default AllProduct;