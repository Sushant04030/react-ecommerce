import React, { 
  // useState, 
  useEffect 
} from 'react'
import { Link, useParams,useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, 
  // Form 
} from 'react-bootstrap'
// import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch , useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'



function CartScreen() {
  const cart = useSelector( state => state.cart)
  const { cartItems } = cart

  const { id } = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  // console.log({location})
  const qty = location.pathname ? Number(location.pathname.split('qty=')[1]) : 1


  const dispatch = useDispatch();

  const userLogin = useSelector( state => state.userLogin)
  const { userInfo } = userLogin

  
  useEffect (() => {
    if (id){
      dispatch(addToCart(id, qty))
      
    }
    if (!cartItems){
      cartItems= []
    }
  },[dispatch, id, qty])
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    navigate(`/cart/`)

  } 

  const proceedToShippingAddress = () => {
    if(userInfo){
      navigate(`/shipping/`)
    }else{
      navigate('/login/')
    }

  }

  return (
    <Row className="text-center">
      <Col md={8}>
        <h1>shopping Cart</h1>
        {cartItems.length === 0 
        ? (
            <Message variant = 'flush'>
              Your Cart is empty <Link to ='/'> Go Back</Link>
            </Message>)
        :(
          <ListGroup variant = 'flush'>
              {cartItems.map(item => (
                <ListGroup.Item key ={item._id}>

                    <Row>
                      <Col md={3} sm={4} xs={12}>
                        <Image src = {item.image} alt = {item._name} fluid rounded />
                      </Col>

                      <Col md={3} sm={2} xs={12} className='mx-1 p-1' >
                        <Link to= {`/product/${item._id}`}>{item.name}</Link>
                      </Col>

                      <Col md={2} sm={2} xs={4} className='mx-1 p-1 text-center' >
                        Per item :<br />
                        ${item.price}
                      </Col>

                      <Col md={2} sm={2} xs={4} className='mx-1 p-1 text-center'>
                        {/* <Form.Control 
                          as ="select"
                          value ={qty}
                          onChange = {(e) => dispatch(addToCart(item._id, Number(e.target.value)))}
                        >
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                {x+1}
                              </option>
                            ))
                          }
                        </Form.Control> */}
                        Quantity :<br />
                        {item.qty}
                      </Col>
                      
                      <Col xs={1} >
                        <Button type= 'button'
                        variant ='light' 
                        onClick ={() =>removeFromCartHandler(item._id)}
                        >
                            <i className="fa fa-trash" />
                        </Button>
                      </Col>

                    </Row>
                </ListGroup.Item>
              ))}

          </ListGroup>

        )
        }
      </Col>

      <Col md={4}>
        <Card>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty , 0)}) items</h2>
              ${cartItems.reduce((acc,item) => acc + item.qty*item.price , 0).toFixed()}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item className="">
            <Button md={4} type ='button'
            className='btn-primary'
            disabled ={cartItems.length === 0 }
            onClick ={ () => proceedToShippingAddress()}

            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>

        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen