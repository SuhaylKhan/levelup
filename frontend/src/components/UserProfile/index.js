import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import GroupPreview from '../GroupPreview';
import './UserProfile.css'

function UserProfile({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const userGroups = useSelector((state) => state.session.groups);

  useEffect(() => {
    dispatch(
      sessionActions.getUserGroups(sessionUser.id)
      ).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <div className='profile-container'>
      {isLoaded && userGroups && (
        <>
          {Object.keys(userGroups).length > 0 ?
            (<>
              <h1>Your Groups</h1>
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
