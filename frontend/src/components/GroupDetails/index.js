import { useParams } from 'react-router-dom';

function GroupDetails() {
  const params = useParams();
  const { groupId } = params;

  return (
    <>
      <h1>GROUP DETAILS COMPONENT</h1>
    </>
  )
};

export default GroupDetails;
