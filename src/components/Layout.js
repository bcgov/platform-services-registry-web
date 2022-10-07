import React, { useContext } from "react";
import DenseAppBar from "./AppBar";
import { Outlet } from "react-router-dom";
import UserContext from "../context/user";
import LoadingSpinner from "./common/LoadingSpinner";

export default function Layout() {
  const user = useContext(UserContext);
  return (
    <>
      <DenseAppBar />
      {user ? <Outlet /> : <LoadingSpinner />}
    </>
  );
}
