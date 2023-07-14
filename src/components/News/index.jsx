import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db, months } from "../../firebase/config.jsx";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import NewsItem from "../NewsItem/index.jsx";
import loader from "../../assets/loader200.gif";

import "./style.css";

function News() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();

  today = `${year}-${month}-${day}`;

  const { setCategory, setItemCount, showModal, setModal } = useOutletContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [text, setText] = useState("");
  const [time, setTime] = useState(today);
  const [submitBtn, setSubmitBtn] = useState(false);

  const firstRun = async () => {
    setLoading(true);
    const newsCol = collection(db, "news");
    const newsSnapshot = await getDocs(newsCol);
    const newsList = newsSnapshot.docs.map((doc) => doc.data());
    setItemCount(newsList.length);
    setLoading(false);
    setData(newsList);
  };

  useEffect(() => {
    setCategory("Yangiliklar");
    firstRun();
  }, []);

  const handleSubmit = async () => {
    const id = uuidv4();
    setSubmitBtn(true);
    const timestampt = `${time.slice(8)} ${
      months[`${time.slice(5, 7)}`]
    } ${time.slice(0, 4)}`;
    await setDoc(doc(db, "news", id), {
      id,
      title,
      time: timestampt,
      imgLink,
      text,
    });
    setTitle("");
    setImgLink("");
    setText("");
    firstRun();
    setModal(false);
    setSubmitBtn(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <img width={100} src={loader} alt="" />
      </div>
    );
  }
  return (
    <div className="section-container">
      <div className="grid-wrapper">
        {data &&
          data.map((item) => {
            return <NewsItem data={item} firstRun={firstRun} key={item.id} />;
          })}
      </div>

      {showModal && (
        <>
          {submitBtn ? (
            <div className="modal-loader">
              <img
                src={loader}
                width={100}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          ) : (
            <div className="modal">
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <button
                  className="close-btn"
                  type="button"
                  onClick={() => {
                    setModal((prev) => !prev);
                  }}
                >
                  x
                </button>
                <label>
                  <p>Sarlavha:</p>

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="2"
                    placeholder="Yangilikning sarlavhasini kiriting"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  ></textarea>
                </label>
                <label>
                  <input
                    type="date"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                    required
                  />
                </label>
                <label htmlFor="">
                  <p>Rasm:</p>
                  <input
                    type="text"
                    className="img-link"
                    placeholder="Rasm havolasi"
                    value={imgLink}
                    onChange={(e) => {
                      setImgLink(e.target.value);
                    }}
                    required
                  />
                </label>
                <label htmlFor="">
                  <p>Text:</p>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Yangilikning textini kiriting"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    required
                  ></textarea>
                </label>
                <button
                  className="add-btn"
                  type="submit"
                  disabled={submitBtn ? true : ""}
                >
                  Qo'shish
                </button>
              </form>
            </div>
          )}
          <div className="overlay"></div>
        </>
      )}
    </div>
  );
}

export default News;
