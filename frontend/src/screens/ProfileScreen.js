import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch , useSelector} from 'react-redux'
import { getUserDetails, updateUserDetails  } from '../actions/userActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'


function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector( state => state.userDetails)
    const { error, loading, user } = userDetails

    var good = 'danger'

    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin
    
    const updateUserDetailsR = useSelector( state => state.updateUserDetailsR )
    const { success } = updateUserDetailsR

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
      if (!userInfo){
        navigate('/login/')
      }
      else {
        if (!user || success){
            dispatch({ type : USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails())
            dispatch(listMyOrders())
        }else{
            setName(user.name)
            setEmail(user.email)
          }
        }
    },[
      navigate,
         userInfo, 
        dispatch,
        user,
        success,
    ])

    const ProfileHandler = (e) => {
      e.preventDefault()
      if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            console.log(good)
            dispatch( updateUserDetails({
                "id" : user._id,
                "name" : name,
                "email" : email,
                "password" : password,
            }))
            setMessage('')

        }
    }
        
        return (
        <Row className='justify-content-center'>
            <Col md={4} xs={12} className='text-center'>
                <h1 className='mt-3'>User Profile</h1>
                {message && <Message variant={good}>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form 
                onSubmit ={ProfileHandler}
                >
                    <Form.Group controlId = 'name'>
                        <Form.Label className="mt-3 mb-1"><h5>Full Name :</h5></Form.Label>
                        <Form.Control 
                            required
                            type = 'name'
                            placeholder = 'Full name'
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'email'>
                        <Form.Label className="mt-3 mb-1"><h5>Email Address :</h5></Form.Label>
                        <Form.Control 
                            required
                            type = 'email'
                            placeholder = 'email'
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'password'>
                        <Form.Label className="mt-3 mb-1"><h5>Password :</h5></Form.Label>
                        <Form.Control 
                            className="mb-2"
                            type = 'password'
                            placeholder = 'password'
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'confirmPassword'>
                        <Form.Label className="mt-3 mb-1"><h5>Confirm Password :</h5></Form.Label>
                        <Form.Control 
                            className="mb-2"
                            type = 'password'
                            placeholder = 'confirmPassword'
                            value = {confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button 
                    className="my-2" 
                    type="submit" 
                    variant="primary" 
                    >
                        Update
                    </Button>
                </Form>
            </Col>


            <Col md={8} xs={12} className="text-center">
                <h1 className='mt-3'>My Orders</h1>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
  )
}

export default ProfileScreen