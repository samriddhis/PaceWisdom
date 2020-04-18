import React, { Component } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import RouterComponent from "./RouterComponent";

const initialState = {
  loginDetails: {},
  formDetails: [],
};

const storeValue = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_STATUS":
      return {
        ...state,
        loginDetails: action.payload,
      };

    case "FORM_DETAILS":
      return {
        ...state,
        formDetails: [...state.formDetails, action.payload],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        formDetails: state.formDetails.filter(
          (item) => item.email !== action.payload.item.email
        ),
      };

    default:
      return state;
  }
};

const reducer = combineReducers({
  storeValue: storeValue,
});

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
