import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { BsArrowLeftCircle } from "react-icons/bs";
import Slider from "../../components/Slider";
import loader from "../../assets/loader200.gif";

function ScientificPage() {
  const { scientificId } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [activeItem, setItem] = useState(null);

  const firstRun = async () => {
    setLoading(true);

    const scientificCol = collection(db, "scientific");
    const scientificSnapshot = await getDocs(scientificCol);
    const scientificList = scientificSnapshot.docs.map((doc) => doc.data());

    const item = scientificList.filter((el) => {
      return el.id === scientificId;
    });

    const itemList = scientificList.filter((el) => el.id !== scientificId);
    setData(itemList);
    setItem(item[0]);
    setLoading(false);
  };

  useEffect(() => {
    firstRun();
  }, [scientificId]);
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
            <p>&nbsp; &nbsp; &nbsp;{activeItem.text}</p>
            <a
              className="news-page__time"
              href={`${activeItem.fileUrl}`}
              target="_blank"
              download
            >
              Ko'rish / Yuklab olish
            </a>
            <Slider title={"Ilmiy ishlanmalar"} loading={data}>
              {data &&
                data.map((item) => {
                  const { id, title, text, time } = item;
                  return (
                    <Link
                      onClick="scroll(0,0);"
                      to={`/scientific/${id}`}
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
            </Slider>
          </>
        )}
      </div>
    </main>
  );
}

export default ScientificPage;
