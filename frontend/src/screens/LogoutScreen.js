import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'


function LogoutScreen() {

    return (
        <FormContainer >
            <Row className="justify-content-center m-5  ">
                <Col>
                You have successfully logged out !<Link to ='/'>Go Back.</Link>
                 </Col>
            </Row>

        </FormContainer>
    )
}

export default LogoutScreen