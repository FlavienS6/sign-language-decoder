import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const LogoImage = styled.img`
  width: 200px; /* Adjust the width as needed */
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <div>
        <h1>About Our Project</h1>
        <p>
          This project aims to develop a sign language recognition system using machine learning and computer vision techniques.
        </p>
        <h2>Our Team</h2>
        <ul>
          <li>Param researched the problem, gathered the data sources, and built the data pipeline</li>
          <li>Eli trained and fine-tuned the detection model</li>
          <li>Flavien built the front-end so we could share our work with the world​. </li>
        </ul>
      </div>
      <LogoImage src="/sign_shakti_logo_transparent.png" alt="Project Logo" />
    </PageContainer>
  );
};

export default AboutPage;
