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
    Col, 
    Button, 
    Form 
} from 'react-bootstrap'

// import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch , useSelector } from 'react-redux'
import { paymentMethodAction } from '../actions/cartActions'

function PaymentScreen() {
    const cart = useSelector( state => state.cart)
    const { shippingAddress } = cart

    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin


    const [paymentMethod, setPaymentMethod] = useState('')
    const [message, setMessage] = useState('')



    let navigate = useNavigate()
    const dispatch = useDispatch()
    
    
    const paymentMethodHandler = (e) => {
        
        e.preventDefault()
        if(paymentMethod === ""){
            setMessage('no option selected')
        }else{
            dispatch(paymentMethodAction(paymentMethod))
            navigate('/placeOrder/')
        }
        
        
    }
    
    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping/')

        }
        else if(!userInfo){
            navigate('/login/')
        }}
        ,[userInfo, navigate, shippingAddress]
        )
  return (
    <FormContainer >
            <CheckOutSteps step1 step2 step3/>
            <h1 className="my-2">Shipping Address</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {/* {error && <Message variant='danger'>{error}</Message>} */}
            {/* {loading && <Loader />} */}
            <Form 
            onSubmit ={paymentMethodHandler}
            >
                <Form.Group controlId = 'name'>
                    <Form.Label className="mt-3 mb-1"><h5>Select Method :</h5></Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label ='PayPal or Credit Card'
                            id = 'paypal'
                            name='paymentMethod'
                            value='PayPal'
                            // checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            
                        </Form.Check>
                    </Col>
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

export default PaymentScreen