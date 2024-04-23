import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React, { useEffect } from "react";

import { checkAuthStatus } from "../util/server-calls.js";

const initialState = {
  user: {
    username: "",
    isAuthenticated: null,
    isBeingVerified: "",
    id: "",
  },
  balance: null,
  transactions: [],
  categories: null,
  wishes: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "SET_TXS":
      return { ...state, transactions: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_WISHES":
      return { ...state, wishes: action.payload };
    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
