import React, { Children } from "react";

import Navbar from "../components/shared/Navbar/NavbarPublic";
import Footer from "../components/shared/Footer/FooterPublic";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar transparent />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
