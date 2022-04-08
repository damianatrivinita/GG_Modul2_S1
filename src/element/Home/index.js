import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CreatePlaylist from "../CreatePlaylist";
import Login from "../Login";

function Home() {
  const token = useSelector((state) => state.token.value);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {!token ? <Login /> : <Redirect to="/create-playlist" />}
          </Route>
          <Route path="/create-playlist">
            <CreatePlaylist />
          </Route>
          <Route path="*">
            <h3>404</h3>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
 export default Home;
