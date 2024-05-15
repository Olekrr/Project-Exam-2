import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";  

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Welcome to Holidaze</h1>
              <p>Your one-stop destination for holiday bookings!</p>
            </>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
