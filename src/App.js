import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import WebcamPage from './pages/WebcamPage';
import AboutPage from './pages/AboutPage';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 12px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NavContainer = styled.nav`
  background-color: #333;
  padding: 1px;
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <Router>
      <div>
        <NavContainer>
          <Routes>
            <Route
              path="/about"
              element={
                <Link to="/">
                  <StyledButton>Back to Demo</StyledButton>
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link to="/about">
                  <StyledButton>About this Project</StyledButton>
                </Link>
              }
            />
          </Routes>
        </NavContainer>

        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<WebcamPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;