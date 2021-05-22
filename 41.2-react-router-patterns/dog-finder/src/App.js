import './App.css';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import DogList from './DogList';
import Nav from './Nav';
import DogDetails from "./DogDetails";
import whiskey from './dogs/whiskey.jpg';
import duke from './dogs/duke.jpg';
import perry from './dogs/perry.jpg';
import tubby from './dogs/tubby.jpg';

function App({ dogs }) {
  const history = useHistory();
  let dogHtml = null;

  //get the dog's name if match detail route
  const match = useRouteMatch('/dogs/:dogName');
  if (match) {
    const dog = dogs.find(dog => (dog.name === match.params.dogName));

    if (dog) {
      dogHtml = <DogDetails dog={dog}></DogDetails>;
    } else {
      history.push('/dogs');
    }
  }
  return (
    <div className="App">
      <Nav dogs={dogs} />
      <Switch>
        <Route path='/dogs/:dogName'>
          {dogHtml}
        </Route>
        <Route path='/dogs'>
          <DogList dogs={dogs}></DogList>
        </Route>
        <Redirect to="/dogs" />
      </Switch>
    </div>
  );
}
App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}

export default App;
