import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import { collection, getDocs } from "firebase/firestore";
import { db, toFormat } from "../firebase/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loader from "../assets/loader.gif";
import { Link, NavLink } from "react-router-dom";
// Render a YouTube video player
function Home() {
  const [news, setNews] = useState([]);
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [scientific, setScientific] = useState([]);
  const [laws, setLaws] = useState([]);
  const [invitro, setInvitro] = useState([]);

  const firstRun = async () => {
    // news

    const newsCol = collection(db, "news");
    const newsSnapshot = await getDocs(newsCol);
    const newsList = newsSnapshot.docs.map((doc) => doc.data());
    setNews(
      newsList.sort(function (a, b) {
        return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
      })
    );

    // articles
    const articleCol = collection(db, "articles");
    const articleSnapshot = await getDocs(articleCol);
    const articleList = articleSnapshot.docs.map((doc) => doc.data());
    setArticles(articleList);

    // videos
    const videoCol = collection(db, "videos");
    const videoSnapshot = await getDocs(videoCol);
    const videoList = videoSnapshot.docs.map((doc) => doc.data());
    setVideos(videoList);

    const booksCol = collection(db, "books");
    const booksSnapshot = await getDocs(booksCol);
    const booksList = booksSnapshot.docs.map((doc) => doc.data());
    setBooks(
      booksList.sort(function (a, b) {
        return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
      })
    );

    // scientific
    const scientificCol = collection(db, "scientific");
    const scientificSnapshot = await getDocs(scientificCol);
    const scientificList = scientificSnapshot.docs.map((doc) => doc.data());
    setScientific(
      scientificList.sort(function (a, b) {
        return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
      })
    );

    // invitro
    const invitroCol = collection(db, "invitro");
    const invitroSnapshot = await getDocs(invitroCol);
    const invitroList = invitroSnapshot.docs.map((doc) => doc.data());
    setInvitro(invitroList);

    // laws
    const lawsCol = collection(db, "laws");
    const lawsSnapshot = await getDocs(lawsCol);
    const lawsList = lawsSnapshot.docs.map((doc) => doc.data());
    setLaws(
      lawsList.sort(function (a, b) {
        return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
      })
    );
  };
  useEffect(() => {
    firstRun();
  }, []);
  return (
    <main>
      <Hero />
      <Slider title={"yangiliklar"} loading={news}>
        {news &&
          news.map((item) => {
            const { title, id, text, imgLink, time } = item;
            return (
              <Link to={`/news/${id}`} className="slider__item" key={id}>
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
      {articles.length && (
        <Slider title={"So’nggi Maqolalar"} loading={articles}>
          {articles.map((item) => {
            const { id, title, fileUrl, text, time } = item;
            return (
              <Link
                to={`/articles/${id}`}
                className="slider__item article"
                key={id}
              >
                <h4 className="article__title">{title}</h4>
                <h5 className="article__desc">{text}</h5>
                <div className="article__footer">
                  {/* <span className="author">by Shokhrukh</span> */}
                  <span className="date">{time}</span>
                </div>
              </Link>
            );
          })}
        </Slider>
      )}
      <Slider title={"qo'llanmalar"} loading={books}>
        {books &&
          books.map((item) => {
            const { id, title, fileUrl, fileSize } = item;
            return (
              <div className="slider__item article bookItem" key={id}>
                <h4 className="article__title" style={{ textAlign: "center" }}>
                  {title}
                </h4>

                <div className="article__footer">
                  <h5
                    style={{ textAlign: "center", fontSize: "20px" }}
                    className="author"
                  >
                    {fileSize} MB
                  </h5>
                </div>
                <a
                  className="news-page__time download-btn"
                  href={`${fileUrl}`}
                  target="_blank"
                  download
                >
                  Ko'rish / Yuklab olish
                </a>
              </div>
            );
          })}
      </Slider>
      <Slider title={"video ma’lumotlar"} loading={videos}>
        {videos &&
          videos.map((item) => {
            const { title, videoId, id } = item;

            return (
              <Link className="slider__item" to={`/videos/${id}`} key={id}>
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
      <Slider title={"Ilmiy ishlanmalar"} loading={scientific}>
        {scientific &&
          scientific.map((item) => {
            const { id, title, text, time } = item;
            return (
              <Link
                to={`/scientific/${id}`}
                className="slider__item article"
                key={id}
              >
                <h4 className="article__title">{title}</h4>
                <h5 className="article__desc">{text.slice(0, 115)}...</h5>
                <div className="article__footer">
                  {/* <span className="author">by Shokhrukh</span> */}
                  <span className="date">{time}</span>
                </div>
              </Link>
            );
          })}
      </Slider>
      <Slider title={"In Vitro"} loading={invitro}>
        {invitro &&
          invitro.map((item) => {
            const { title, videoId, id } = item;

            return (
              <Link className="slider__item" to={`/invitro/${id}`} key={id}>
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
      <Slider title={"Me’yoriy hujjatlar"} loading={laws}>
        {laws &&
          laws.map((item) => {
            const { id, title, text, time } = item;
            return (
              <Link
                to={`/laws/${id}`}
                className="slider__item article"
                key={id}
              >
                <h4 className="article__title">{title}</h4>
                <h5 className="article__desc">{text.slice(0, 115)}...</h5>
                <div className="article__footer">
                  {/* <span className="author">by Shokhrukh</span> */}
                  <span className="date">{time}</span>
                </div>
              </Link>
            );
          })}
      </Slider>
    </main>
  );
}

export default Home;
