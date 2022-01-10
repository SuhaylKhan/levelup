import gamingPic from "../../assets/gaming-together.jpg"
import "./Splash.css"

function Splash() {
  return (
    <div className="splash-body">
      <div className="text">
        <h1>Gaming is better with a buddy. Level up your gaming experience.</h1>
        <p>FPS, MOBA, CO-OP, whatever you're looking for, get out of the solo queue and Levelup.</p>
      </div>
      <div className="image">
        <img src={gamingPic} alt="Buddies gaming" height="300px" />
      </div>
    </div>
  );
}

export default Splash;
