import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import CloudTabs from "../components/CloudTabs";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CloudTabs />
      {children}
      <Outlet />
    </>
  );
}
