import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Box from "./components/Box";
import './App.css'

function App() {
  const user = useSelector(state => state.user.user)
  
  return (
    <div className="App">
      {user ? 
        <Box user={user}/> : 
        // <Signup />
        // <Box />
        <Login />
        // <Counter />
      }
    </div>
  );
}

export default App;
