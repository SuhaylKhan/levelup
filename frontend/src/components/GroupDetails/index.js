import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CreateEventForm from '../CreateEventForm';

function GroupDetails() {
  const params = useParams();
  const { groupId } = params;
  const group = useSelector((state) => state.groups[groupId])
  const sessionUser = useSelector((state) => state.session.user)

  const [showEventForm, setShowEventForm] = useState(false);

  let createEvent;

  if (sessionUser && group && sessionUser.id === group.adminId) {
    createEvent = (
      <button
        onClick={() => setShowEventForm(true)}
      >
        Create an Event
      </button>
    )
  }

  return (
    <>
      {group && (
        <>
          <div className='group-details'>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
          </div>
          <div className='group-event'>
            <h2>Upcoming Events</h2>
            {showEventForm ? <CreateEventForm props={{ setShowEventForm, group }} /> : createEvent}
          </div>
        </>
      )}
    </>
  )
};

export default GroupDetails;
