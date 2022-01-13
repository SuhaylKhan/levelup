import { useSelector } from 'react-redux';
import MedGroupPreview from '../GroupPreview/MedGroupPreview';

function Groups() {
  const groups = useSelector((state) => state.groups);

  return (
    <div className='groups-container'>
      <MedGroupPreview groups={groups} />
    </div>
  )
}

export default Groups;
