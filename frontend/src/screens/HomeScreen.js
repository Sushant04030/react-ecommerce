import React, { 
  // useState,
  useEffect 
} from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import { useDispatch , useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  let location = useLocation();
  const dispatch = useDispatch()
  const productList = useSelector( state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = location.search

  useEffect(() => {

    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  return (
    <div>
        <h1>latest Products</h1>

      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
                    <><Row>
          <h2>hello world</h2>
          {/* {products} */}
          {products && products.length ? products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )) : null}

        </Row><Paginate page={page} pages={pages} keyword={keyword} /></>

        }
    </div>
  )
}

export default HomeScreen