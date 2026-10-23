import React from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import Accordion from "./components/Accordian.js";
import Gallery from "./components/Gallery.js";
import GalleryItem from "./components/GalleryItem.js";
import PeopleList from "./components/PeopleList.js";
import StyledComponent from "./components/StyledComponent.js";
import UserList from "./components/UserList.js";

import MainLayout from "./layouts/MainLayout.js";

import HomePage from "./pages/HomePage.js";
import ApodPage from "./pages/ApodPage.js";
import UserPage from "./pages/UserPage.js";
import PersonPage from "./pages/PersonPage.js";

import NotFoundPage from "./pages/NotFoundPage.js";
import RouteError from "./pages/RouteError.js";

import { usersLoader, userLoader } from "./loaders/userLoaders.js";

import "bulma/css/bulma.min.css";
import "./App.css";

// Hash URLs allow direct links and refreshes on static GitHub Pages hosting.
const createRouter = process.env.NODE_ENV === "production"
  ? createHashRouter
  : createBrowserRouter;

const router = createRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "nasa-api", element: <ApodPage /> },
        { path: "styled", element: <StyledComponent /> },
        { path: "accordion", element: <Accordion /> },
        { path: "gallery", element: <Gallery /> },
        { path: "gallery/:id", element: <GalleryItem /> },
        { path: "people", element: <PeopleList /> },
        { path: "people/:id", element: <PersonPage /> },
        { path: "users", loader: usersLoader, element: <UserList /> },
        {
          path: "user/:id",
          loader: userLoader,
          element: <UserPage />,
          errorElement: <RouteError />,
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
);

export default function App() {
  return <RouterProvider router={router} />;
}
