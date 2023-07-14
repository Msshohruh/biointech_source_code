import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsArrowLeftCircle } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "../../components/Slider";
import loader from "../../assets/loader200.gif";

function VideoPage() {
  const { videoId } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [activeItem, setItem] = useState(null);

  const firstRun = async () => {
    setLoading(true);

    const videosCol = collection(db, "videos");
    const videosSnapshot = await getDocs(videosCol);
    const videosList = videosSnapshot.docs.map((doc) => doc.data());

    const item = videosList.filter((el) => {
      return el.id === videoId;
    });

    const itemList = videosList.filter((el) => el.id !== videoId);
    setData(itemList);
    setItem(item[0]);
    setLoading(false);
  };

  useEffect(() => {
    firstRun();
  }, [videoId]);
  return (
    <main>
      <div className="container news-page-container">
        <Link to="/" className="back-btn">
          <BsArrowLeftCircle />
          Back
        </Link>
        {loading && (
          <div>
            <img src={loader} style={{ display: "block", margin: "0 auto" }} />
          </div>
        )}
        {activeItem && (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${activeItem.videoId}`}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h2>{activeItem.title}</h2>
            <p>&nbsp; &nbsp; &nbsp; {activeItem.text}</p>

            <Slider title={"Video ma’lumotlar"} loading={data}>
              {data &&
                data.map((item) => {
                  const { id, title, videoId } = item;
                  return (
                    <Link
                      onClick="scroll(0,0);"
                      className="slider__item"
                      to={`/videos/${id}`}
                      key={id}
                    >
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
            </Slider>
          </>
        )}
      </div>
    </main>
  );
}

export default VideoPage;
