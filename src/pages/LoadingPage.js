import React from 'react';
import styled from 'styled-components';

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const LoadingPage = () => {
  return (
    <RootContainer>
      <p>Loading...</p>
    </RootContainer>
  );
};

export default LoadingPage;
