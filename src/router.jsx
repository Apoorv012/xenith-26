import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Timeline from "./pages/Timeline/Timeline";
import Events from "./pages/Events/Events";
import Gallery from "./pages/Gallery/Gallery";
import Team from "./pages/Team/Team";
import Contact from "./pages/Contact/Contact";
import NavPage from "./pages/NavPage/NavPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/timeline", element: <Timeline /> },
      { path: "/events", element: <Events /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/team", element: <Team /> },
      { path: "/contact", element: <Contact /> },
      { path: "/nav", element: <NavPage /> },
    ],
  },
]);

export default router;
