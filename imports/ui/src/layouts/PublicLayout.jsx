import React, { Children } from "react";

import Navbar from "../components/shared/Navbar/NavbarPublic";
import Footer from "../components/shared/Footer/FooterPublic";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>{children}</main>
      <Footer />
    </>
  );
}
