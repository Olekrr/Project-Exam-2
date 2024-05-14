import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mt-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
