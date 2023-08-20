
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatsSection from "./components/ChatsSection";
import './App.css'
import FeedSection from "./components/Feed";
import Home from './pages/Home'
import EventsSection from "./components/EventsSection";
import PlacesSection from "./components/PlacesSection";
import UsersSection from "./components/UsersSection";
import ReelsSection from "./components/ReelsSection";





function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="home" element={<FeedSection />} />
            <Route path="reels" element={<ReelsSection />} />
            <Route path="users" element={<UsersSection />} />
            <Route path="chats" element={<ChatsSection />} />
            <Route path="groups" element={<PlacesSection />} />
            <Route path="events" element={<EventsSection />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
