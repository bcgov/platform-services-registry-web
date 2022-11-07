import React, { useContext } from "react";
import DenseAppBar from "./AppBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <DenseAppBar />
      <Outlet />
    </>
  );
}
