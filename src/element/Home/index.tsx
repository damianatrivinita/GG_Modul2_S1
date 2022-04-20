import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CreatePlaylist from "../CreatePlaylist";
import Login from "../Login";
import Search from "../../components/Search";


function Home() {
  const token = useSelector((state: any) => state.token.value);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {!token ? <Login /> : <Redirect to="/create-playlist" />}
          </Route>
          <Route path="/create-playlist">
            {!token ? <Redirect exact to="/" /> : <CreatePlaylist />}
          </Route>
          <Route path="*">
            <h3>404</h3>
          </Route>
        </Switch>
      </Router>
      < Search />
    </div>
    
  );
}

 
export default Home;
