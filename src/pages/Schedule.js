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
`;

const EventContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  max-width: 680px;
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
    setEvents([
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
        'Test 3',
        'Activity',
        'Marston Breezeway',
        'Saturday',
        '06:00 AM',
        '07:30 AM'
      ),
      createEvent(
        'Test 4',
        'Activity',
        'Marston Breezeway',
        'Saturday',
        '06:00 PM',
        '07:30 PM'
      )
    ]);
  }, []);

  return (
    <RootContainer>
      <PageTitle title='Schedule' />
      {events !== null && (
        <ContentContainer>
          {/* Friday */}
          <React.Fragment>
            <DayText>Friday</DayText>
            {events.map(event => {
              if (event.day === 'Friday') {
                return (
                  <EventContainer key={event.name + event.start}>
                    <EventText>{event.name}</EventText>
                  </EventContainer>
                );
              }
            })}
          </React.Fragment>
          {/* Saturday */}
          <React.Fragment>
            <DayText>Saturday</DayText>
            {events.map(event => {
              if (event.day === 'Saturday') {
                return (
                  <EventContainer key={event.name + event.start}>
                    <EventText>{event.name}</EventText>
                  </EventContainer>
                );
              }
            })}
          </React.Fragment>
          {/* Sunday */}
          <React.Fragment>
            <DayText>Sunday</DayText>
            {events.map(event => {
              if (event.day === 'Sunday') {
                return (
                  <EventContainer key={event.name + event.start}>
                    <EventText>{event.name}</EventText>
                  </EventContainer>
                );
              }
            })}
          </React.Fragment>
        </ContentContainer>
      )}
    </RootContainer>
  );
};

const createEvent = (name, type, location, day, start, end) => ({
  name,
  type,
  location,
  day,
  start,
  end,
  startDate: interpolateDate(day, start)
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

const types = ['Logistics', 'Food', 'Activity'];
const startDate = new Date(2020, 0, 31);

export default Schedule;
