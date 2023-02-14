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
              <ul key={obj.key}>
                <Playlist playlistObject={obj.data.playlist} formValues={obj.data.formValues} />
              </ul>
            );
          })}
      </div>
      <ScrollToTop headerRef={headerRef} />
    </section>
  );
};

export default SavedLists;
