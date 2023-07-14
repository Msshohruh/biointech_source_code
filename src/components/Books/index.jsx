import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDocs, setDoc, collection, doc } from "firebase/firestore";
import { db, months, storage } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";
import loader from "../../assets/loader200.gif";
import BooksItem from "../BooksItem";

function Books() {
  const { setCategory, setItemCount, showModal, setModal } = useOutletContext();

  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();

  today = `${year}-${month}-${day}`;

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUpload] = useState("");
  const [title, setTitle] = useState("");

  const [file, setFile] = useState("");
  const [time, setTime] = useState(today);
  const [submitBtn, setSubmitBtn] = useState(false);

  const firstRun = async () => {
    setLoading(true);
    const booksCol = collection(db, "books");
    const booksSnapshot = await getDocs(booksCol);
    const booksList = booksSnapshot.docs.map((doc) => doc.data());
    setItemCount(booksList.length);
    setLoading(false);
    setData(booksList);
  };

  useEffect(() => {
    setCategory("Qo'llanmalar");
    firstRun();
  }, []);

  const uploadDoc = async (url, size, src) => {
    const itemId = uuidv4();
    const timestampt = `${time.slice(8)} ${
      months[`${time.slice(5, 7)}`]
    } ${time.slice(0, 4)}`;
    const ref2 = doc(db, "books", itemId);
    const fileSize = (Number(size) / 1024 / 1024).toFixed(2);
    await setDoc(ref2, {
      id: itemId,
      title,
      fileUrl: url,
      fileSize,
      fileSrc: src,
      time: timestampt,
    });
    setTitle("");
    setFile("");

    firstRun();
  };

  const handleSubmit = () => {
    setSubmitBtn(true);

    const name = new Date().getTime() + file.name;

    console.log(name);

    const storageRef = ref(storage, `books/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUpload(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          uploadDoc(
            downloadURL,
            uploadTask.snapshot.totalBytes,
            `books/${name}`
          );
          setSubmitBtn(false);
          setModal(false);
        });
      }
    );
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
            return <BooksItem data={item} firstRun={firstRun} key={item.id} />;
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
              <h5 style={{ textAlign: "center" }}>{Math.round(uploading)} %</h5>
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
                    setModal(false);
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
                    placeholder="Kitobning sarlavhasini kiriting"
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
                  <p>File:</p>
                  <input
                    type="file"
                    className="img-link"
                    placeholder="Rasm havolasi"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    required
                  />
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

export default Books;
