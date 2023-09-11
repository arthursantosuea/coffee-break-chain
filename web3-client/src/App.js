import "./App.css";
import { Classifications } from "./pages/Classifications";
import { Home } from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/classifications",
      element: <Classifications />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
