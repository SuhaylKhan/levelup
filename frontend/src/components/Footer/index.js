import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <ul className="techs">
        <li>CSS</li>
        <li>Express</li>
        <li>Git</li>
        <li>JavaScript</li>
        <li>PostgreSQL</li>
        <li>React</li>
        <li>Redux</li>
      </ul>
      <div className="copyright">
        Suhayl Khan © 2022 <span>Levelup</span>
        <div className="links">
          <Link
            to={{ pathname: "https://github.com/SuhaylKhan" }}
            target="_blank"
          >
            <i className="fab fa-github"></i>
          </Link>
          <Link
            to={{
              pathname: "https://www.linkedin.com/in/suhayl-khan-48601a193/",
            }}
            target="_blank"
          >
            <i className="fab fa-linkedin-in"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
