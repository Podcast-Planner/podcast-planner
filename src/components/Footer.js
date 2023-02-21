import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>
        Created at <a href="https://junocollege.com" aria-label="Juno College" target="_blank" rel="noreferrer">Juno College</a>
      </p>
      <Link to="/about">Meet the team!</Link>
    </footer>
  );
};

export default Footer;
