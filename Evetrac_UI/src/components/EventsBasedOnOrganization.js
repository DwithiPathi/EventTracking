import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EventService from "../services/EventService";
import Footer from "./NavBar/Footer";
import Navbar from "./NavBar/Nav";
//import Navbar from "../NavBarComponents/Navbar";
// import { useNavigate } from "react-router-dom";

const URL = "http://localhost:9090";

const Home = (props) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTearm, setsearchTearm] = useState("");
  const [event, setEvent] = useState([]);
  //const [eventData, setEventData] = useState([]);
  const loggedUserId = location.state.data;
  const searchEvents = async (title) => {
    if (title === "") {
      // EventService.getAllEventsByOrganizationName(userId).then((response) => {
      //   setEvent(response.data);
      //   console.log("in Organization based on user id page", response.data);
      // });
      // EventService.getAllEventsByOrganizationName(organizationName).then(
      //   (response) => {
      //     setEvent(response.data);
      //     console.log(response.data);
      //     console.log(organizationName);
      //     console.log("in Organizations page");
      //   }
      // );
    } else {
      const userId = location.state.data;
      const response = await fetch(        
        `${URL}/locationonUserId?eventLocation=${title}&&userId=${userId}`
      );
      const data = await response.json();
      console.log(data,"hhkhjjjjjjjjjjjjjjj");
      setEvent(data);
    }
  };

  const eventDetails = async (eventId) => {
    const response = await fetch(`${URL}/getEventByEventId?eventId=${eventId}`);
    const data = await response.json();
    //setEvent(data);
    // setEventData(data);
    navigate("/event-detail", { state: { data: data } });
    // <EventDetail homedata={"this is satish"} />;
    // console.log(data);
  };

  useEffect(() => {
    const userId = location.state.data;
    EventService.getAllEventsByOrganizationName(userId).then((response) => {
      setEvent(response.data);
      console.log("in Organization based on user id page", response.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12 mb-5 ">
            <div className="input-group search" style={{ width: "50%" }}>
              <input
                className="form-control border"
                type="search"
                placeholder="Search for Events"
                value={searchTearm}
                onChange={(e) => setsearchTearm(e.target.value)}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary border ms-n7"
                  style={{background: "#98c8f2" }}
                  onClick={() => searchEvents(searchTearm)}
                  type="button"
                >
                  <span className="material-symbols-outlined icon-blue">
                    search
                  </span>
                </button>
              </span>
            </div>
          </div>
          {event &&
            event.map((events, index) => {
              return (
                <div className="col-11 col-md-6 col-lg-4 mx-0 mb-4">
                  <div className="card p-0 overflow-hidden h-100 shadow">
                    <div className="card-body">
                      <h5 className="card-title titleData">
                        {events.data.eventName}
                      </h5>
                      <p className="card-text">By {events.orgnaizationName}</p>
                      <p className="card-text eleData">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: "#0089a2",
                            fontWeight: "bold",
                            fontSize: "25px",
                            verticalAlign: "Middle",
                          }}
                        >
                          distance
                        </span>
                        <span>&nbsp;&nbsp; {events.data.eventLocation}</span>
                      </p>
                      <p className="card-text eleData">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: "#1870bd",
                            fontWeight: "bold",
                            fontSize: "25px",
                            verticalAlign: "Middle",
                          }}
                        >
                          calendar_month
                        </span>
                        <span>
                          &nbsp;&nbsp;{events.data.eventStartDate}&nbsp;-&nbsp;
                          {events.data.eventEndDate}
                        </span>
                      </p>
                      <p className="card-text eleData">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: "#b60b0b",
                            fontWeight: "bold",
                            fontSize: "25px",
                            verticalAlign: "Middle",
                          }}
                        >
                          schedule
                        </span>
                        <span>
                          &nbsp;&nbsp;{events.data.eventStartTime}&nbsp;-&nbsp;
                          {events.data.eventEndTime}
                        </span>
                      </p>
                      <p className="card-text">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: "#d58c2c",
                            fontWeight: "bold",
                            fontSize: "25px",
                            verticalAlign: "Middle",
                          }}
                        >
                          how_to_reg
                        </span>
                        {events.data.isRegistrationRequired === "Yes" ? (
                          <span>
                            &nbsp;&nbsp; Registration required. To register{" "}
                            <a target={"_blank"}>{events.data.registrationUrl}</a>
                          </span>
                        ) : (
                          <span>&nbsp;&nbsp; No registration required.</span>
                        )}
                      </p>

                      <NavLink
                        className="btn btn-outline-dark col-lg-10 "
                        style={{
                          align: "center",
                          width: "60%",
                          marginLeft: "65px",
                        }}
                        onClick={() => eventDetails(events.data.eventId)}
                      >
                        View more...
                      </NavLink>
                      <div></div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
