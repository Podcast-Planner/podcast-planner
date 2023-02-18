import Playlist from "./Playlist";
import ScrollToTop from "./ScrollToTop";
import PageFade from "./PageFade";

const SavedLists = ({ savedPlaylists, newPlaylist, formValues, headerRef, setFormValues, }) => {
  return (
    <PageFade>
      <section className="savedLists">
        <h2>Your Saved Playlists</h2>
        <div className="playlists" draggable="false">
          {savedPlaylists
            .slice(0)
            .reverse()
            .map((obj) => {
              return (
                <ul key={obj.key} draggable="false">
                  <Playlist
                    playlistObject={obj.data.playlist}
                    formValues={obj.data.formValues}
                    setFormValues={setFormValues}
                    firebaseKey={obj.key}
                  />
                </ul>
              );
            })}
        </div>
        <ScrollToTop headerRef={headerRef} />
      </section>
    </PageFade>
  );
};

export default SavedLists;
