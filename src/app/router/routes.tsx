import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StartPage from "../../features/registration/ui/StartPage";
import AuthLayout from "../../features/registration/ui/AuthLayout";
import WelcomePage from "../../features/registration/ui/WelcomePage";
import AcquaintPage from "../../features/registration/ui/AcquaintPage";
import LookingFor from "../../features/registration/ui/LookingFor";
import TypeSearch from "../../features/registration/ui/TypeSearch";
import TellSelf from "../../features/registration/ui/TellSelf";
import RadiusMap from "../../features/registration/ui/RadiusMap";
import AddPhoto from "../../features/registration/ui/AddPhoto";
import ProfileStart from "../../pages/ProfileStart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: StartPage },
      { path: "welcome", Component: WelcomePage },
      { path: "profile-start", Component: ProfileStart },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "acquaint", Component: AcquaintPage },
          { path: "looking", Component: LookingFor },
          { path: "search-type", Component: TypeSearch },
          { path: "about-you", Component: TellSelf },
          { path: "radius-map", Component: RadiusMap },
          { path: "add-photo", Component: AddPhoto },
        ],
      },
    ],
  },
]);
