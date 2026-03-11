import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CrimsonOSMockStartup from './components/Shared/CrimsonOSMockStartup';
import CrimsonOSLanding from './components/Core/CrimsonOSLanding';

function App() {
	const router = createBrowserRouter([
		{ path: '/', element: <CrimsonOSMockStartup />},
		{ path: '/gameplay', element: <CrimsonOSLanding gameplay={true}/>},
		{ path: '/login', element: <CrimsonOSLanding gameplay={false} />}
	])

	return (
		 <RouterProvider router={router} />
	);
}

export default App;
