import { useHistory } from 'react-router-dom';

function MedGroupPreview({ groups }) {
  const history = useHistory();

  return (
    <>
      {Object.entries(groups).map((ele, i) => {
        const group = ele[1];
        return (
          <div
            key={i}
            className='med-container'
            onClick={() => history.push(`/groups/${group.id}`)}
          >
            <h2 className='med-group-name'>{group.name}</h2>
            <p className='med-group-description'>{group.description}</p>
          </div>
        )
      })}
    </>
  )
};

export default MedGroupPreview;
