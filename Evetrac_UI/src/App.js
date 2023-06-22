import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEvent from "./components/AddEvent";
import UserEventsHome from "./components/Home";
import { EventDetail } from "./components/EventDetail/EventInfo";
import LoginPage from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import RegisterPage from "./components/Authentication/Register";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import OrganizationList from "./components/OrganizationsHome";
import EventsOnOrganizations from "./components/EventsBasedOnOrganization";
import Profile from "./components/profile";
import OrganizerHome from "./components/OrganizerHome";
import About from "./components/About.js";
import PreviousEvents from "./components/PreviousEvents";
import UpdateEvent from "./components/UpdateEvent";
import WishlistedEvents from "./components/WishlistedEvents";
const App = () => {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/userhome" element={<UserEventsHome />}></Route>
          <Route path="/organizerhome" element={<OrganizerHome />}></Route>
          <Route path="/add-event" element={<AddEvent />}></Route>
          <Route path="/event-detail" element={<EventDetail />}></Route>
          <Route path="/Register" element={<RegisterPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/aboutus" element={<About />}></Route>
          <Route path="/previousEvents" element={<PreviousEvents />}></Route>
          <Route path="/update-event" element={<UpdateEvent />}></Route>
          <Route path="/wishlistedEvents" element={<WishlistedEvents />}></Route>
          <Route
            path="/organizationsListing"
            element={<OrganizationList />}
          ></Route>
          <Route
            path="/eventsonorganization"
            element={<EventsOnOrganizations />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
