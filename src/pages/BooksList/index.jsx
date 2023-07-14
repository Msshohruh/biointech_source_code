import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, toFormat } from "../../firebase/config";
import loader from "../../assets/loader200.gif";

function BooksList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const firstRun = async () => {
    setLoading(true);
    const booksCol = collection(db, "books");
    const booksSnapshot = await getDocs(booksCol);
    const booksList = booksSnapshot.docs.map((doc) => doc.data());
    setData(
      booksList.sort(function (a, b) {
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
          Qo'llanmalar
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
              const { id, time, title, fileUrl, fileSize } = item;
              return (
                <div className="slider__item bookItem" key={id}>
                  <h4 className="article__title">{title}</h4>

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
        </div>
      </div>
    </main>
  );
}

export default BooksList;
