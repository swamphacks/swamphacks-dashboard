import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  column-gap: 10px;
  row-gap: 20px;
  justify-items: center;
  align-items: stretch;
`;

const Chip = styled.div`
  padding: 5px;
  font-family: ${props =>
    props.bold
      ? 'Montserrat-Bold, Helvetica, sans-serif'
      : 'Montserrat, Helvetica, sans-serif'};
  background-color: ${props => (props.bold ? 'transparent' : '#8daa90')};
  opacity: ${props => (props.complete ? '0.5' : '1')}
  border-radius: 5px;
  font-size: 0.9rem;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayText = styled.h3`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const EventText = styled.p`
  font-family: Montserrat, Helvetica, sans-serif;
`;

const Schedule = () => {
  const [events, setEvents] = useState(null);
  const [filterType, setFilterType] = useState(null);
  useEffect(() => {
    setEvents(
      [
        createEvent(
          'Test 1',
          'Logistics',
          'Marston Breezeway',
          'Friday',
          '05:30 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 2',
          'Food',
          'Marston Breezeway',
          'Friday',
          '06:00 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 4',
          'Activity',
          'Marston Breezeway',
          'Saturday',
          '06:00 PM',
          '07:30 PM'
        ),
        createEvent(
          'Test 3',
          'Activity',
          'Marston Breezeway',
          'Saturday',
          '06:00 AM',
          '07:30 AM'
        )
      ].sort(sortByDateHelper)
    );
  }, []);

  return (
    <RootContainer>
      <PageTitle title='Schedule' />
      {events !== null && (
        <ContentContainer>
          {/* Friday */}
          <React.Fragment>
            <DayText>Friday</DayText>

            <GridContainer>
              {renderKey()}
              {events.map(event => {
                if (event.day === 'Friday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Saturday */}
          <React.Fragment>
            <DayText>Saturday</DayText>
            <GridContainer>
              {events.map(event => {
                if (event.day === 'Saturday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Sunday */}
          <React.Fragment>
            <DayText>Sunday</DayText>
            <GridContainer>
              {events.map(event => {
                if (event.day === 'Sunday') {
                  return renderEvent(event);
                }
              })}
            </GridContainer>
          </React.Fragment>
        </ContentContainer>
      )}
    </RootContainer>
  );
};

const renderKey = () => (
  <React.Fragment>
    <Chip bold>Name</Chip>
    <Chip bold>Type</Chip>
    <Chip bold>Location</Chip>
    <Chip bold>Start</Chip>
    <Chip bold>End</Chip>
  </React.Fragment>
);

const renderEvent = event => (
  <React.Fragment key={event.name + event.start}>
    <Chip complete={checkIfComplete(event)}>{event.name}</Chip>
    <Chip complete={checkIfComplete(event)}>{event.type}</Chip>
    <Chip complete={checkIfComplete(event)}>{event.location}</Chip>
    <Chip complete={checkIfComplete(event)}>{event.start}</Chip>
    <Chip complete={checkIfComplete(event)}>{event.end}</Chip>
  </React.Fragment>
);

const createEvent = (name, type, location, day, start, end) => ({
  name,
  type,
  location,
  day,
  start,
  end,
  startDate: interpolateDate(day, start),
  endDate: interpolateDate(day, end)
});

const interpolateDate = (day, time) => {
  let month = 1;
  let d = 31;
  if (day === 'Friday') month = 0;
  if (day === 'Saturday') d = 1;
  if (day === 'Sunday') d = 2;
  let amPM = time.slice(time.length - 2);
  let hour = parseInt(time.slice(0, time.length - 6));
  let minute = parseInt(time.slice(3, time.length - 3));
  if (amPM === 'PM') hour += 12;
  if (hour > 24) hour -= 24;
  return new Date(2020, month, d, hour, minute);
};

const sortByDateHelper = (a, b) => {
  return a.startDate - b.startDate;
};

const checkIfComplete = a => {
  return a.endDate <= Date.now();
};

const types = ['Logistics', 'Food', 'Activity'];
const startDate = new Date(2020, 0, 31);

export default Schedule;
