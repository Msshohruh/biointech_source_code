import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import loader from "../../assets/loader200.gif";
import "./style.css";

function Slider({ children, title, loading }) {
  const links = new Map([
    ["yangiliklar", "/news"],
    ["So’nggi Maqolalar", "/articles"],
    ["qo'llanmalar", "/books"],
    ["video ma’lumotlar", "/videos"],
    ["Ilmiy ishlanmalar", "/scientific"],
    ["In Vitro", "/invitro"],
    ["Me’yoriy hujjatlar", "/laws"],
  ]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1440 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1440, min: 920 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 920, min: 0 },
      items: 1,
    },
  };
  return (
    <section className="slider">
      <div className="container">
        <NavLink to={links.get(title)} className="slider__title">
          {title}
        </NavLink>
        {!Boolean(loading.length) && (
          <div className="slider-loader">
            <img width={200} src={loader} alt="" />
          </div>
        )}
        <Carousel responsive={responsive}>{children}</Carousel>
      </div>
    </section>
  );
}

export default Slider;
