import SmallGroupPreview from "./SmallGroupPreview";
import MedGroupPreview from "./MedGroupPreview";
import './GroupPreview.css';

function GroupPreview({ size, groups }) {
  return (
    <>
      {size === 'small' && (<SmallGroupPreview groups={groups} />)}
      {size === 'med' && (<MedGroupPreview groups={groups} />)}
    </>
  )
};

export default GroupPreview;
