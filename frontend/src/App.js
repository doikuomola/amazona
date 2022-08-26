import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen, ProductScreen } from './screens';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="/">Amazona</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path={`/product/:slug`} element={<ProductScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
