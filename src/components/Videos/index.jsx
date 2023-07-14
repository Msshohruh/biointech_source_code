import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useOutletContext } from "react-router-dom";
import { TfiTrash, TfiPencil } from "react-icons/tfi";
import { db } from "../../firebase/config.jsx";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import loader from "../../assets/loader200.gif";
import VideosItem from "../VideosItem/index.jsx";
import "./style.css";

function Videos() {
  const { setCategory, setItemCount, showModal, setModal } = useOutletContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [text, setText] = useState("");
  const [submitBtn, setSubmitBtn] = useState(false);

  const firstRun = async () => {
    setLoading(true);
    const videosCol = collection(db, "videos");
    const videosSnapshot = await getDocs(videosCol);
    const videosList = videosSnapshot.docs.map((doc) => doc.data());
    setItemCount(videosList.length);
    setLoading(false);
    setData(videosList);
  };

  useEffect(() => {
    setCategory("Video Ma'lumotlar");
    firstRun();
  }, []);

  const handleSubmit = async () => {
    const id = uuidv4();
    setSubmitBtn(true);
    const link = videoLink.trim();
    const videoId = link.slice(17);

    await setDoc(doc(db, "videos", id), {
      id,
      title,
      videoLink: link,
      videoId,
      text,
    });
    setTitle("");
    setVideoLink("");
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
            return <VideosItem data={item} firstRun={firstRun} key={item.id} />;
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
                    placeholder="Videoning sarlavhasini kiriting"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  ></textarea>
                </label>

                <label htmlFor="">
                  <p>Video:</p>
                  <input
                    type="text"
                    className="img-link"
                    placeholder="Video havolasi"
                    value={videoLink}
                    // https://youtu.be/D9W7AFeJ3kk
                    onChange={(e) => {
                      setVideoLink(e.target.value.trim());
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
                    rows="3"
                    placeholder="Videoning textini kiriting"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value.trim());
                    }}
                    required
                  ></textarea>
                </label>
                <button className="add-btn" type="submit">
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

export default Videos;
