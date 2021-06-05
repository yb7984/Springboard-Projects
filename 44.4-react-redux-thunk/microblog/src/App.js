import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import PostList from './PostList';
import { Route, Switch } from 'react-router';
import Post from './Post';
import Header from './Header';
import PostNew from './PostNew';
import PostEdit from './PostEdit';

library.add(faThumbsUp, faThumbsDown, faEdit, faTrashAlt);

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/new">
          <PostNew />
        </Route>
        <Route path="/posts/:postId/edit">
          <PostEdit />
        </Route>
        <Route path="/posts/:postId">
          <Post />
        </Route>
        <Route>
          <PostList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
