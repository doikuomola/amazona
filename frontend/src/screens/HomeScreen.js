import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';

export default function HomeScreen() {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                width="400px"
                height="300px"
              />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <h2>{product.name}</h2>
              </Link>
              <p>
                <strong>&#8358; {product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
