import React from 'react'
import { Col, Card } from 'react-bootstrap';

const ProductComponent = ({product, storeCart}) => {
    return (
        <Col md="4" sm="4" xs="6" className="mb-3" style={{cursor:"pointer"}}> 
            <Card className="shadow border-0" style={{height:220}} onClick={()=> storeCart(product)}>
                <Card.Img variant="top" src={product.image} style={{height:100}} />
                <Card.Body>
                    <h6>{product.name}</h6>
                    <strong>Rp. {numberWithCommas(product.price)}</strong>
                </Card.Body>
            </Card>
        </Col>
    )
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default ProductComponent
