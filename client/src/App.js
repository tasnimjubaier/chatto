
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
import Feed from "./components/Feed"
import Reel from "./components/Reel"
import User from "./components/User"
import Place from "./components/Place"
import Event from "./components/Event"
import Chat from "./components/Chat"



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />}>
            <Route index element={<FeedSection />} />
            <Route path="home" element={<FeedSection />} />
            <Route path="feed/:feedId" element={<Feed />} />
            <Route path="reels" element={<ReelsSection />} />
            <Route path="reel/:reelId" element={<Reel />} />
            <Route path="users" element={<UsersSection />} >
              <Route path="user/:userId" element={<User />} />
            </Route>
            <Route path="chats" element={<ChatsSection />} />
            <Route path="m/:chatId" element={<Chat />} />
            <Route path="explore" element={<PlacesSection />} >
             <Route path="explore/:placeId" element={<Place />} />
            </Route>
            <Route path="events" element={<EventsSection />} >
              <Route path="e/:eventId" element={<Event />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
