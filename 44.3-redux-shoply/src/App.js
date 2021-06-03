import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Product from './Product';
import ProductList from './ProductList';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { productsLoad } from './actions';
import Navbar from './Navbar';

function App() {

  const dispatch = useDispatch();
  const products = useSelector(st => st.products);


  if (Object.keys(products).length === 0) {
    dispatch(productsLoad());
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/products/:productId'>
          <Product />
        </Route>
        <Route exact path='/'>
          <ProductList products={products} />
        </Route>
        <Route>
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
