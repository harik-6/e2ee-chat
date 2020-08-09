import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/home";
import Demo from "./pages/demo/demo";
import Message from "./pages/message/message"

// redux imports
import { Provider } from "react-redux";
import store from './redux/store';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}  >
        <Router>
          <Route path="/" exact={true} component={Home} />
          <Route path="/demo" component={Demo} />
          <Route path="/chat" component={Message} />
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
