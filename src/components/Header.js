import { Link, useLocation } from "react-router-dom";
import { Plus, Playlist, Microphone } from "phosphor-react";

const Header = ({ headerRef }) => {
  const pathName = useLocation().pathname;

  return (
    <header ref={headerRef}>
      <h1>
        <Microphone size={32} className="iconNav" color='#ffa62b'/> Podcast Planner
      </h1>
      <nav>
        <Link to={pathName === "/playlists" ? "/" : "/playlists"}>
          <button className='icon'
            aria-label={
              pathName === "/playlists"
                ? "Create New Playlist"
                : "See My Playlists"
            }
          >
            {pathName === "/playlists" ? (
              <Plus size={40} className="iconNav" weight="fill" color='#ffa62b' style={{backgroundColor: '#001e31'}} />
            ) : (
                <Playlist size={40} className="iconNav" weight="fill" color='#ffa62b' style={{ backgroundColor: '#001e31' }} />
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
