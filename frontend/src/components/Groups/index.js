import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Groups() {
  const groups = useSelector((state) => state.groups);

  return (
    <>
      {Object.entries(groups).map((ele) => {
        const group = ele[1]
        return (
          <Link key={group.id} to={`/groups/${group.id}`}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </Link>
        )
      })}
    </>
  )
}

export default Groups;
