import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartComponent from './components/CartComponent';
import NavbarComponent from './components/NavbarComponent';
import SidenavComponent from './components/SidenavComponent';
import ProductComponent from './components/ProductComponent';
import axios from 'axios';
import { API_URL } from './config/config';
import swal  from 'sweetalert';


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products: [],
       currentCategory: 'Makanan',
       categories: [],
       cart:[]
    }
  }

  componentDidMount() {
    axios.get(API_URL+"category")
      .then(res => {
        const categories = res.data;
        
        this.setState({
          categories : categories,
          products : categories[0].product,
        });
      }).catch(err => {
        console.log(err);
      })

    axios.get(API_URL+"cart")
      .then(res => {
        const cart = res.data;
        this.setState({
          cart : cart,
        });
      }).catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate(prevState) {
    if (this.state.cart !== prevState.cart) {
      axios.get(API_URL+"cart")
      .then(res => {
        const cart = res.data;
        this.setState({
          cart : cart,
        });
      }).catch(err => {
        console.log(err);
      }) 
    }
  }

  changeCategory = (product, name) => {
    this.setState({
      products : product,
      currentCategory: name
    })
  }

  storeCart = (product) => {
    axios.get(API_URL+"cart/product/"+product.id)
      .then(res => {
        if (res.data.length === 0) {
          axios.post(API_URL+"cart", {productId:product.id})
            .then(response => {
              if (response.statusText == "Created") {
                swal({
                  title: "Success",
                  text: product.name+" enter the cart",
                  icon: "success",
                  button: false,
                  timer:1500
                });
              }
            }).catch(err => {
              console.log(err);
            })
          
        }else {
          swal({
            title: "Warning",
            text: product.name+" Already this cart",
            icon: "info",
            button: false,
            timer:1500
          });
        }
      }).catch(err => {
        console.log(err);
      })
  }

  updateCart = (cartId) => {
      axios.put(API_URL+"cart/update/"+cartId)
        .then(response => {
          swal({
            title: "Success",
            text: "Success update",
            icon: "success",
            button: false,
            timer:1500
          });
        }).catch(err => {
          console.log(err);
        })
  }

  minusCart = (cartId) => {
      axios.put(API_URL+"cart/minus/"+cartId)
        .then(response => {
          swal({
            title: "Success",
            text: "Success update",
            icon: "success",
            button: false,
            timer:1500
          });
        }).catch(err => {
          console.log(err);
        })
  }

  deleteCart = (cartId) => {
    axios.delete(API_URL+"cart/delete/"+cartId)
        .then(response => {
          swal({
            title: "Success",
            text: "Success delete",
            icon: "success",
            button: false,
            timer:1500
          });
        }).catch(err => {
          console.log(err);
        })
  }

  
  render() {
    const { products, categories, currentCategory, cart } = this.state
    return (
      <div className="App">
        <NavbarComponent />
        <div>
          <Container fluid>
            <Row>
              <SidenavComponent changeCategory={this.changeCategory} categories={categories} name={currentCategory}/>
              <Col>
                <h4>
                    <hr/>
                    <strong>List Menu</strong>
                    <hr/>
                </h4>
                <Row>
                  {products && products.map((product) => {
                    return <ProductComponent 
                              key={product.id} 
                              product={product} 
                              storeCart={this.storeCart}
                            />
                  })}
                </Row>
              </Col>
              <CartComponent cart={cart} updateCart={this.updateCart} deleteCart={this.deleteCart} minusCart={this.minusCart} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
