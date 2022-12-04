import React from "react";
import styled from "styled-components";

import DenseAppBar from "./AppBar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

export default function Layout() {
  return (
    <>
      <DenseAppBar />
      <Outlet />
      <ToastContainer />
    </>
  );
}
