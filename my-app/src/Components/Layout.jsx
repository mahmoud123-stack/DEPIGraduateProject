import React from "react";
import AnimatedOutlet from "./AnimatedOutlet";
import { CursorProvider } from "../Components/Cursor/Cusror";
import Navbar from "./NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <CursorProvider>
        <Navbar />
        <main>
          <AnimatedOutlet />
        </main>
        <Footer />
      </CursorProvider>
    </>
  );
}
