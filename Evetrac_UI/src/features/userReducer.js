export const userReducer = (state = {}, action) => {
  // Clone state object  
  const newState = Object.assign({}, state);
  // Look for type set in the actions file
  // these types should be as unique as possible
  switch (action.type) {    
    case "LOGIN":
      // Generate random key and populate with default object.
      // Payload is set in the actions file
      newState[
        "data"
      ] = {
        complete: false,
        label: action.payload
      };
      break;
      case "LOGOUT":     
      newState[
        "data"
      ] = {
        complete: false,
        label: action.payload
      };
      break;
    default:{
      break;
    }
  }
  // return the modified state
  return newState;
};

export default userReducer;

export const loginAction = payload => {
  return {
    type: "LOGIN",
    payload
  };
};

export const logoutAction = payload => {
  return {
    type: "LOGOUT",
    payload
  };
};



// import { createSlice } from "@reduxjs/toolkit";

// const initialStateValue = {};

// export const userSlice = createSlice({
//   name: "user",
//   initialState: { value: initialStateValue },
 
//     reducers: {
//    loginAction: (state, action) => {
//       state.value = action.payload;      
//     },
//     logoutAction: (state) => {
//       state.value = initialStateValue;
//     },
//   }
  
// });


// export const { loginAction, logoutAction } = userSlice.actions;

// export default userSlice.reducer;