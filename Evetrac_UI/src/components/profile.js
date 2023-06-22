import React, { useState,useEffect } from "react";
import "../Styling/Profile.css";
import img from "./Images/image.jpg";
import Navbar from "./NavBar/Nav";
import { useSelector } from "react-redux";
import UserService from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./NavBar/Footer";
const ProfilePage = () => {
  const loggedUser = useSelector((state) => state.user);
  const [FirstName] = useState(loggedUser.data.label.firstName);
  const [LastName] = useState(loggedUser.data.label.lastName);
  const [address,setAddress] = useState(loggedUser.data.label.address);
  const [newAddress, setNewAddress] = useState(loggedUser.data.label.address);
  const [organizationName,setOrganizationName] = useState(loggedUser.data.label.organizationName);
  const [newOrganizationName, setNewOrganizationName] = useState(
    loggedUser.data.label.organizationName
  );
  const [orgDescription,setOrganizationDescription] = useState(
    loggedUser.data.label.organizationDescription
  );
  const [newOrgDescription, setNewOrgDescription] = useState(
    loggedUser.data.label.organizationDescription
  );
  const [email] = useState(loggedUser.data.label.email);
  const userId = loggedUser.data.label.userId;
  var changedAddress='';
  useEffect(() => {
    UserService.userDetails(loggedUser.data.label.userId).then((response) => {
      setAddress(response.data.address);
      setOrganizationName(response.data.organizationName);
      setOrganizationDescription(response.data.organizationDescription);
      console.log("userfdgh", response);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.userDetails(loggedUser.data.label.userId).then((response) => {
      console.log("userfdgh", response);
    });
    if (loggedUser.data.label.userRole === "ORGANIZER") {
      console.log("hi")
      if (newOrganizationName === "" || newOrgDescription === "") {
        console.log("hi2")
        toast.error("Organization name or Description should not be empty", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return 0;
      }
      
    }
    const editings = {
      userId,
      newAddress,
      newOrganizationName,
      newOrgDescription,
    };

    console.log(editings, "edits");

    UserService.updateProfile(editings).then((response) => {
      if (response.status === 200) {
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    });
  };

  const onChangeAddress = (e) => setNewAddress(e.target.value);
  const onChangeOrgName = (e) => setNewOrganizationName(e.target.value);
  const onChangeOrgDesc = (e) => setNewOrgDescription(e.target.value);
  const [disableAddressEdit, setDisableAddressEdit] = useState(false);
  const [disableOrgNameEdit, setDisableOrgNameEdit] = useState(false);
  const [disableOrgDescEdit, setDisableOrgDescEdit] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="Container">
        <ToastContainer />
        <div className="card outCard row">
          <div className="col-sm-12 prfImg m-3 mb-5">
            <img src={img} alt="Profile" className="profileImage" />
          </div>
          <div className="prfForm">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-1 mb-5">
                  <label className="card-label">FirstName</label>
                </div>
                <div className="col-md-5 mb-5">
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="FirstName"
                    value={FirstName}
                  />
                </div>
                <div className="col-md-1 mb-5">
                  <label className="card-label">LastName</label>
                </div>
                <div className="col-md-5 mb-5">
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="LastName"
                    value={LastName}
                  />
                </div>
                <div className="col-md-1 mb-5">
                  <label className="card-label">Email</label>
                </div>
                <div className="col-md-5 mb-5">
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="Email"
                    value={email}
                  />
                </div>
                <div className="col-md-1 mb-5">
                  <label className="card-label">Address</label>
                </div>
                <div className="col-md-4 mb-5">
                  {disableAddressEdit ? (
                    <textarea
                      value={newAddress}
                      onChange={onChangeAddress}
                      className="form-control"
                    />
                  ) : (
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      readOnly
                      placeholder="Address"
                      value={address}
                    />
                  )}
                </div>
                <div className="col-md-1 mb-5">
                  <button
                    type="button"
                    className="btn bg-transparent"
                    onClick={() => setDisableAddressEdit(!disableAddressEdit)}
                  >
                    <span class="material-symbols-outlined">edit_square</span>
                  </button>
                </div>
                {loggedUser.data.label.userRole === "ORGANIZER" ? (
                  <>
                    <div className="col-md-3 mb-5">
                      <label className="card-label">Organization Name</label>
                    </div>
                    <div className="col-md-7 mb-5">
                      {disableOrgNameEdit ? (
                        <textarea
                          value={newOrganizationName}
                          onChange={onChangeOrgName}
                          className="form-control"
                        />
                      ) : (
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          readOnly
                          placeholder="Organization Name"
                          value={organizationName}
                        />
                      )}
                    </div>

                    <div className="col-md-2 mb-5">
                      <button
                        type="button"
                        className="btn bg-transparent"
                        onClick={() =>
                          setDisableOrgNameEdit(!disableOrgNameEdit)
                        }
                      >
                        <span class="material-symbols-outlined">
                          edit_square
                        </span>
                      </button>
                    </div>
                    <div className="col-md-3 mb-5">
                      <label className="card-label">
                        Organization Description
                      </label>
                    </div>
                    <div className="col-md-7 mb-5">
                      {disableOrgDescEdit ? (
                        <textarea
                          value={newOrgDescription}
                          onChange={onChangeOrgDesc}
                          className="form-control"
                        />
                      ) : (
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          readOnly
                          placeholder="Email"
                          value={orgDescription}
                        />
                      )}
                    </div>
                    <div className="col-md-1 mb-5">
                      <button
                        type="button"
                        className="btn bg-transparent"
                        onClick={() =>
                          setDisableOrgDescEdit(!disableOrgDescEdit)
                        }
                      >
                        <span class="material-symbols-outlined">
                          edit_square
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-3"
                disabled={
                  !disableAddressEdit &&
                  !disableOrgDescEdit &&
                  !disableOrgNameEdit
                }
                style={{ marginLeft: "450px" }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProfilePage;
