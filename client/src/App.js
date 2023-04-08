import { useEffect, useState } from "react";
import './App.css'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    
  }, [])
  const handleLogin = (name, password) => {
    setUser(name)
  }
  const register = () => {

  }
  
  return (
    <div className="App">
      {user ? 
        <Chat /> : 
        // <Signup signup={register}/>
        <Login login={handleLogin}/>
      }
    </div>
  );
}

export default App;
