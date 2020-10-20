import React, { Component } from 'react'
import { Col, Row,  ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faUtensils, faBars } from "@fortawesome/free-solid-svg-icons";

const Icon = ({cat}) => {
    if(cat === "Makanan") return <FontAwesomeIcon icon={faUtensils} />
    if(cat === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if(cat === "Minuman Keras") return <FontAwesomeIcon icon={faBars} />

    return <FontAwesomeIcon icon={faUtensils} />
}


export default class SidenavComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { categories, changeCategory, name } = this.props
        return (
            <Col md="3">
                <hr/>
                <h4>
                    <strong>Category</strong>
                </h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => {
                        return <ListGroup.Item 
                                key={category.id} 
                                onClick={()=>changeCategory(category.product, category.name)} style={{cursor:"pointer"}}
                                className={name === category.name && "side-aktif"}
                                >
                                    <Row>
                                        <Col md="2" sm="3">
                                            <Icon cat={category.name} />
                                        </Col>
                                        <Col>
                                            {category.name}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                    })}
                </ListGroup>
            </Col>
        )
    }
}
