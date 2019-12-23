import React, {useEffect} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';

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

const ContentText = styled.p`
  font-family: Montserrat, Helvetica, sans-serif;
`;

const LinkText = styled.div`
  display: inline;
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  color: white;
  :hover {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Travel = () => {
  return (
    <RootContainer>
      <PageTitle title='Travel Information' />
      <ContentContainer>
        <Section>
          <LabelText>Bus</LabelText>
          <ContentLabel>Will there be any buses?</ContentLabel>
          <ContentText>
            Yes! We’ll be sending one bus to and from GeorgiaTech for hackers
            traveling from the Atlanta area. There will be more information
            about this trip when we get closer to the event, so be on the
            lookout for an email!
          </ContentText>
        </Section>
        <Section>
          <LabelText>Carpooling</LabelText>
          <ContentLabel>How do I find someone to carpool with?</ContentLabel>
          <ContentText>
            You can use our #carpooling channel on our Slack to find someone
            driving in your area! We have people driving from FIU, UCF, USF, and
            more. Additionally you can interact on any of our social media
            platforms to meet fellow hackers traveling to the Swamp. If you need
            additional help finding someone who can drive you, email us at{' '}
            <LinkText
              onClick={() => {
                window.location.href = 'mailto:info@swamphacks.com';
              }}
            >
              info@swamphacks.com
            </LinkText>
            !
          </ContentText>
          <ContentLabel>
            How and when will I receive a reimbursement?
          </ContentLabel>
          <ContentText>
            Come see us at the help desk on Sunday and once we confirm you’re at
            the event, you will receive a reimbursement two to three weeks after
            the event ends on February 2nd. It will arrive at the address you
            listed on the application in the form of a check from the University
            of Florida.
          </ContentText>
          <ContentLabel>For how much will I be reimbursed?</ContentLabel>
          <ContentText>
            We’ll be sending out an email with this and more information when we
            get closer to the event. So be on the lookout for an email from us
            in January!
          </ContentText>
        </Section>
        <Section>
          <LabelText>Parking and Directions</LabelText>
          <ContentLabel>Where is SwampHacks VI?</ContentLabel>
          <ContentText>
            SwampHacks VI is held at the University of Florida Marston Science
            Library. The official address is: 444 Newell Dr, Gainesville, FL
            32611. Check back closer to the event to see a detailed map with
            walking directions from the Commuter Lot to Marston Science Library.
          </ContentText>
          <ContentLabel>Where do we park?</ContentLabel>
          <ContentText>
            You can park in the Commuter lot (Commuter Lot 2016 Gale Lemrand Dr
            Gainesville, FL 32603) or in Garage 4.
          </ContentText>
          <ContentLabel>When is parking lifted?</ContentLabel>
          <ContentText>
            Parking will be lifted after 4:30 PM at the University of Florida on
            January 31st. Parking will remain lifted until February 3rd 7:30 AM.
          </ContentText>
        </Section>
        <Section>
          <LabelText>Have more questions?</LabelText>
          <ContentText>
            Email us at{' '}
            <LinkText
              onClick={() => {
                window.location.href = 'mailto:info@swamphacks.com';
              }}
            >
              info@swamphacks.com
            </LinkText>
            !
          </ContentText>
        </Section>
      </ContentContainer>
    </RootContainer>
  );
};

export default Travel;
