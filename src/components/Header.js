import { Link, useLocation } from "react-router-dom";
import { Plus, Playlist } from "phosphor-react";

const Header = () => {
  const pathName = useLocation().pathname;

  return (
    <header>
      <h1> Podcast Planner </h1>
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
              <Plus size={24} />
            ) : (
              <Playlist size={24} />
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
