import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import Navbar from "./NavBar/Nav";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./NavBar/Footer";
const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setLocation] = useState("");
  const [eventDescription, setEventDesc] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  var [registrationUrl, setRegistrationUrl] = useState("");
  const [isRegistrationRequiredRadio, setIsRegistrationRequiredRadio] =
    useState(false);
  var isRegistrationRequired = null;
  const handleOptionChange = (event) => {
    setIsRegistrationRequiredRadio(event.target.value === "true");
    if (!(event.target.value === "true")) {
      setRegistrationUrl("");
    }
  };
  const [Poster, setImagePoster] = useState(null);
  const handleFileChange = (event) => {
    setImagePoster(event.target.files[0]);
  };

  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  const createdUserId = loggedUser.data.label.userId;
  const formData = new FormData();
  formData.append("file", Poster);
  const saveEvent = (e) => {
    e.preventDefault();
    if (isRegistrationRequiredRadio) {
      isRegistrationRequired = "Yes";
    } else {
      isRegistrationRequired = "No";
    }
    const event = {
      eventName,
      eventLocation,
      eventDescription,
      eventStartDate,
      eventEndDate,
      eventStartTime,
      eventEndTime,
      createdUserId,
      isRegistrationRequired,
      registrationUrl,
    };
    console.log(event);
    const json = JSON.stringify(event);
    //formData.append('myObject',"Harika");
    //formData.append('myObject', new Blob([json], { type: 'application/json' }));
    formData.append("myObject", JSON.stringify(event));
    EventService.createEvent(event, formData)
      .then((response) => {
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
      });
        console.log(response);
        // navigate("/userhome");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="event-manager">
      <ToastContainer />
        <div className="row" style={{ padding: "10px" ,marginBottom:"20px"}}>
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add Event</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Event Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Eventname"
                    name="eventName"
                    className="form-control"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    name="location"
                    className="form-control"
                    value={eventLocation}
                    onChange={(e) => setLocation(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Event Description:</label>
                  <textarea
                    placeholder="Enter Event Description"
                    name="eventDesc"
                    className="form-control"
                    value={eventDescription}
                    onChange={(e) => setEventDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group mb-2 row">
                  <div className="col-md-6">
                    <label className="form-label">Date(From):</label>
                    <input
                      type="date"
                      placeholder="Enter Date"
                      name="eventStartDate"
                      className="form-control"
                      value={eventStartDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setEventStartDate(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date(To):</label>
                    <input
                      type="date"
                      placeholder="Enter Date"
                      name="eventEndDate"
                      className="form-control"
                      value={eventEndDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setEventEndDate(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group mb-3 row">
                  <div className="col-md-6">
                    <label className="form-label">Time(From):</label>
                    <input
                      type="time"
                      placeholder="Enter Date"
                      name="eventStartTime"
                      className="form-control"
                      value={eventStartTime}
                      onChange={(e) => setEventStartTime(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time(To):</label>
                    <input
                      type="time"
                      placeholder="Enter Date"
                      name="eventEndTime"
                      className="form-control"
                      value={eventEndTime}
                      onChange={(e) => setEventEndTime(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div>
                    <span>Is registration required?&nbsp;&nbsp;</span>
                    <label>
                      <input
                        type="radio"
                        value="true"
                        checked={isRegistrationRequiredRadio === true}
                        onChange={handleOptionChange}
                      />
                      Yes&nbsp;
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="false"
                        checked={isRegistrationRequiredRadio === false}
                        onChange={handleOptionChange}
                      />
                      No
                    </label>
                  </div>
                </div>
                {isRegistrationRequiredRadio ? (
                  <div className="form-group mb-3">
                    <label className="form-label">Registration URL:</label>
                    <input
                      type="text"
                      placeholder="Enter URL"
                      name="eventName"
                      className="form-control"
                      value={registrationUrl}
                      onChange={(e) => setRegistrationUrl(e.target.value)}
                    ></input>
                  </div>
                ) : (
                  <></>
                )}

                <div className="form-group mb-3">
                  <label>Upload Event Poster or Related Image:&nbsp;</label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                  />
                </div>

                <div style={{ paddingLeft: "205px" }}>
                  <button
                    className="btn btn-success"
                    style={{ margin: "3px" }}
                    onClick={(e) => saveEvent(e)}
                  >
                    Submit
                  </button>
                  <Link to="/events" className="btn btn-danger">
                    {" "}
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddEvent;
