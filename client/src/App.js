import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatsSection from "./components/ChatsSection";
import './App.css'
import FeedSection from "./components/Feed";
import Home from './pages/Home'
import { SelectOptions } from "./utils/constants";
import UsersSection from "./components/UsersSection";
import ReelsSection from "./components/ReelsSection";
import EventsSection from "./components/EventsSection";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: SelectOptions.HOME,
        element: <FeedSection />
      },
      {
        path: SelectOptions.CHATS,
        element: <ChatsSection />
      },
      {
        path: SelectOptions.REELS,
        element: <ReelsSection />
      },
      {
        path: SelectOptions.GROUPS,
        element: <FeedSection />
      },
      {
        path: SelectOptions.EVENTS,
        element: <EventsSection />
      },
      {
        path: SelectOptions.USERS,
        element: <UsersSection />

      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }  
]);

function App() {
  const user = useSelector(state => state.user.user)
  
  return (
    <div className="App">
      {/* {user ? 
        <Root user={user}/> : 
        // <Signup />
        // <Box />
        <Login />
        // <div> <button onClick={callPlacesapi}>call api</button></div>
        // <Call />
        // <Feed />
        // <Counter />
      } */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
