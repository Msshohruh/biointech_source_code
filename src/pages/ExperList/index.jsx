import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../assets/loader200.gif";

function ExperList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const firstRun = async () => {
    setLoading(true);
    const experCol = collection(db, "exper");
    const experSnapshot = await getDocs(experCol);
    const experList = experSnapshot.docs.map((doc) => doc.data());
    setData(experList);
    setLoading(false);
  };
  useEffect(() => {
    firstRun();
  }, []);
  return (
    <main>
      <div className="container" style={{ marginBottom: "50px" }}>
        <h2 className="slider__title" style={{ margin: "50px" }}>
          Xalqaro va mahalliy tajribalar
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
                <Link
                  className="slider__item"
                  to={`/experiments/${id}`}
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
        </div>
      </div>
    </main>
  );
}

export default ExperList;
