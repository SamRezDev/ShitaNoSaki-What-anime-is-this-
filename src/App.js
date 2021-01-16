import "./App.css";
import NavBar from "./components/NavBar.js";
import { Route, Switch } from "react-router-dom";
import RequestContainer from "./components/RequestContainer.js";
import twitter from "./icons/twitter.svg";
import About from "./container/About.js";
function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path={["/Home", "/"]} default>
          <RequestContainer />
        </Route>
        <Route path="/About">
          <About />
        </Route>
      </Switch>
      <div className="Footer">
        {" "}
        <a href="https://twitter.com/SaRez_wd" target="_blank" rel="noreferrer">
          {" "}
          Made by SamRez <img src={twitter} alt="twitter icon" />{" "}
        </a>{" "}
      </div>
    </div>
  );
}

export default App;
