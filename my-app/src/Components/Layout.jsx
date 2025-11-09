import React from "react";
import { Outlet } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { CursorProvider } from "../Components/Cursor/Cusror";
import Navbar from "./NavBar/NavBar";

export default function Layout() {
  return (
    <>
      <CursorProvider>
        <Navbar />
        <main>
          <AnimatedOutlet />
        </main>
      </CursorProvider>
    </>
  );
}
