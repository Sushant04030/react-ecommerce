import React, { 
    useState, 
    useEffect
} from 'react'
import { 
    Link, 
    // useLocation, 
    useNavigate,
    // useNavigationType,
} from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { 
    useDispatch,
    useSelector,
} from 'react-redux'
import { login } from '../actions/userActions'


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();   
    // let history = useNavigationType();   
    const dispatch = useDispatch();
    
    // let location = useLocation();
    // let redirect = location.pathname ? location.pathname.split('qty=')[1] : '/'

    const userLogin = useSelector( state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    
    useEffect(() => {
        if (userInfo){
            navigate('/')
        }
    },[
        navigate,
         userInfo
        ])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }


    return (
        <FormContainer >
            <h1 className="my-2">Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form 
            // onSubmit ={submitHandler}
            >
                <Form.Group controlId = 'email'>
                    <Form.Label className="mt-3 mb-1"><h5>Email Address :</h5></Form.Label>
                    <Form.Control 
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
                <Button className="my-2" type="submit" variant="primary" onClick={submitHandler}>
                    Sign In
                </Button>
            </Form>
            <Row>
                <Col>
                Don't have an account? <Link to ='/register/'>Register now.</Link>
                 </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen