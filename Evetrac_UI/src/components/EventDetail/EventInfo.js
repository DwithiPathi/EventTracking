import React from "react";
import { useState, useEffect } from "react";
import MeetingImg from "../Images/Gathering.jpg";
import { useLocation,useNavigate } from "react-router-dom";
//import EventStyling from './EventDetail.css'
import Navbar from "../NavBar/Nav";
import "./EventInfo.css";
import EventService from "../../services/EventService";
import Footer from "../NavBar/Footer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EventDetail = (props) => {
  // const iconStyle=EventStyling.icon;
  const navigate = useNavigate();
  const [ImageSrc, setImageSrc] = useState(null);
  const [update, setUpdate] = useState(false);
  const [delete1, setDelete1] = useState(false);
  //const[Event,setEvent]=useState();

  // const Event = location.state.data;
  const location = useLocation();
  console.log(location.state.data, "In detail Event");
  const Event = location.state.data;
  // var binaryData = [];
  //   binaryData.push(Event.imagePoster);
  //   setImageSrc(window.URL.createObjectURL(new Blob(binaryData, {type: "jpg/png"})));
  // const blob = new Blob([Event.imagePoster]);
  // const urlObj = URL.createObjectURL(blob);
  //   const fileReader = new FileReader();
  //   setImageSrc(urlObj)

  // fileReader.onload = () => {
  //   setImageSrc(fileReader.result);
  // };
  // fileReader.readAsDataURL(new Blob([Event.imagePoster]));

  //var val=0;
  const loggedUser = useSelector((state) => state.user);
  console.log(Event, "hey event details");
  console.log("Logged user", loggedUser);
  const Orgname = loggedUser.data.label.organizationName;
  const OrgDesc = loggedUser.data.label.organizationDescription;
  
  const updateEvent=(updateEvents)=>{
      console.log("Eventdetaols",updateEvents);
      navigate("/update-event", { state: { eventToUpdate: updateEvents } });
  }
  const deleteEvent=(deleteEventId)=>{
    EventService.deleteEvent(deleteEventId)
      .then((response) => {        
        console.log(response.data,"fadgfhgj")       
        toast.success("Event deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });      
    }
    const handleToastClose = () => {
      navigate("/organizerhome");
    };

  useEffect(() => {
    // if(val===0){
    // const blob = new Blob([Event.imagePoster]);
    //const urlObj = URL.createObjectURL(blob);
    //setImageSrc(urlObj)
    // val++;
    //return () => URL.revokeObjectURL(urlObj);
   
  });

  let url = "https://www.nwmissouri.edu/login/";
  return (
    <>
      <Navbar />
      <ToastContainer onClose={handleToastClose} />
      {(loggedUser.data.label.userRole != "USER"  && location.state.isOrganizer) ? (
                <div style={{paddingLeft:"1200px" , paddingTop:"3px"}}>
                <button className="btn btn-success" style={{ margin: "3px" }} onClick={()=>updateEvent(Event.data)}>
                  Update
                </button>
                <button className="btn btn-danger" style={{ margin: "3px" }} onClick={()=>deleteEvent(Event.data.eventId)}>
                  Delete
                </button>
                </div>
              ) : (
                <></>
              )}
      
      <div className="container card outer">
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12">
              {/* <img src={ImageSrc} alt="My Image" /> */}
              <img className="thumbNail" src={MeetingImg} alt="Meeting" />
            </div>
          </div>
          <div className="col-md-5 description">
            <h2>{Event.data.eventName}</h2>
            <h4>About Event:</h4>
            <p style={{ justifyContent: "centre" }}>{Event.data.eventDescription}</p>
          </div>
          <div
            className="card inner overflow-hidden h-50 shadow mt-2"
            style={{ width: "90%" }}
          >
            <div className="row">
              <div className="col-md-4 mt-3">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    verticalAlign: "Middle",
                  }}
                >
                  location_on
                </span>
                <span style={{ alignContent: "right" }}>
                  {Event.data.eventLocation}
                </span>
              </div>
              <div className="col-md-4 row" style={{ paddingLeft: "50px" }}>
                <div className="">
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                      verticalAlign: "Middle",
                    }}
                  >
                    calendar_month
                  </span>
                  <span>
                    &nbsp;{Event.data.eventStartDate} - {Event.data.eventEndDate}{" "}
                  </span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Event.data.eventStartTime} - {Event.data.eventEndTime}
                  </span>
                </div>
              </div>
              <div className="col-md-4" style={{ paddingLeft: "50px" }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    verticalAlign: "Middle",
                  }}
                >
                  how_to_reg
                </span>
                <span>
                  {Event.data.isRegistrationRequired === "Yes" ? (
                    <span>
                      &nbsp;&nbsp; Registration required. To register{" "}
                      <a target={"_blank"} href={Event.data.registrationUrl}>
                        Click here
                      </a>
                    </span>
                  ) : (
                    <span>&nbsp;&nbsp; No registration required.</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div
            className="col-md-12 description-org"
            style={{ paddingLeft: "32px" }}
          >
            <h4>
              Organized By:
              <span className="fw-bold">{Event.orgnaizationName}</span>
            </h4>

            <h4>About Organization:</h4>
            <p>{Event.organizationDescription}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

//export default EventDetail;
