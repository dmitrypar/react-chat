import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import LoginContainer from "./pages/login/loginContainer";
import RegisterContainer from "./pages/register/registerContainer";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./redux/reducers/index";
import { setUser, outUser, setDisplayChannelList } from "./redux/actions/index";
import Loader from "./components/loader/index";
import firebase from "./firebase/firebase";

const store = createStore(RootReducer, composeWithDevTools());

class Root extends React.Component {
  state = {
    dislayedChannels: [],
  };

  componentDidMount(props) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push("/");
        this.props.setUser(user);
      } else {
        this.props.history.push("/login");
        this.props.outUser(user);
      }
    });
  }

  render() {
    return this.props.loading ? (
      <Loader />
    ) : (
      <Switch>
        <Route exact path={"/"} component={App} />
        <Route path={"/login"} component={LoginContainer} />
        <Route path={"/register"} component={RegisterContainer} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  dislayedChannelsinState: state.channels.currentChannelsList,
});

const RootWithRouter = withRouter(
  connect(mapStateToProps, { setUser, outUser, setDisplayChannelList })(Root)
);

export default Root;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithRouter />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
