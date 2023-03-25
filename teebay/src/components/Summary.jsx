import React from "react";
import { Card } from 'react-bootstrap';
function Summary({ title, categories, description, price, rent,rentType }) {
    return (
        <Card className="p-4">


            <Card.Body>
               
                <Card.Title className="text-dark">Title: { title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Categories: {categories.join(', ')}</Card.Subtitle>
                <Card.Text className="text-dark">Description: {description}</Card.Text>
                <Card.Text className="text-muted">Price: {price}, To rent: {rent} {rentType}</Card.Text>

               

            </Card.Body>
        </Card>


    )

}
export default Summary;