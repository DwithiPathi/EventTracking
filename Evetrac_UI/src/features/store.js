import { createStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers"


function saveToLocalStorage(state) {
    try {       
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);      
    } catch (e) {
      console.warn(e);
    }
  }

function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }


// const store = configureStore({
//     reducer: {
//       user: userReducer,    
//     },
//   },  loadFromLocalStorage());


const store = createStore(rootReducers, loadFromLocalStorage());


store.subscribe(() =>{saveToLocalStorage(store.getState())});

export default store;

