
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatsSection from "./components/ChatsSection";
import './App.css'
import FeedSection from "./components/FeedSection";
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
            <Route index element={<FeedSection />} />
            <Route path="home" element={<FeedSection />} />
            <Route path="feed/:feedId" />
            <Route path="reels" element={<ReelsSection />} />
            <Route path="reel/:reelId" />
            <Route path="users" element={<UsersSection />} />
            <Route path="user/:userId" />
            <Route path="chats" element={<ChatsSection />} />
            <Route path="m/:chatId" />
            <Route path="explore" element={<PlacesSection />} />
            <Route path="explore/:placeId" />
            <Route path="events" element={<EventsSection />} />
            <Route path="e/:eventId"  />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
