import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className=" container">
        <div className="footer-container">
          <div className="footer-first-box">
            <p className="first-box__desc">
              Biz sizning loyihangizni muhokama qilish va Biotexnologiya
              muammolariga yordam berish uchun har doim ochiqmiz.
            </p>
          </div>
          <div className="footer-second">
            <div className="footer-second-box">
              <ul className="footer-list">
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/news"
                  className="footer-list-item"
                >
                  Yangiliklar
                </NavLink>
                <NavLink to="/articles" className="footer-list-item">
                  Maqolalar
                </NavLink>
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/videos"
                  className="footer-list-item malumot"
                >
                  Video ma’lumotlar
                </NavLink>
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/invitro"
                  className="footer-list-item"
                >
                  In vitro
                </NavLink>
              </ul>
            </div>
            <div className="footer-second-box">
              <ul className="footer-list">
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/books"
                  className="footer-list-item"
                >
                  Qo'llanmalar
                </NavLink>
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/laws"
                  className="footer-list-item"
                >
                  Me’yoriy hujjatlar
                </NavLink>
                <NavLink
                  onClick="scroll(0,0); return false"
                  to="/experiments"
                  className="footer-list-item"
                >
                  Xalqaro va mahalliy tajribalar
                </NavLink>
                <NavLink
                  className="footer-list-item"
                  onClick="scroll(0,0); return false"
                  to="/scientific"
                >
                  Ilmiy ishlanmalar
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__contact-box">
          <div className="first-mini-box">
            <span>Email:</span>
            <span>
              <a target="_blank" href="biointech@gmail.com">
                biointech@gmail.com
              </a>
            </span>
          </div>
          <div className="first-mini-box">
            <span>Tel:</span>
            <span>
              <a target="_blank" href="tel:999999999">
                +99899 699 99 99
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
