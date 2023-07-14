import React, { useState } from "react";
import { TfiTrash, TfiPencil } from "react-icons/tfi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, months } from "../../firebase/config.jsx";
import loader from "../../assets/loader200.gif";
import "./style.css";

function NewsItem({ data, firstRun }) {
  const { id, title, imgLink, text, time } = data;

  const timeFormat = `${time.slice(7)}-${
    months[`${time.slice(3, 6)}`]
  }-${time.slice(0, 2)}`;
  // 27 May 2023
  // 2023-05-12
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [itemTitle, setTitle] = useState(title);
  const [itemImg, setItemImg] = useState(imgLink);
  const [itemText, setText] = useState(text);
  const [itemTime, setTime] = useState(timeFormat);

  const [loading, setLoading] = useState(false);

  const deleteItem = async (itemId) => {
    setLoading(true);
    await deleteDoc(doc(db, "news", itemId));
    setDelModal(false);
    firstRun();
  };

  const handleSubmit = async (itemId) => {
    const ref = doc(db, "news", itemId);
    const timestampt = `${itemTime.slice(8)} ${
      months[`${itemTime.slice(5, 7)}`]
    } ${itemTime.slice(0, 4)}`;

    setLoading(true);
    await updateDoc(ref, {
      title: itemTitle,
      imgLink: itemImg,
      text: itemText,
      time: timestampt,
    });
    setLoading(false);
    setEditModal(false);
    firstRun();
  };

  return (
    <>
      <div className="grid-wrapper__item news">
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
        <button
          className="delete-btn grid-wrapper__item--btn"
          onClick={() => {
            setDelModal(true);
          }}
        >
          <TfiTrash />
        </button>
        <button
          className="edit-btn grid-wrapper__item--btn"
          onClick={() => {
            setEditModal(true);
          }}
        >
          <TfiPencil />
        </button>
      </div>
      {editModal && (
        <>
          <div className="modal">
            {loading ? (
              <img
                src={loader}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            ) : (
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(id);
                }}
              >
                <button
                  className="close-btn"
                  type="button"
                  onClick={() => {
                    setEditModal(false);
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
                    value={itemTitle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></textarea>
                </label>
                <label>
                  <input
                    type="date"
                    value={itemTime}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="">
                  <p>Rasm:</p>
                  <input
                    type="text"
                    className="img-link"
                    placeholder="Rasm havolasi"
                    value={itemImg}
                    onChange={(e) => {
                      setItemImg(e.target.value);
                    }}
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
                    value={itemText}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  ></textarea>
                </label>
                <button className="add-btn" type="submit">
                  O'zgartirish
                </button>
              </form>
            )}
          </div>
          <div className="overlay"></div>
        </>
      )}
      {delModal && (
        <>
          <div className="del-modal">
            {loading ? (
              <img src={loader} width={150} />
            ) : (
              <>
                <h3>Yangilik o'chirilsinmi?</h3>
                <div className="del-modal__buttons">
                  <button
                    onClick={() => {
                      deleteItem(id);
                    }}
                  >
                    Ha
                  </button>
                  <button
                    onClick={() => {
                      setDelModal(false);
                    }}
                  >
                    Yo'q
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
}

export default NewsItem;
