import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true };
    }
    case 'FETCH_SUCCESS': {
      return { ...state, products: action.payload, loading: false };
    }
    case 'FETCH_FAILURE': {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get('/api/products');

        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}
