import { CaretDoubleUp } from "phosphor-react";
import { useEffect, useState } from "react";

const ScrollToTop = ({ headerRef }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop >= 48) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  const handleScrollToTop = () => {
    headerRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button
      className="scrollButton"
      onClick={handleScrollToTop}
      style={visible ? { display: "inline" } : { display: "none" }}
    >
      <CaretDoubleUp size={34} />
    </button>
  );
};

export default ScrollToTop;
