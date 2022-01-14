import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events';
import EditEventForm from '../EditEventForm';
import './EventDetails.css'

function EventDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.events[eventId]);
  const groups = useSelector((state) => state.groups);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(eventActions.getEvents()).then(() => setIsLoaded(true));
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

  const randomClass = [
    'right-top', 'right', 'right-bottom', 'bottom',
    'left-bottom', 'left', 'left-top', 'top',
    'circle'
  ];
  const randomNum = Math.floor(Math.random() * 9)

  return (
    <>
      {isLoaded && (
        <div className='event-details-container'>
          <div className='event-header'>
            <div className='event-header-details'>
              <div className='event-date-time'>
                {formatDate(event)}
              </div>
              <div className='event-details-name'>
                {event.name}
              </div>
              <div className='hosted-by'>Hosted by: <span>{event.User.username}</span></div>
            </div>
            <div className='edit-buttons'>
              <div
                className='nav-auth-link button edit'
                onClick={() => history.push(`/events/${eventId}/edit`)}
              >
                Edit Event
              </div>
            </div>
          </div>
          <div className='event-body'>
            <div className='event-details-description'>
              <div className='event-details-description-header'>Details</div>
              <div>
                {event.description}
              </div>
            </div>
            <div className='sidebar'>
              <div
                className={`small-container to-${randomClass[randomNum]} active`}
                onClick={() => history.push(`/groups/${event.groupId}`)}
              >
                {groups[event.groupId].name}
              </div>
              <div className='sidebar-details browse-all'>
                <div>
                  <div className='in-person hosted-by'>
                    {event.inPerson ? 'In Person Event' : 'Online Event'}
                  </div>
                  {event.inPerson && event.venueId ?
                    <div className='venue'>
                      <div className='venue-name'>{event.Venue.name}</div>
                      <div className='venue-location'>{event.Venue.city}, {event.Venue.state} {event.Venue.zipCode}</div>
                    </div>
                    : null}
                </div>
                <div className='capacity'>
                  {event.capacity} spots available
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default EventDetails;
