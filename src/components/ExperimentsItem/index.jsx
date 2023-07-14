import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TfiTrash, TfiPencil } from "react-icons/tfi";
import loader from "../../assets/loader200.gif";

function ExperimentsItem({ data, firstRun }) {
  const {
    id,
    title: itemTitle,
    text: itemText,
    videoId,
    videoLink: itemVideoLink,
  } = data;

  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(itemTitle);
  const [text, setText] = useState(itemText);
  const [videoLink, setVideoLink] = useState(itemVideoLink);

  const handleSubmit = async (itemId) => {
    const ref = doc(db, "exper", itemId);
    const link = videoLink.trim();
    const videoKey = link.slice(17);
    setLoading(true);
    await updateDoc(ref, {
      title,
      text,
      videoLink: link,
      videoId: videoKey,
    });
    setLoading(false);
    setEditModal(false);
    firstRun();
  };

  const deleteItem = async (key) => {
    setLoading(true);
    await deleteDoc(doc(db, "exper", key));
    setDelModal(false);
    firstRun();
  };

  return (
    <>
      <div className="grid-wrapper__item" key={id}>
        <LazyLoadImage
          className="slider__vider--img slider__item__img"
          loading="lazy"
          width={320}
          placeholderSrc={loader}
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="video"
        />

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
                    placeholder="Videoning sarlavhasini kiriting"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  ></textarea>
                </label>

                <label>
                  <p>Video:</p>
                  <input
                    type="text"
                    className="img-link"
                    placeholder="Video havolasi"
                    value={videoLink}
                    onChange={(e) => {
                      setVideoLink(e.target.value);
                    }}
                    required
                  />
                </label>
                <label>
                  <p>Text:</p>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    placeholder="Videoning textini kiriting"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    required
                  ></textarea>
                </label>
                <button className="add-btn" type="submit">
                  Qo'shish
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
                <h3>Maqola o'chirilsinmi?</h3>
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

export default ExperimentsItem;
