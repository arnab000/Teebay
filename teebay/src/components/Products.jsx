import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './products.css'
import trashIcon from '../icons/trash.png';

const Products = ({ title, categories, price, rent, description, views, handleOpenTrash ,onCardClick,disable}) => {
  const joinALLCategories =(catagories)=>{
    console.log(categories);
    let categoriesName=[];
    for(let i=0;i<categories.length;i++){
      categoriesName.push(categories[i].name)
    }
    console.log(categoriesName);
    return categoriesName;
  }
  return (
    <Card className="p-4">
      {
        disable ? null : <Button variant='' className="trash-icon"   onClick={handleOpenTrash} >
        <img  className='delete-button' src={trashIcon} alt="Trash Icon" />
      </Button>

      }
      
      
      <Card.Body onClick={onCardClick}>
     
        <Card.Title className="text-dark">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{joinALLCategories(categories).join(', ')}</Card.Subtitle>
        <Card.Text className="text-dark">{description}</Card.Text>
        <Card.Text className="text-muted">Price: {price} $</Card.Text>
        <Card.Text className="text-muted">Rent: {rent} $</Card.Text>
        <div className={"views text-muted" }>
          Views: {views}
        </div>
       
      </Card.Body>
    </Card>
   
  );
};

export default Products;