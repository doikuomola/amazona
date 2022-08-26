import data from './data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  width="400px"
                  height="300px"
                />
              </a>
              <div className="product-info">
                <a href={`/product/${product.slug}`}>
                  <h2>{product.name}</h2>
                </a>
                <p>
                  <strong>&#8358; {product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
