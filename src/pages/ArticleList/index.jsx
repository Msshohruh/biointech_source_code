import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import loader from "../../assets/loader200.gif";

function ArticleList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  function toFormat(item) {
    const timeFormat = `${item.slice(7)}-${
      months[`${item.slice(3, 6)}`]
    }-${item.slice(0, 2)}`;
    return timeFormat;
  }

  function sortDataByDate(arr) {
    const newArr = arr.sort(function (a, b) {
      return new Date(toFormat(b.time)) - new Date(toFormat(a.time));
    });
    return newArr;
  }

  const firstRun = async () => {
    setLoading(true);
    const articlesCol = collection(db, "articles");
    const articlesSnapshot = await getDocs(articlesCol);
    const articlesList = articlesSnapshot.docs.map((doc) => doc.data());
    setData(sortDataByDate(articlesList));
    setLoading(false);
  };
  useEffect(() => {
    firstRun();
  }, []);
  return (
    <main>
      <div className="container" style={{ marginBottom: "50px" }}>
        <h2 className="slider__title" style={{ margin: "50px" }}>
          Maqolalar
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
              const { id, time, text, title } = item;
              return (
                <Link
                  to={`/articles/${id}`}
                  className="slider__item article"
                  key={id}
                  onClick="scroll(0,0);"
                >
                  <h4 className="article__title">{title}</h4>
                  <h5 className="article__desc">{text.slice(0, 120)}...</h5>
                  <div className="article__footer">
                    {/* <span className="author">by Shokhrukh</span> */}
                    <span className="date">{time}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default ArticleList;
