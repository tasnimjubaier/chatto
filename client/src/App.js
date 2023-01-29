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
  function onSignIn(googleUser) {
    // Get the Google user's profile information
    var profile = googleUser.getBasicProfile();
  
    // Use the profile information to sign the user in to your application
    // signIn(profile.getEmail(), profile.getName());
  }
  

  return (
    <div className="App">
      {user ? 
        <InfoCard /> : 
        // <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <Login loggedIn={handleLogin}/>
      }
    </div>
  );
}

export default App;
