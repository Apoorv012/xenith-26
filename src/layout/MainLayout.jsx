import { Outlet } from "react-router-dom";
import Hamburger from "../components/Hamburger/Hamburger";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Hamburger />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
