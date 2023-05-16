import React, { 
    useState, 
    useEffect,
} from 'react'

import { 
    // Link,
    useNavigate 
} from 'react-router-dom'

import { 
    // Row, 
    // Col, 
    Button, 
    Form 
} from 'react-bootstrap'

// import Loader from '../components/Loader'
// import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch , useSelector } from 'react-redux'
import { shippingAddressAction } from '../actions/cartActions'


function ShippingScreen() {
    const cart = useSelector( state => state.cart)
    const { shippingAddress } = cart

    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin
    
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    // const [message, setMessage] = useState('')
    
    let navigate = useNavigate()
    const dispatch = useDispatch()
    
    
    const ShippingAddressHandler = (e) => {
        
        e.preventDefault()
        dispatch(shippingAddressAction({address, city, postalCode, country}))
        navigate('/payment/')
        
    }
    
    useEffect(() => {
        if(!userInfo){
            navigate('/login/')
        }else if(shippingAddress){
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }}
        ,[userInfo, navigate, shippingAddress]
        )
    // useEffect(() => {
        //     if (userInfo){
            //     }
    // },[
    //     navigate,
    //      userInfo, 
    //     //  redirect,
    //     ])

    return (
        <FormContainer >
            <CheckOutSteps step1 step2/>
            <h1 className="my-2">Shipping Address</h1>
            {/* {message && <Message variant='danger'>{message}</Message>} */}
            {/* {error && <Message variant='danger'>{error}</Message>} */}
            {/* {loading && <Loader />} */}
            <Form 
            onSubmit ={ShippingAddressHandler}
            >
                <Form.Group controlId = 'name'>
                    <Form.Label className="mt-3 mb-1"><h5>Address :</h5></Form.Label>
                    <Form.Control 
                        required
                        type = 'text'
                        placeholder = 'address'
                        value = {address ? address : ''}
                        onChange = {(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'email'>
                    <Form.Label className="mt-3 mb-1"><h5>City :</h5></Form.Label>
                    <Form.Control 
                        required
                        type = 'text'
                        placeholder = 'city'
                        value = {city ? city : ''}
                        onChange = {(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'email'>
                    <Form.Label className="mt-3 mb-1"><h5>Postal Code :</h5></Form.Label>
                    <Form.Control 
                        required
                        type = 'text'
                        placeholder = 'postal code'
                        value = {postalCode ? postalCode : ""}
                        onChange = {(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = 'email'>
                    <Form.Label className="mt-3 mb-1"><h5>Country :</h5></Form.Label>
                    <Form.Control 
                        required
                        type = 'text'
                        placeholder = 'country'
                        value = {country ? country : ''}
                        onChange = {(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                

                <Button 
                className="my-2" 
                type="submit" 
                variant="primary" 
                // onClick={RegisterHandler} 
                >
                    Submit
                </Button>
            </Form>
            

        </FormContainer>
    )
}

export default ShippingScreen