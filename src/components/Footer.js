import { Info } from "phosphor-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <p>
        Created at <a href="https://junocollege.com">Juno College</a>
      </p>
      <div className="link">
        <Link to="/about">
        <button className="icon"><Info size={40} weight="fill" style={{ backgroundColor: '#001e31' }} /></button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
