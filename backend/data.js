import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'David',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123123', 12),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123123', 12),
    },
  ],
  products: [
    {
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 5000,
      countInStock: 2,
      brand: 'Nike',
      rating: 2.0,
      numReviews: 10,
      description: 'nice quality shirt',
    },
    {
      name: 'Adidas Fit shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 8000,
      countInStock: 30,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 14,
      description: 'high quality shirt',
    },
    {
      name: 'Nike Slim pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: '/images/p3.jpg',
      price: 4000,
      countInStock: 8,
      brand: 'Nike',
      rating: 3.5,
      numReviews: 40,
      description: 'high quality product',
    },
    {
      name: 'Adidas Slim pant',
      slug: 'adidas-slim-pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 4000,
      countInStock: 8,
      brand: 'Adidas',
      rating: 4.6,
      numReviews: 4,
      description: 'high quality pant',
    },
  ],
};

export default data;
