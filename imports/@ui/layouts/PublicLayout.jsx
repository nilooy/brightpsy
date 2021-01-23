import React, { Children } from "react";

import Navbar from "@ui/components/Basic/Navbar/NavbarPublic";
import Footer from "@ui/components/Basic/Footer/FooterPublic";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar transparent />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
