import React, { useReducer, createContext } from "react";

export const GlobalStateProvider = createContext();
export const GlobalDispatchProvider = createContext();

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...action.payload, justSignedUp: true };
    case "CONNECT":
      return {
        ...action.payload,
      };
    case "DISCONNECT":
      return false;
    default:
      return state;
  }
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateProvider.Provider value={state}>
      <GlobalDispatchProvider.Provider value={dispatch}>
        {children}
      </GlobalDispatchProvider.Provider>
    </GlobalStateProvider.Provider>
  );
}
