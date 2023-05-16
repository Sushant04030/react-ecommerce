import React, { 
    useState, 
    useEffect,
} from 'react'

import { 
    Link,
    useNavigate 
} from 'react-router-dom'

import { 
    Image,
    Row, 
    Col, 
    Button, 
    // Form, 
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'

// import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch , useSelector } from 'react-redux'
// import { paymentMethodAction } from '../actions/cartActions'
import { orderCreateAction } from '../actions/orderActions'

function PlaceOrderScreen() {
    const cart = useSelector( state => state.cart)
    const orderCreate = useSelector( state => state.orderCreate)
    const { order, error, success } = orderCreate


    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin

    let navigate = useNavigate()
    const dispatch = useDispatch()

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    // // Submit function------------------------
    const placeOrderHandler = () => {
        dispatch(orderCreateAction({
            orderItems: cart.cartItems, 
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        navigate('/placeOrder/')
        
    }
    
    useEffect(() => {
        if(!cart.shippingAddress){
            navigate('/shipping/')

        }
        else if(!userInfo){
            navigate('/login/')
        }else if(success){
            navigate(`/order/${order._id}`)
        }
    }
        ,[userInfo, navigate, cart.shippingAddress, success]
        )
  return (
      <div >
          <FormContainer>
        <CheckOutSteps step1 step2 step3 step4/>
        {error && <Message variant='danger'>{error}</Message>}
          </FormContainer>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping : </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {' '}
                                 {cart.shippingAddress.postalCode},{' '} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method : </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 
                            ? <message variant ='info'>No cart items</message>
                            : (
                                <ListGroup variant ='flush'>
                                    {cart.cartItems.map((item,index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col xs={2}>
                                                    <Image src = {item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}/`}>{item.name}</Link>
                                                </Col>

                                                <Col xs={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>                                    
                                        ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant ="flush">
                        <ListGroup.Item>
                            <h2> Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Item : </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping : </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax : </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total : </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button
                            type = 'button'
                            className="btn-block"
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                        >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>


            
            

        </div>
  )
}

export default PlaceOrderScreen