import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-symbols";
//import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "./features/store";

// const store = configureStore({
//     reducer: {
//       user: userReducer,
//     },
//   });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
