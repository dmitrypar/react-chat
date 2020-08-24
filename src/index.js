import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import firebase from "./components/firebase/firebase";
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './reducers/index'
import {setUser, outUser, setDisplayChannelList} from './actions/index'
import Loader from './components/Loader/index'


const store = createStore(RootReducer, composeWithDevTools())

class Root extends React.Component {

state={
  channelRef: firebase.database().ref('channels'),
  dislayedChannels: []
}

  componentDidMount(props) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/');
        this.props.setUser(user)
      } else {
        this.props.history.push('/login');
        this.props.outUser(user)
      }
      
   
    });

    let displayChannelList = []
    this.state.channelRef
    .on('child_added', (data)=>{
        displayChannelList.push(data.val())
    })
    
    
    if(displayChannelList){
      this.props.setDisplayChannelList(displayChannelList)
    }

    this.setState({dislayedChannels:displayChannelList })
    
  }

  componentWillUnmount () {
    this.state.channelRef
    .off()
  }

  render() {
    return this.props.loading ? <Loader/> : (
      <Switch>
        <Route exact path={"/"} component={App} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps =(state)=> (
  {
    loading: state.user.loading
  }
)

const RootWithRouter = withRouter(connect(mapStateToProps, {setUser, outUser, setDisplayChannelList})(Root));

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
