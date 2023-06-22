import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import EventService from "../services/EventService";
//import Navbar from "./NavBarComponents/Navbar.js";
import Navbar from "./NavBar/Nav";
import { useSelector } from "react-redux";
import "../Styling/Home.css";
import Footer from "./NavBar/Footer";
import UserService from "../services/UserService";
const URL = "http://localhost:9090";


const Home = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  //console.log(loggedUser, "USA");
  const loggedUserId = loggedUser.data.label.userId;
  console.log("Loggedin User id ", loggedUserId);
  //console.log(localStorage.getItem("persistantState"), "USAp");
  //console.log(loggedUser.data.label.firstName,"US")
  const [searchTearm, setsearchTearm] = useState("");
  const [enabledIndexes, setEnabledIndexes] = useState([]);
  const [event, setEvent] = useState([]);
  const [clicked, setClicked] = useState(false);
  const searchEvents = async (title) => {
    if (title === "") {
      EventService.getAllEventsByOrganizationName(loggedUserId).then(
        (response) => {
          setEvent(response.data);
          //console.log("in Organizer page", response.data);
        }
      );
    } else {
      const response = await fetch(
        `${URL}/locationonUserId?eventLocation=${title}&&userId=${loggedUserId}`
      );
      const data = await response.json();
      console.log(data);
      setEvent(data);
    }
  };

  const eventDetails = async (eventId) => {
    const response = await fetch(`${URL}/getEventByEventId?eventId=${eventId}`);
    const data = await response.json();
    //setEvent(data);
    // setEventData(data);
    navigate("/event-detail", { state: { data: data , isOrganizer:true} });
    // <EventDetail homedata={"this is satish"} />;
    // console.log(data);
  };

  const handleClick = (index,eventId) => {
    if (enabledIndexes.includes(index)) {
      UserService.removeFromWishlist(loggedUserId,eventId)
      setEnabledIndexes(enabledIndexes.filter(i => i !== index));
     
    } else {
      UserService.addToWishlist(loggedUserId,eventId)
      setEnabledIndexes([...enabledIndexes, index]);
      
      // call your button click function here
    }
   // console.log(eventId,"sdghsjh")
    setClicked(!clicked);
    if(clicked){

      EventService.addToWishlist(loggedUserId).then(
        (response) => {
          setEvent(response.data);
          //console.log("in Organizer page", response.data);
        }
      );

    }
    else{

    }
  };

  const buttonStyle = {
    backgroundColor: clicked ? 'green' : 'white',
    color: clicked ? 'white' : 'black'
  };

  useEffect(() => {
    EventService.getAllEventsByOrganizationName(loggedUserId).then(
      (response) => {
        setEvent(response.data);
        console.log("in Organizer page", response.data);
      }
    );
  }, []);
  return (
    <>
      <Navbar />

      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-sm-12 mb-5">
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
                      <div className="row" style={{                        
                          marginTop: "60px",
                        }}>
                      <div className="col-sm-6">
                      <NavLink
                        className="btn btn-outline-dark col-lg-10 "
                        
                        onClick={() => eventDetails(events.data.eventId)}
                      >
                        View more...
                      </NavLink>
                      </div>
                      <div className="col-sm-6">
                      <button onClick={()=>handleClick(index,events.data.eventId)}   >
                      <span class="material-symbols-outlined">bookmark</span>
                      {enabledIndexes.includes(index) ? 'Bookmarked' : 'Bookmark'}</button>      </div>
                      <div>
                      </div>
                    

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* <ChatRoom /> */}
      <Footer />
    </>
  );
};

export default Home;
