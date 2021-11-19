import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import history from "./history";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Shrine from "./Components/Shrine";

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={() => <h1>Home page</h1>} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/shrine" component={Shrine} />
        <Route component={() => <div>No such page!</div>} />
      </Switch>
    </div>
  </Router>
);

export default App;
