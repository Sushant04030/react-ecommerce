import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch , useSelector } from 'react-redux'
import { register } from '../actions/userActions'


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    let navigate = useNavigate()
    const dispatch = useDispatch()


    const userLogin = useSelector( state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    
    const RegisterHandler = (e) => {
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            console.log(name, email, password)
            e.preventDefault()
            dispatch(register(name, email, password))
        }
    }
    
    useEffect(() => {
        if (userInfo){
            navigate('/')
        }
    },[
        navigate,
         userInfo, 
        //  redirect,
        ])

    return (
        <FormContainer >
            <h1 className="my-2">Register Now</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form 
            onSubmit ={RegisterHandler}
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
                        required
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
                        required
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
                // onClick={RegisterHandler} 
                >
                    Register
                </Button>
            </Form>
            <Row>
                <Col>
                Already have an account? <Link to ='/login/'>Login now.</Link>
                 </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen