import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './App.css'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

function App() {
  const user = useSelector(state => state.user.user)
  
  return (
    <div className="App">
      {user ? 
        <Chat /> : 
        // <Signup />
        // <Login />
        <Chat />
      }
    </div>
  );
}

export default App;
