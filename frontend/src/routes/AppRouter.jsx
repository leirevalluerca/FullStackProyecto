import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PropertyList from "../pages/PropertyList";
import PropertyDetail from "../pages/PropertyDetail";
import PropertyCreateNew from "../pages/PropertyCreateNew";
import MyBookings from "../pages/MyBookings";
import MyProperties from "../pages/MyProperties";
import EditProperty from "../pages/EditProperty";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/properties",
        element: <PropertyList />
      },
      {
        path: "/properties/:id",
        element: <PropertyDetail />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/my-properties/new",
        element: <PropertyCreateNew />
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />
      },
      {
        path: "/dashboard/my-properties",
        element: <MyProperties />
      },
      {
        path: "/dashboard/my-properties/:id/edit",
        element: <EditProperty />
      }
    ]
  }
]);
