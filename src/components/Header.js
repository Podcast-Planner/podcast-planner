import { Link, useLocation } from "react-router-dom";
import { Plus, Playlist, Microphone } from "phosphor-react";

const Header = ({ headerRef }) => {
  const pathName = useLocation().pathname;

  return (
    <header ref={headerRef}>
      <div>
        <Microphone size={32} className="iconNav" color='#ffa62b' />
        <h1>Podcast Planner</h1>
      </div>
      <nav>
        <Link className="icon" to={pathName === "/playlists" ? "/" : "/playlists"}>
            {pathName === "/playlists" 
            ? <Plus size={40} className="iconNav" weight="fill" />
            : <Playlist size={40} className="iconNav" weight="fill" />
            }
        </Link>
      </nav>
    </header>
  );
};

export default Header;
