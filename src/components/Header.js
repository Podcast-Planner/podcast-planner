import { Link, useLocation } from "react-router-dom";
import { Plus, Playlist, Microphone } from "phosphor-react";

const Header = ({ headerRef }) => {
  const pathName = useLocation().pathname;

  return (
    <header ref={headerRef}>
      <h1>
        <Microphone className="icon" /> Podcast Planner
      </h1>
      <nav>
        <Link to={pathName === "/playlists" ? "/" : "/playlists"}>
          <button
            aria-label={
              pathName === "/playlists"
                ? "Create New Playlist"
                : "See My Playlists"
            }
          >
            {pathName === "/playlists" ? (
              <Plus size={24} className="icon" />
            ) : (
              <Playlist size={24} className="icon" />
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
