import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, toFormat } from "../../firebase/config";
import loader from "../../assets/loader200.gif";

function LawsList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const firstRun = async () => {
    setLoading(true);
    const lawsCol = collection(db, "laws");
    const lawsSnapshot = await getDocs(lawsCol);
    const lawsList = lawsSnapshot.docs.map((doc) => doc.data());
    setData(
      lawsList.sort(function (a, b) {
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
          Me’yoriy hujjatlar
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
                  onClick="scroll(0,0);"
                  to={`/laws/${id}`}
                  className="slider__item article"
                  key={id}
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

export default LawsList;
