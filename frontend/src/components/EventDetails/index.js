import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as eventActions from '../../store/events';

function EventDetails() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events[eventId]);
  const groups = useSelector((state) => state.groups);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!event) dispatch(eventActions.getEvents()).then(() => setIsLoaded(true));
    else setIsLoaded(true);
  }, [dispatch]);

  const formatDate = (event) => {
    const eventDate = new Date(event.date)
    const eventTime = eventDate.toTimeString().split(':');
    const hour = parseInt(eventTime[0], 10)
    if (hour > 12) {
      const newTime = hour - 12;
      eventTime.splice(0, 1, newTime);
      eventTime.push('PM');
    } else if (hour === 12) {
      eventTime.push('PM');
    } else {
      eventTime.push('AM');
    }
    return `${eventDate.toDateString()} @ ${eventTime[0]}:${eventTime[1]} ${eventTime[eventTime.length - 1]}`
  }

  return (
    <>
      {isLoaded && (
        <div className='event-details-container'>
          <div className='event-header'>
            <div className='event-header-details'>
              <div className='event-date-time'>
                {formatDate(event)}
              </div>
              <div>{event.name}</div>
              <div>Hosted by: <span>{event.User.username}</span></div>
            </div>
            <div>Edit</div>
          </div>
          <div className='event-body'>
            <div className='event-details-description'>
              <div>Details</div>
              <div>{event.description}</div>
            </div>
            <div className='sidebar'>
              <div>{groups[event.groupId].name}</div>
              <div>
                <div>{event.inPerson ? 'In Person Event' : 'Online Event'}</div>
                {event.Venue ?
                  <div>
                    <div>{event.Venue.name}</div>
                    <div>{event.Venue.city}, {event.Venue.state} {event.Venue.zipCode}</div>
                  </div>
                  : null}
                <div>{event.capacity} spots available</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default EventDetails;
