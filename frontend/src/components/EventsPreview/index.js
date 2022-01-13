import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EventsPreview.css';

function EventsPreview({ events }) {
  const history = useHistory();
  const groups = useSelector((state) => state.groups);

  const randomClass = [
    'right-top', 'right', 'right-bottom', 'bottom',
    'left-bottom', 'left', 'left-top', 'top',
    'circle'
  ];

  return (
    <>
      {Object.entries(events).map((ele, i) => {
        const event = ele[1]
        const eventDate = new Date(event.date)
        const eventTime = eventDate.toTimeString().split(':');
        const hour = parseInt(eventTime[0], 10)
        const group = groups[event.groupId];
        const randomNum = Math.floor(Math.random() * 9)
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
            className={`event-preview ${randomClass[randomNum]}`}
            onClick={() => history.push(`/events/${event.id}`)}
          >
            <div className='preview-event-details'>
              <div className='preview-date-time'>{eventDate.toDateString()} @ {eventTime[0]}:{eventTime[1]} {eventTime[eventTime.length - 1]}</div>
              <div className='preview-event-name'>{event.name}</div>
              <div className='preview-hosted-by'>{group.name}</div>
            </div>
              <div className='preview-event-description'>{event.description}</div>
          </div>
        )
      })}
    </>
  )
};

export default EventsPreview;
