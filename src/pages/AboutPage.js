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
          <li>John Doe - Lead Developer</li>
          <li>Jane Smith - Machine Learning Engineer</li>
          <li>Michael Johnson - UI/UX Designer</li>
        </ul>
      </div>
    </PageContainer>
  );
};

export default AboutPage;