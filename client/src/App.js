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
import EventsSection from "./components/EventsSection";
import { useLazyQuery } from "@apollo/client";
import { GET_PLACES_QUERY } from "./utils/queries";
import PlacesSection from "./components/PlacesSection";
import UsersSection from "./components/UsersSection";
import ReelsSection from "./components/ReelsSection";



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
        element: <PlacesSection />
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
  // const [getNearbyPlaces, {data, error}] = useLazyQuery(GET_PLACES_QUERY)
  // https://developers.google.com/maps/documentation/places/web-service/search-nearby
  // useEffect(()=> {
  //   getNearbyPlaces({ variables : {
  //     location: `23.8670522%2C90.1957362`,
  //     radius: "1500",
  //     keyword: "restaurant",
  //     type: "restaurant"
  //   }})
  //   console.log('feching places')
  // }, [])

  // useEffect(() => {
  //   if(error) console.log(error)
  //   if(data) {
  //     const obj = JSON.parse(data.getNearbyPlaces)
  //     console.log(obj)
  //   }
  // }, [data, error])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
