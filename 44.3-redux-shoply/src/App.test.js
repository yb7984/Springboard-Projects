import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from './reducers/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart);

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

test('renders learn react link', () => {
  render((
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
      </Provider>));
});
