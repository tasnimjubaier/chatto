import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Box from "./components/Box";
import './App.css'
import Call from "./components/Call/Call";
import Feed from "./components/Feed";
import Root from "./components/Root";

function App() {
  const user = useSelector(state => state.user.user)
  
  return (
    <div className="App">
      {user ? 
        <Root user={user}/> : 
        // <Signup />
        // <Box />
        <Login />
        // <Call />
        // <Feed />
        // <Counter />
      }
    </div>
  );
}

export default App;
