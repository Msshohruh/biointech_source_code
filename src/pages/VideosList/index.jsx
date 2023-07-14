import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../assets/loader200.gif";

function VideosList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const firstRun = async () => {
    setLoading(true);
    const videosCol = collection(db, "videos");
    const videosSnapshot = await getDocs(videosCol);
    const videosList = videosSnapshot.docs.map((doc) => doc.data());
    setData(videosList);
    setLoading(false);
  };
  useEffect(() => {
    firstRun();
  }, []);
  return (
    <main>
      <div className="container" style={{ marginBottom: "50px" }}>
        <h2 className="slider__title" style={{ margin: "50px" }}>
          Video Ma’lumotlar
        </h2>
        {loading && (
          <img
            src={loader}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        <div className="grid-wrapper videos">
          {data &&
            data.map((item) => {
              const { id, title, videoId } = item;
              return (
                <Link className="slider__item" to={`/videos/${id}`}>
                  <div className="slider__video">
                    <LazyLoadImage
                      className="slider__vider--img slider__item__img"
                      loading="lazy"
                      height={303}
                      placeholderSrc={loader}
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt="video"
                    />
                  </div>
                  <h4>{title}</h4>
                </Link>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default VideosList;
