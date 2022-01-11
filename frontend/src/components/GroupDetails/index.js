import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GroupDetails() {
  const params = useParams();
  const { groupId } = params;
  const group = useSelector((state) => state.groups[groupId])
  const sessionUser = useSelector((state) => state.session.user)

  let createEvent;

  if (sessionUser.id === group.adminId) {
    createEvent = (
      <button>Create an Event</button>
    )
  }

  return (
    <>
      <div className='group-details'>
        <h1>{group.name}</h1>
        <p>{group.description}</p>
      </div>
      <div className='group-event'>
        <h2>Upcoming Events</h2>
        {createEvent}
      </div>
    </>
  )
};

export default GroupDetails;
