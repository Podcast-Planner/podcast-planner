import Playlist from "./Playlist";
import ScrollToTop from "./ScrollToTop";
import PageFade from "./PageFade";

const SavedLists = ({ savedPlaylists, headerRef, setFormValues }) => {
  return (
    <PageFade>
      
      <section className="savedLists">
        {savedPlaylists[0] ? <h2>Your Saved Playlists</h2> : <h2>No Saved Playlists Found</h2>}
        <div className="playlists" draggable="false">
          {savedPlaylists
            .slice(0)
            .reverse()
            .filter(obj => obj.data && obj.data.playlist)
            .map(obj => {
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
