import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

import PageTitle from '../components/PageTitle';
import { PageRootContainer as RootContainer } from '../components/PageRootContainer';
import { withFirebase } from '../components/Firebase';
import Select from '../components/Select';

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

const Schedule = ({ firebase }) => {
  const [events, setEvents] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const unsubscriber = firebase.getSchedule(l => {
      setEvents(l);
      setFilteredEvents(l);
      // Get all event types
      let t = [];
      l.forEach(e => {
        if (t.indexOf(e.type) === -1) {
          t.push(e.type);
        }
      });
      setTypes(t);
    });
    return unsubscriber;
  }, []);

  return (
    <RootContainer>
      <PageTitle title='Schedule' />
      <div style={{ display: 'flex', width: '100%' }}>
        <Select
          title='Filter by Type:'
          options={types.map(t => ({ value: t, label: t }))}
          style={{ marginBottom: 40 }}
          onChange={filterType => {
            let fe = [];
            events.forEach(e => {
              if (!filterType) {
                fe.push(e);
              } else if (e.type === filterType) {
                fe.push(e);
              }
            });
            setFilteredEvents(fe);
          }}
        />
      </div>
      {events.length === 0 && (
        <Dimmer active>
          <Loader>Fetching schedule</Loader>
        </Dimmer>
      )}
      {events.length > 0 && (
        <ContentContainer>
          {/* Friday */}
          <React.Fragment>
            <DayText>Friday</DayText>

            <GridContainer>
              {filteredEvents.map((event, index) => {
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
              {filteredEvents.map((event, index) => {
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
              {filteredEvents.map((event, index) => {
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
    <EventTime>Starts: {getHourMinute(event.start)}</EventTime>
    <EventTime>Ends: {getHourMinute(event.end)}</EventTime>
  </EventContainer>
);

const getHourMinute = timestamp => {
  const date = timestamp.toDate();
  if (date) {
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
  } else {
    return `Time invalid.`;
  }
};

const checkIfComplete = a => {
  return a.endDate <= Date.now();
};

export default withFirebase(Schedule);
