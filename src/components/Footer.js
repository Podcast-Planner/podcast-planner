import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>
        Created at <a href="https://junocollege.com">Juno College</a>
      </p>
      <Link to="/about">Meet the team!</Link>
    </footer>
  );
};

export default Footer;
