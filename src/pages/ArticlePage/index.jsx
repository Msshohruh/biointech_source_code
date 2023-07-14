import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { BsArrowLeftCircle } from "react-icons/bs";
import Slider from "../../components/Slider";
import loader from "../../assets/loader200.gif";

function ArticlePage() {
  const { articleId } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [activeItem, setItem] = useState(null);

  const firstRun = async () => {
    setLoading(true);

    const articleCol = collection(db, "articles");
    const articleSnapshot = await getDocs(articleCol);
    const articleList = articleSnapshot.docs.map((doc) => doc.data());

    const item = articleList.filter((el) => {
      return el.id === articleId;
    });

    const itemList = articleList.filter((el) => el.id !== articleId);
    setData(itemList);
    setItem(item[0]);
    setLoading(false);
  };

  useEffect(() => {
    firstRun();
  }, [articleId]);
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
            <h2>{activeItem.title}</h2>
            <p>{activeItem.time}</p>
            <p>
              &nbsp; &nbsp; &nbsp; {/*activeItem.text*/} Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Cum ullam neque sequi
              temporibus blanditiis voluptatibus porro omnis saepe, incidunt
              laboriosam ipsa, minus quos dignissimos quasi et sed a autem ex
              quod labore veritatis quas explicabo error! Eaque dicta eveniet
              placeat repellendus ullam, sequi, nulla quaerat, delectus nam
              alias in dignissimos.
            </p>
            <a
              className="news-page__time"
              href={`${activeItem.fileUrl}`}
              target="_blank"
              download
            >
              Ko'rish / Yuklab olish
            </a>
            <Slider title={"So’nggi Maqolalar"} loading={data}>
              {data &&
                data.map((item) => {
                  const { id, title, text, time } = item;
                  return (
                    <Link
                      onClick="scroll(0,0);"
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
          </>
        )}
      </div>
    </main>
  );
}

export default ArticlePage;
