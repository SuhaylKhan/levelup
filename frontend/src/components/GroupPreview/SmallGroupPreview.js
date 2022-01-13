import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SmallGroupPreview({ groups }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const randomClass = [
    'right-top', 'right', 'right-bottom', 'bottom',
    'left-bottom', 'left', 'left-top', 'top',
    'circle'
  ];

  return (
    <>
      {Object.entries(groups).map((ele, i) => {
        const group = ele[1];
        const randomNum = Math.floor(Math.random() * 9)
        return (
          <div
            key={i}
            className={
              sessionUser ?
                `small-container to-${randomClass[randomNum]} active` :
                `small-container to-${randomClass[randomNum]}`
            }
            onClick={sessionUser ? () => history.push(`/groups/${group.id}`) : null}
          >
            <h2 className='group-name'>{group.name}</h2>
            <p className='group-description'>{group.description}</p>
          </div>
        )
      })}
    </>
  )
};

export default SmallGroupPreview;
