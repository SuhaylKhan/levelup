import { useSelector } from "react-redux";
import SmallGroupPreview from "./SmallGroupPreview";
import MedGroupPreview from "./MedGroupPreview";
import './GroupPreview.css';

function GroupPreview({ size, groups }) {
  const allGroups = useSelector((state) => state.groups)
  const firstThreeArr = Object.entries(allGroups).slice(0,3);
  const firstThreeObj = firstThreeArr.reduce((a, b) => {
    return {
      ...a,
      [b[0]]: b[1]
    }
  }, {})
  console.log(firstThreeObj)

  return (
    <>
      {size === 'small' && (<SmallGroupPreview groups={groups || firstThreeObj} />)}
      {size === 'med' && (<MedGroupPreview groups={groups || firstThreeObj} />)}
    </>
  )
};

export default GroupPreview;
