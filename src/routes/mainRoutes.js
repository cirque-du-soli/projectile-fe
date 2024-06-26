import UserHomePage from "../pages/user/user-home-page.js";
import UserSettingsPage from "../pages/user/user-settings-page.js";
import MosaicMainPage from "../pages/mosaic/main.js";
import MosaicMain from "../pages/mosaic/main.js";

// OBSOLETE IMPORTS
//import MainDashboard from "../views/mainDashboard.jsx";
//import PageNotFound from "../pages/404/pageNotFound404.js";
// import UserNotAuthorized from "../pages/notAuth/notAuthorized.js";
// import LandingPage from "../pages/landing.js";
// import LoginPage from "../pages/user/login.js";
// import RegistrationPage from "../pages/user/regi.js";

var mainRoutes = [

  {
    path: "/mosaic",
    name: "General Mosaic Page",
    component: <MosaicMainPage />,
  },

  {
    path: "/settings",
    name: "Login Page",
    component: <UserSettingsPage />,
  },

  {
    path: "/home",
    name: "User Home Page",
    component: <UserHomePage />,
  },

  {
    path: "/main/:id",
    name: "Mosaic Main",
    component: <MosaicMain />,
  },
  /*
 {
   path: "/PageNotFound",
   name: "Main PageNotFound",
   component: <PageNotFound />,
 },

 {
   path: "/UserNotAuthorized",
   name: "Main NotAuthorized",
   component: <UserNotAuthorized />,
 },

 {
   path: "/dashboard",
   name: "Main Dashboard",
   component: <MainDashboard />,
 },

  {
   path: "/welcome",
   name: "Landing Page",
   component: <LandingPage />,
 },

 {
   path: "/register",
   name: "Registration Page",
   component: <RegistrationPage />,
 },

 {
   path: "/login",
   name: "Login Page",
   component: <LoginPage />,
 },  
 */

];

export default mainRoutes;
