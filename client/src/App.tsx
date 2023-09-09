import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing pages
import { Home } from "./pages/Home";

export function App() {
  // defining routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}
