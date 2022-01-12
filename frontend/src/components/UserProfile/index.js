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
              <GroupPreview size="small" groups={userGroups} />
              {Object.entries(userGroups).map(ele => {
                const group = ele[1];
                return (
                  <Link key={group.id} to={`/groups/${group.id}`}>
                    <h2>{group.name}</h2>
                    <p>{group.description}</p>
                  </Link>
                )
              })}
              <div>
                Eager for another gaming sesh?
                <button
                  onClick={() => history.push('/groups')}
                >
                  Browse All Groups
                </button>
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
