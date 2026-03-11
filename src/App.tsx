import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CrimsonOSMockStartup from './components/CrimsonOSMockStartup';
import GameplayWindow from "./components/GameplayWindow";
import LoginWindow from "./components/LoginWindow";

function App() {
	const router = createBrowserRouter([
		{ path: '/', element: <CrimsonOSMockStartup />},
		{ path: '/gameplay', element: <GameplayWindow />},
		{ path: '/login', element: <LoginWindow />}
	])

	return (
		 <RouterProvider router={router} />
	);
}

export default App;
