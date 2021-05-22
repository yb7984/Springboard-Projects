
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import './App.css';
import Color from './Color';
import ColorForm from './ColorForm';
import ColorList from './ColorList';

function App() {
  const history = useHistory();
  const [colors, setColors] = useState([
    {
      name: "Red",
      value: "#FF0000"
    }
  ]);

  const addColor = (name, value) => {
    setColors(oldColors => {
      return [
        ...oldColors,
        {
          name,
          value
        }
      ];
    });

    history.push('/colors');
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/colors/new">
          <ColorForm colors={colors} addColor={addColor}></ColorForm>
        </Route>
        <Route exact path="/colors/:colorName">
          <Color colors={colors}></Color>
        </Route>
        <Route exact path="/colors">
          <ColorList colors={colors}></ColorList>
        </Route>
        <Redirect to="/colors" />
      </Switch>
    </div>
  );
}

export default App;
