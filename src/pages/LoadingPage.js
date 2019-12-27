import React from 'react';
import styled from 'styled-components';

const RootContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const LoadingPage = () => {
  return (
    <RootContainer>
      <p>Loading...</p>
    </RootContainer>
  );
};

export default LoadingPage;
