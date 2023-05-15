import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Box from "./components/Box";
import './App.css'
import Call from "./components/Call/Call";
import Feed from "./components/Feed";
import Root from "./components/Root";

function callPlacesapi() {
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=23.77260092510139%2C90.42584835709935&radius=500&type=restaurant&key=AIzaSyDel5Ph4-tw-UufNeeWkdDgNySX2GNaDrM',
    headers: { }
  };
  axios(config)
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      // return "error fetching data"
    })
}



function App() {
  const user = useSelector(state => state.user.user)
  
  return (
    <div className="App">
      {user ? 
        <Root user={user}/> : 
        // <Signup />
        // <Box />
        // <Login />
        <div> <button onClick={callPlacesapi}>call api</button></div>
        // <Call />
        // <Feed />
        // <Counter />
      }
    </div>
  );
}

export default App;
