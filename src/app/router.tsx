import { createHashRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import References from "../pages/References";

import Services from "../pages/Services";

// Service detail pages
import Namakanje from "../pages/services/Namakanje";
import ZemeljskaDela from "../pages/services/ZemeljskaDela";
import ZelenePovrsine from "../pages/services/ZelenePovrsine";
import Terase from "../pages/services/Terase";
import Vzdrzevanje from "../pages/services/Vzdrzevanje";
import Drevesa from "../pages/services/Drevesa";

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "references", element: <References /> },

      {
        path: "services",
        children: [
          { index: true, element: <Services /> },
          { path: "namakanje", element: <Namakanje /> },
          { path: "zemeljska-dela", element: <ZemeljskaDela /> },
          { path: "zelene-povrsine", element: <ZelenePovrsine /> },
          { path: "terase", element: <Terase /> },
          { path: "vzdrzevanje", element: <Vzdrzevanje /> },
          { path: "drevesa", element: <Drevesa /> },
        ],
      },
    ],
  },
]);
