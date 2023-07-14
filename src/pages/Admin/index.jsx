import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import "./style.css";

function Admin() {
  const [category, setCategory] = useState("Choose a category");
  const [itemCount, setItemCount] = useState(0);
  const [showModal, setModal] = useState(false);

  return (
    <main className="main-admin">
      <div className="admin__container">
        <Sidebar />
        <div className="wrapper">
          <div className="admin__header">
            <div className="admin__title">
              <h1>{category}</h1>
              <h3>{itemCount} items</h3>
            </div>
            <button
              className="add-btn"
              onClick={() => {
                setModal((prev) => !prev);
              }}
              disabled={category !== "Choose a category" ? "" : true}
            >
              <BiPlusCircle />
              add a new item
            </button>
          </div>
          <Outlet
            context={{ setCategory, setItemCount, showModal, setModal }}
          />
        </div>
      </div>
    </main>
  );
}

export default Admin;
