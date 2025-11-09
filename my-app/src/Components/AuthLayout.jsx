import React from "react";
import { Outlet } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { CursorProvider } from "../Components/Cursor/Cusror";

export default function AuthLayout() {
  return (
    <CursorProvider>
      <AnimatedOutlet />
    </CursorProvider>
  );
}
