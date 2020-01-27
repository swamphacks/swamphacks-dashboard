import React, { useEffect } from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import { PageRootContainer as RootContainer } from '../components/PageRootContainer';

// Maps
import ciseFirstFloor from '../maps/ciseFirstFloor.png';
import ciseSecondFloor from '../maps/ciseSecondFloor.png';
import marstonBasement from '../maps/marstonBasement.png';
import marstonSecondFloor from '../maps/marstonSecondFloor.png';

// Maps list
const maps = [
  {
    src: ciseFirstFloor,
    label: 'CISE First Floor'
  },
  {
    src: ciseSecondFloor,
    label: 'CISE Second Floor'
  },
  {
    src: marstonSecondFloor,
    label: 'Marston Second Floor (Entrance Level)'
  },
  {
    src: marstonBasement,
    label: 'Marston First Floor (Basement Level)'
  }
];

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  max-width: 680px;
`;

const LabelText = styled.h2`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  text-decoration: underline;
`;

const ContentLabel = styled.h4`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const ContentText = styled.div`
  font-family: Montserrat, Helvetica, sans-serif;
`;

const MapImage = styled.img`
  width: 100%;
`;

const Event = () => {
  return (
    <RootContainer>
      <PageTitle title='Event' />
      <ContentContainer>
        <Section>
          <LabelText>Maps</LabelText>
          {maps.map(mp => (
            <React.Fragment>
              <ContentLabel>{mp.label}</ContentLabel>
              <MapImage src={mp.src} />
            </React.Fragment>
          ))}
        </Section>
      </ContentContainer>
    </RootContainer>
  );
};

export default Event;
