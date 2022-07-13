import React, { useState, useMemo } from "react";
import AdminContext from "../context/admin";

function AdminProvider({ children }) {
  const [admin, toggleAdmin] = useState(false);

  const value = useMemo(
    () => ({
      admin,
      toggleAdmin,
    }),
    [admin]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export default AdminProvider;
