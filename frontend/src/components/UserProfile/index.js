import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import * as eventActions from '../../store/events';
import GroupPreview from '../GroupPreview';
import EventsPreview from '../EventsPreview';
import './UserProfile.css'

function UserProfile({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const userGroups = useSelector((state) => state.session.groups);
  const userEvents = useSelector((state) => state.session.events);

  useEffect(() => {
    let isMounted = true;
    dispatch(eventActions.getEvents());
    dispatch(sessionActions.getUserGroups(sessionUser.id));
    dispatch(sessionActions.getUserEvents(sessionUser.id)).then(() => {
      if (isMounted) {
        setIsLoaded(true)
      }
    });
    return () => isMounted = false;
  }, [dispatch, sessionUser.id])

  return (
    <div className='profile-container'>
      {isLoaded && userGroups && (
        <>
          <div className="profile-header">{Object.entries(userEvents).length > 0 ? 'Your Upcoming Events' : 'Welcome to Levelup!'}</div>
          <div className="scroll-container">
            <EventsPreview events={userEvents} />
            <div className="event browse-all">
              <h2>Itching to get back into the game?</h2>
              <button
                className="generic-button"
                onClick={() => history.push('/events')}
              >
                Browse Other Upcoming Events
              </button>
            </div>
          </div>
          <div className="profile-header">{Object.entries(userGroups).length > 0 ? 'Your Groups' : "It's dangerous to go alone! Find your group."}</div>
          <div className="scroll-container">
            <GroupPreview size="small" groups={userGroups} />
            <div className="browse-all">
              <h2>Eager to find a new squad?</h2>
              <button
                className="generic-button"
                onClick={() => history.push('/groups')}
              >
                Browse Other Groups
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default UserProfile;
