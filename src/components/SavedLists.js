import Playlist from "./Playlist";
import ScrollToTop from "./ScrollToTop";

const SavedLists = ({ savedPlaylists, newPlaylist, formValues, headerRef }) => {
  return (
    <section className="savedLists">
      <h2>Your Saved Playlists</h2>
      <div className="playlists">
        {savedPlaylists
          .slice(0)
          .reverse()
          .map((obj) => {
            return (
              <Playlist playlistObject={obj.playlist} formValues={formValues} />
            );
          })}
      </div>
      <ScrollToTop headerRef={headerRef} />
    </section>
  );
};

export default SavedLists;
