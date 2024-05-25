import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        <p>&copy; {new Date().getFullYear()} Holidaze. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
