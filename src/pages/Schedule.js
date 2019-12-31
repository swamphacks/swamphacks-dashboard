import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';
import eventsSheet from '../scheduleSheet.json';

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, auto);
  column-gap: 10px;
  row-gap: 20px;
  justify-items: center;
  align-items: center;
`;

const EventContainer = styled.div`
  padding: 20px;
  background-color: #8daa90;
  opacity: ${props => (props.complete ? '0.5' : '1')}
  border-radius: 5px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const EventName = styled.div`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  font-size: 1.2rem;
`;

const EventType = styled.div`
  display: inline;
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 1.3rem;
`;

const EventTime = styled.div`
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 0.9rem;
`;

const EventLocation = styled.div`
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 1rem;
`;

const DayText = styled.h3`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const Schedule = () => {
  const [events, setEvents] = useState(null);
  const [filterType, setFilterType] = useState(null);
  useEffect(() => {
    setEvents(
      [
        ...eventsSheet.map(event =>
          createEvent(
            event.name,
            event.type,
            event.location,
            event.day,
            event.start,
            event.end
          )
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
              {events.map((event, index) => {
                if (event.day === 'Friday') {
                  return renderEvent(event, index);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Saturday */}
          <React.Fragment>
            <DayText>Saturday</DayText>
            <GridContainer>
              {events.map((event, index) => {
                if (event.day === 'Saturday') {
                  return renderEvent(event, index);
                }
              })}
            </GridContainer>
          </React.Fragment>
          {/* Sunday */}
          <React.Fragment>
            <DayText>Sunday</DayText>
            <GridContainer>
              {events.map((event, index) => {
                if (event.day === 'Sunday') {
                  return renderEvent(event, index);
                }
              })}
            </GridContainer>
          </React.Fragment>
        </ContentContainer>
      )}
    </RootContainer>
  );
};

const renderEvent = (event, index) => (
  <EventContainer key={event.name + index} complete={checkIfComplete(event)}>
    <EventName>
      {event.name}
      <EventType> - {event.type}</EventType>
    </EventName>
    <EventLocation>Location: {event.location}</EventLocation>
    <EventTime>Starts: {getHourMinute(event.startDate)}</EventTime>
    <EventTime>Ends: {getHourMinute(event.endDate)}</EventTime>
  </EventContainer>
);

const createEvent = (name, type, location, day, start, end) => ({
  name,
  type,
  location,
  day,
  startDate: interpolateDate(day, start),
  endDate: interpolateDate(day, end)
});

const interpolateDate = (day, time) => {
  let month = 1;
  let d = 31;
  if (day === 'Friday') month = 0;
  if (day === 'Saturday') d = 1;
  if (day === 'Sunday') d = 2;
  let [hour, minute] = time.split(':');
  hour = parseInt(hour);
  minute = parseInt(minute);
  return new Date(2020, month, d, hour, minute);
};

const getHourMinute = date => {
  let hour = date.getHours() + 1;
  let minutes = date.getMinutes();
  let amPM = 'AM';
  if (hour === 12) {
    amPM = 'PM';
  } else if (hour > 12) {
    amPM = 'PM';
    hour -= 12;
  }
  if (minutes === 0) minutes = '00';
  return `${hour}:${minutes} ${amPM}`;
};

const sortByDateHelper = (a, b) => {
  return a.startDate - b.startDate;
};

const checkIfComplete = a => {
  return a.endDate <= Date.now();
};

const types = ['Logistics', 'Food', 'Activity'];

export default Schedule;
