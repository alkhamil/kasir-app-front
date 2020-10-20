import React, { Component } from 'react'
import { Col, Row, Card, Badge, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default class CartComponent extends Component {

    render() {
        const {cart , updateCart, deleteCart, minusCart} = this.props
        const scrolling={
            padding: '10px',
            overflowY: 'scroll',
            border:'1px solid #ccc',
            width:'auto',
            height:'400px',
        };
        return (
            <Col md="3">
                <hr/>
                <h4>
                    <strong>Cart</strong>
                </h4>
                <hr/>
                {cart.length !== 0 && (
                    <Row>
                        {cart.map((c)=> (
                            <Col md="12" key={c.id}>
                                <Card className="shadow border-0">
                                    <Card.Body>
                                        <Row>
                                            <Col md="3" sm="3">
                                                <Card.Img className="shadow" variant="top" src={c.product.image} style={{height:60, width:60}} />
                                            </Col>
                                            <Col>
                                                <h5><strong>Rp. {numberWithCommas(c.total_price)}</strong></h5>
                                                <small className="base-price">Rp. {numberWithCommas(c.product.price)}</small>
                                            </Col>
                                            <Col md="3" sm="3">
                                                <h5>
                                                <Badge pill variant="success">
                                                {c.qty}
                                                </Badge>
                                                </h5>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2 no-gutters">
                                            <Col>
                                                <Button size="sm" onClick={()=> minusCart(c.id)} variant="outline-warning">
                                                    <FontAwesomeIcon icon={faMinus} /> Kurang
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button size="sm" onClick={()=> updateCart(c.id)} variant="outline-success">
                                                    <FontAwesomeIcon icon={faPlus} /> Tambah
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button size="sm" onClick={()=> deleteCart(c.id)} variant="outline-danger">
                                                    <FontAwesomeIcon icon={faTrash} /> Hapus
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                {/* <ListGroup>
                    <ListGroup.Item>
                        
                    </ListGroup.Item>
                </ListGroup> */}
            </Col>
        )
    }
}
