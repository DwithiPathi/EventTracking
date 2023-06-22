import React, { useState } from "react";
import UserService from "../../services/UserService";

//import logo from '../Images/logo_EVE.PNG'
const ForgotPassword = () => {
  let url = "https://www.nwmissouri.edu/login/";
  const [userEmail, setuserEmail] = useState("");
  const onClickVerify = (e) => {
    e.preventDefault();
    console.log(userEmail);
  };
  const onChangeuserEmail = (e) => setuserEmail(e.target.value);
  return (
    <div className="container m-5">
      <h3 style={{ textAlign: "center" }}>Forgot Password</h3>
      <div className="card">
        <input
          type="text"
          style={{ width: "50%", alignSelf: "center" }}
          className="form-control m-4"
          placeholder="Enter email address"
          required
          value={userEmail}
          onChange={onChangeuserEmail}
        />
        <button
          className="btn btn-primary btn-block mb-3"
          style={{ width: "20%", alignSelf: "center" }}
          onClick={onClickVerify}
        >
          Send Verification Email
        </button>
        <div className="form-outline mb-4" style={{ alignSelf: "center" }}>
          <span>
            Want to login?&nbsp;<a href="/">Sign in</a>&nbsp; &nbsp; &nbsp;
          </span>
          <span>
            &nbsp;Not a Member?&nbsp;<a href="/register">Register</a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
