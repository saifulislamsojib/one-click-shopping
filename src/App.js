import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Orders from './components/Orders/Orders';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [products, setProducts] = useState([]);

  const [privateRender, setPrivateRender] = useState(false);

  const [searchInput, SetSearchInput] = useState('');

  const [finishSearch, setFinishSearch] = useState(false);

    const getSearchInput = e => {
        SetSearchInput(e.target.value);
    }

  const token = localStorage.getItem('oneClick/idToken');

  useEffect(() => {
    fetch(`https://apricot-crisp-29597.herokuapp.com/products?search=${searchInput}`)
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setFinishSearch(true);
    })
    .catch(err => {
      console.log(err);
      setFinishSearch(true);
    });
  }, [searchInput]);

  useEffect(() => {
    if(token){
      fetch('https://apricot-crisp-29597.herokuapp.com/user', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          authorization: token
        }
      })
      .then(res => res.json())
      .then(data=> {
        setLoggedInUser(data);
        setPrivateRender(true);
      })
      .catch(err => setPrivateRender(true));
    }
    else{
      setPrivateRender(true);
    };
  }, [token]);

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Header privateRender={privateRender} />
        <Switch>
          <Route exact path="/">
            <Home finishSearch={finishSearch} getSearchInput={getSearchInput} products={products} />
          </Route>
          <Route path="/home">
            <Home finishSearch={finishSearch} getSearchInput={getSearchInput} products={products} />
          </Route>
            {privateRender &&
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>}
           {privateRender &&
          <PrivateRoute path="/admin">
            <Admin products={products} setProducts={setProducts} />
          </PrivateRoute>}
          {privateRender &&
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>}
          <Route path="/login">
            <Login />
          </Route>
            {privateRender &&
            <PrivateRoute path="/checkout/:id">
            <Checkout />
          </PrivateRoute>}
          {privateRender &&
          <Route path="*">
            <NotFound />
          </Route>}
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;