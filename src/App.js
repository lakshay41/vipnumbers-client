import './App.css';
import Index from './Components/Index';
import {Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index} />
        
      </Switch> 
    </div>
  );
}

export default App;
