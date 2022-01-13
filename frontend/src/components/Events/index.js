import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events';
import './Events.css'

function Events() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const events = useSelector((state) => state.events);
  const groups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(eventActions.getEvents()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        <div className='events-container'>
          {Object.entries(events).map((ele, i) => {
            const event = ele[1]
            const eventDate = new Date(event.date)
            const eventTime = eventDate.toTimeString().split(':');
            const hour = parseInt(eventTime[0], 10)
            const group = groups[event.groupId];
            if (hour > 12) {
              const newTime = hour - 12;
              eventTime.splice(0, 1, newTime);
              eventTime.push('PM');
            } else if (hour === 12) {
              eventTime.push('PM');
            } else {
              eventTime.push('AM');
            }
            return (
              <div
                key={i}
                className='event-item'
                onClick={() => history.push(`/events/${event.id}`)}
              >
                <div className='event-name'>{event.name}</div>
                <div className='date-time'>{eventDate.toDateString()} @ {eventTime[0]}:{eventTime[1]} {eventTime[eventTime.length - 1]}</div>
                <div className='hosted-by'>{group.name}</div>
                <div className='event-description'>{event.description}</div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
};

export default Events;
