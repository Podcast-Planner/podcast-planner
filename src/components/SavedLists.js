import Playlist from "./Playlist";

const SavedLists = ({ savedPlaylists, newPlaylist, formValues }) => {
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
    </section>
  );
};

export default SavedLists;
