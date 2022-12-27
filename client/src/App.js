import InfoCard from "./Card";
import './App.css'
import { useEffect, useState } from "react";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('here')
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  return (
    <div className="App">
      {user ? 
        <InfoCard /> : 
        <Login loggedIn={handleLogin}/>
      }
    </div>
  );
}

export default App;
