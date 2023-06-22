import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoHand from "../Images/blackLogo.PNG";
import "./Nav.css";
import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const loggedUser = useSelector((state) => state.user);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={LogoHand} alt="LogoHand" className="logo-img" />
          <span style={{ color: "white", fontSize: "45px" }}>
            &nbsp;EveTrac
          </span>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <span
            className="material-symbols-outlined"
            style={{ color: "white", fontSize: "36px" }}
          >
            menu
          </span>
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              {loggedUser.data.label.userRole === "USER" ? (
                <NavDropdown title="Events">
                  <NavDropdown.Item href="/userhome">
                    UpComing Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/previousEvents">
                    Previous Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/wishlistedEvents">
                  Bookmarked Events
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Events">
                  <NavDropdown.Item href="/userhome">
                    Upcoming Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/previousEvents">
                    Previous Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/organizerhome">
                    My Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/wishlistedEvents">
                  Bookmarked Events
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/add-event">
                    {" "}
                    Create Event
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </li>
            <li>
              <NavLink to="/organizationsListing">Organizations</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">About</NavLink>
            </li>
            <li>
              <span
                className="material-symbols-outlined"
                style={{ verticalAlign: "sub" }}
              >
                account_circle
              </span>
              <NavLink to="/profile">{loggedUser.data.label.firstName}</NavLink>
            </li>
            <li>
              <span
                className="material-symbols-outlined"
                style={{ color: "white", verticalAlign: "sub" }}
              >
                logout
              </span>
              <NavLink to="/">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
