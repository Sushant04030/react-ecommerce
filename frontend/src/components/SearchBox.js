import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let navigate = useNavigate();
    let location = useLocation()

    const submitsearchHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(location.pathname)
        }
    }
    return (
        <Form 
            // onSubmit={submitsearchHandler} 
        >
            {/* <Row>
                <Col className='mr-0 p-0 pd-2' > */}
                    <Form.Control

                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search"
                        className=''
                        style={{padding:'0.6rem'}}
                        ></Form.Control>
                {/* </Col>
                <Col className='ml-0 p-0' >  */}
                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2'
                        onClick={submitsearchHandler}
                        >
                        Search
                    </Button>
                {/* </Col> */}
            {/* </Row> */}
        </Form>
    )
}

export default SearchBox
