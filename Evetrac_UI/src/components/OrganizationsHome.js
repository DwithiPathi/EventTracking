import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import OrganizationsService from "../services/OrganizationsService";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
//import Navbar from "./NavBarComponents/Navbar.js";
import Navbar from "./NavBar/Nav";
import Footer from "./NavBar/Footer";
const URL = "http://localhost:9090/events";

const OrganizationsHome = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = async (userId) => {
    console.log("called");
    navigate("/eventsonorganization", { state: { data: userId } });
  };

  useEffect(() => {
    OrganizationsService.getAllOrganizations().then((response) => {
      setOrganizations(response.data);
      console.log("All organizaions", response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <h3 style={{ paddingTop: "50px", paddingLeft: "450px" }}>
        List of Organizations
      </h3>
      {organizations &&
        organizations.map((organizations, index) => {
          if (organizations.organizationName !== "") {
            return (
              <div onClick={() => handleNavigation(organizations.userId)}>
                <Card
                  className="bg-light text-dark"
                  style={{
                    width: "70rem",
                    marginLeft: "10px",
                    marginTop: "50px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{organizations.organizationName}</Card.Title>
                    <Card.Text>
                      {organizations.organizationDescription}
                    </Card.Text>
                  </Card.Body>
                  <Card.Link
                    style={{ marginLeft: "15px", color: "blue" }}
                   
                  >
                    View Events
                  </Card.Link>
                  <br></br>
                </Card>
              </div>
            );
          }
        })}
      <Footer />
    </>
  );
};

export default OrganizationsHome;
