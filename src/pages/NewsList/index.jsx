import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, toFormat } from "../../firebase/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../../assets/loader200.gif";

function NewsList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const firstRun = async () => {
    setLoading(true);
    const newsCol = collection(db, "news");
    const newsSnapshot = await getDocs(newsCol);
    const newsList = newsSnapshot.docs.map((doc) => doc.data());
    setData(
      newsList.sort(function (a, b) {
        return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    firstRun();
  }, []);
  return (
    <main>
      <div className="container" style={{ marginBottom: "50px" }}>
        <h2 className="slider__title" style={{ margin: "50px" }}>
          Yangiliklar
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
        <div className="grid-wrapper">
          {data &&
            data.map((item) => {
              const { id, loader, time, imgLink, title } = item;
              return (
                <Link to={`/news/${id}`} className="slider__item" key={id}>
                  <LazyLoadImage
                    className="slider__item__img"
                    loading="lazy"
                    width={320}
                    height={200}
                    placeholderSrc={loader}
                    src={imgLink}
                    alt="news"
                  />
                  <h5>{time}</h5>
                  <h4>{title}</h4>
                </Link>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default NewsList;
