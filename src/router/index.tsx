import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home";
import SensorPage from "../pages/SensorPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/">
				<Route index element={<Home />} />
				<Route path=":sensorType" element={<SensorPage />} />
			</Route>
		</>
	)
);

export default router;
