import { createBrowserRouter } from 'react-router-dom'

import App from "../App";
import Box from "../components/Box";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


const routes = [
	{
		path: '/',
		element: <App />,
		childern: [
			{
				path: '/login',
				element: <Login /> 
			},
			{
				path: '/signup',
				element: <Signup />
			},
			{
				path: '/m',
				element: <Box />
			}
		]
	}
]

export default createBrowserRouter(routes)