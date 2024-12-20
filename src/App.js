import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  UserProvider;
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
