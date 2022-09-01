import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CartScreen,
  DashboardScreen,
  HomeScreen,
  OrderHistoryScreen,
  OrderScreen,
  PaymentMethodScreen,
  PlaceOrderScreen,
  ProductScreen,
  ProfileScreen,
  SearchScreen,
  ShippingAddress,
  SigninScreen,
  SignUpScreen,
} from './screens';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from './context/Store';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/esm/Button';
import { getError } from './utils/error';
import axios from 'axios';
import {
  AdminRoute,
  LoadingBox,
  MessageBox,
  ProtectedRoutes,
  SearchBox,
} from './components';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return { ...state, loading: true };

    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, loading: false, categories: action.payload };

    case 'FETCH_CATEGORIES_FAIL': {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      break;
  }
}

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
  });
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_CATEGORIES' });
      try {
        const { data } = await axios.get('/api/products/categories');
        dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_CATEGORIES_FAIL', payload: getError(error) });
        toast.error(getError(error));
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'site-container d-flex flex-column full-box active-cont'
            : 'site-container d-flex flex-column'
        }
      >
        <Toaster position="bottom-center" gutter={8} />
        <header className="App-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen((prev) => !prev)}
              >
                <i className="fas fa-bars" />
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox>{error}</MessageBox>
              ) : (
                categories?.map((category) => (
                  <Nav.Item key={category}>
                    <LinkContainer
                      to={`/search?category=${category}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                ))
              )}
            </Nav.Item>
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoutes>
                    <ProfileScreen />
                  </ProtectedRoutes>
                }
              />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoutes>
                    <OrderHistoryScreen />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoutes>
                    <OrderScreen />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route path={`/product/:slug`} element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
