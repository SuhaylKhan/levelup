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
    dispatch(sessionActions.getUserGroups(sessionUser.id));
    dispatch(sessionActions.getUserEvents(sessionUser.id)).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <div className='profile-container'>
      {isLoaded && userGroups && (
        <>
          {Object.keys(userEvents).length > 0 ?
            (<>
              <div className="profile-header">Your Upcoming Events</div>
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
            </>)
            :
            (<>
              <div>no hello</div>
            </>)
          }
          {Object.keys(userGroups).length > 0 ?
            (<>
              <div className="profile-header">Your Groups</div>
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
            </>)
            :
            (<>
              <h1>Welcome to Levelup!</h1>
              <div>
                Find your squad
                <button
                  onClick={() => history.push('/groups')}
                >
                  Join a Group
                </button>
              </div>
            </>)
          }
        </>
      )}
    </div>
  )
};

export default UserProfile;
