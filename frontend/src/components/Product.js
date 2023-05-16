import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
function Product({ product }) {
  return (
        <Card className="my-3 p-3 rounded">
            <Link key={product._id} to={`/product/${product._id}`}>
            {/* <a href={`/product/${product._id}`}> */}
                <Card.Img src={product.image} />
                
                {/* </a> */}
            </Link>

            <Card.Body>
                <Link key={product._id} to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        {/* <i className="fa fa-star"></i>{product.rating} from {product.numReviews} */}
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
                    </div>
                </Card.Text>
                <Card.Text as="h4">
                    <div className="my-3">
                        ${product.price}
                    </div>
                </Card.Text>
            </Card.Body>    
        </Card>
  )
}

export default Product