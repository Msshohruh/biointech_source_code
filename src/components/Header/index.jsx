import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TbArrowBarLeft, TbArrowBarRight } from "react-icons/tb";
import Footer from "../Footer";
import Logo from "../../assets/image/Logo.png";
import "./headerStyle.css";

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  window.addEventListener("scroll", () => {
    setShowNavbar(false);
  });

  return (
    <>
      <header className="header" autoFocus>
        <div className="container">
          <div className="navbar">
            <NavLink className="site-logo" to={"/"}>
              <div className="logo-wrapper">
                <img className="logo" src={Logo} alt="" width={48} />
                BioInTech
              </div>
            </NavLink>

            <ul className={`sitenav ${showNavbar ? "" : "hidden"}`}>
              <div className="sitenav-close">
                <TbArrowBarRight
                  onClick={() => setShowNavbar((prev) => !prev)}
                  className="close"
                />
              </div>
              <li className="sitenav-item">
                <NavLink className="sitenav-link" to="/invitro">
                  In Vitro
                </NavLink>
                <span className="underline"></span>
              </li>
              <li className="sitenav-item">
                <NavLink className="sitenav-link" to="/news">
                  Yangiliklar
                </NavLink>
                <span className="underline"></span>
              </li>
              <li className="sitenav-item">
                <NavLink className="sitenav-link" to="/scientific">
                  Ilmiy ishlanmalar
                </NavLink>
                <span className="underline"></span>
              </li>
              <li className="sitenav-item">
                <NavLink className="sitenav-link" to="/laws">
                  Me’yoriy hujjatlar
                </NavLink>
                <span className="underline"></span>
              </li>
            </ul>

            <TbArrowBarLeft
              onClick={() => {
                setShowNavbar((prev) => !prev);
              }}
              className="sitebar"
            />
          </div>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Header;
