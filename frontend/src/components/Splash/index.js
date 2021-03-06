import { useSelector } from "react-redux";
import gamingPic from "../../assets/gaming-together.jpg";
import GroupsPreview from "../GroupPreview";
import "./Splash.css";

function Splash() {
  const allGroups = useSelector((state) => state.groups);
  const firstThreeArr = Object.entries(allGroups).slice(0,3);
  const firstThreeObj = firstThreeArr.reduce((a, b) => {
    return {
      ...a,
      [b[0]]: b[1]
    }
  }, {});

  return (
    <div className="splash-body">
      <div className="text">
        <h1>Gaming is better with a buddy. Level up your gaming experience.</h1>
        <p>FPS, MOBA, CO-OP, whatever you're looking for, get out of the solo queue and Levelup.</p>
      </div>
      <div className="image">
        <img src={gamingPic} alt="Buddies gaming" height="300px" />
      </div>
      <div className="preview-container">
        <GroupsPreview size="small" groups={firstThreeObj} />
      </div>
    </div>
  );
}

export default Splash;
