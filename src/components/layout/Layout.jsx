import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./layout.scss";

/**
 * Layout component for the Holidaze application.
 * This component wraps the application with a header and footer.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @example
 * return (
 *   <Layout>
 *     <p>Your content here</p>
 *   </Layout>
 * )
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
