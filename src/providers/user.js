import React from "react";
import UserContext from "../context/user";

function UserProvider({ user, children }) {
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
