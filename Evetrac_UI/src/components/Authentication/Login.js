import React, { useEffect, useState } from "react";
import LoginImg from "../Images/Logo_team.png";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import LogoHand from "../Images/WhiteLogoWithWelcome.PNG";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../../features/userReducer";

//import logo from '../Images/logo_EVE.PNG'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginPage = () => {
    // if (valid === "Yes")
    if (userRole === "USER") {
      navigate("/userhome");
      toast.success("response.data.message", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      navigate("/organizerhome");
      toast.success("response.data.message", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
  const [userName, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [userRole, setuserRole] = useState("");
  const onClickLogin = (e) => {
    e.preventDefault();
    const user = { userName, password, userRole };
    console.log(user);
    UserService.loginUser(user).then((response) => {
      console.log(response.data);
      if (response.data.status === "OK") {
        dispatch(loginAction(response.data.data));
        loginPage();
        // toast.success(response.data.message, {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose:3000
        // });
      } else if (response.data.status === "FORBIDDEN") {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        toast.error("Login Failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    });
  };
  const onChangeuserRole = (e) => setuserRole(e.target.value);
  const onChangeUserName = (e) => setUserName(e.target.value);
  const onChangePassword = (e) => setUserPassword(e.target.value);

  useEffect(() => {
    dispatch(logoutAction({}));
  });
  return (
    <div className="container m-5">
      <div className="card" style={{ height: "450px" }}>
        <div className="row">
          <ToastContainer />
          <div className="col-md-7">
            <img
              src={LoginImg}
              alt="LoginImg"
              style={{ height: "448px", width: "700px" }}
            />
          </div>
          <div className="col-md-5">
            <form
              style={{
                marginTop: "15px",
                marginRight: "60px",
                marginLeft: "70px",
              }}
            >
              <div className="form-outline mb-4">
                <img
                className="mb-2"
                  src={LogoHand}
                  alt="LogoImg"
                  style={{
                    "width":"95%" 
                  }}
                />
                <div
                  className="radio mb-4"
                  value={userRole}
                  onChange={onChangeuserRole}
                >
                  <input type="radio" value="USER" name="login" /> Login as user
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" value="ORGANIZER" name="login" /> Login as
                  organizer
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email address"
                  required
                  value={userName}
                  onChange={onChangeUserName}
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-3"
                style={{ marginLeft: "120px" }}
                onClick={onClickLogin}
              >
                Login
              </button>
              <div className="form-outline mb-4" style={{marginLeft:"70px"}}>
                {/* <span>
                  <a href="/forgot-password">Forgot Password?</a>&nbsp; &nbsp;
                  &nbsp;
                </span> */}
                <span>
                  &nbsp;Not a Member?<a href="/register">Register</a>
                </span>
              </div>
              <div className="form-outline mb-4"> </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
