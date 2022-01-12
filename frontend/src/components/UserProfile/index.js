import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function UserProfile({ sessionUser }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(
      sessionActions.getUserGroups(sessionUser.id)
    ).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        <>
          USER PROFILE
        </>
      )}
    </>
  )
};

export default UserProfile;
