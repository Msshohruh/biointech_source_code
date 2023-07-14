import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { BsArrowLeftCircle } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { db } from "../../firebase/config";
import Slider from "../../components/Slider";
import loader from "../../assets/loader200.gif";
import "./style.css";
function NewsPage() {
  const { newsId } = useParams();

  const months = {
    "01": "Yan",
    "02": "Fev",
    "03": "Mart",
    "04": "Apr",
    "05": "May",
    "06": "Iyun",
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [activeItem, setItem] = useState(null);

  const firstRun = async () => {
    setLoading(true);

    const newsCol = collection(db, "news");
    const newsSnapshot = await getDocs(newsCol);
    const newsList = newsSnapshot.docs.map((doc) => doc.data());

    const item = newsList.filter((el) => {
      return el.id === newsId;
    });

    const itemList = newsList.filter((el) => el.id !== newsId);
    setData(itemList);
    setItem(item[0]);
    setLoading(false);
  };

  useEffect(() => {
    firstRun();
  }, [newsId]);
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
            <img className="news-page__img" src={activeItem.imgLink} />
            <h2>{activeItem.title}</h2>
            <p className="news-page__time">{activeItem.time}</p>
            <p>&nbsp; &nbsp; &nbsp; {activeItem.text}</p>
            <Slider title={"boshqa yangiliklar"} loading={data}>
              {data.map((item) => {
                const { title, id, text, imgLink, time } = item;
                return (
                  <Link
                    onClick="scroll(0,0);"
                    to={`/news/${id}`}
                    className="slider__item"
                    key={id}
                  >
                    <LazyLoadImage
                      className="slider__item__img"
                      loading="lazy"
                      width={405}
                      height={285}
                      placeholderSrc={loader}
                      src={imgLink}
                      alt="news"
                    />
                    <h5>{time}</h5>
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

export default NewsPage;
