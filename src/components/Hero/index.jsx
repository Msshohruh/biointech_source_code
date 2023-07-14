import React from "react";
import "./heroStyle.css";
import image from "../../assets/image.jpg";

function Hero() {
  return (
    <main className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-wrapper">
            <h1 className="hero-title">
              Assalomu alaykum, BioInTech saytiga xush kelibsiz! <br />
            </h1>
            <p className="hero-description">
              Saytimizda Biotexnologiya sohasiga oid yangiliklar, adabiyotlar,
              me’yoriy hujjatlar, video qo’llanmalar, ilmiy ishlanmalar,
              qiziqarli ma’lumotlar, maqolalar, xalqaro va mahalliy tajribalar
              o’rin olgan. Shuningdek hozirgi kunda Biotexnologiya sohasidagi
              eng muhim yo’nalishlaridan biri bo’lgan In Vitro haqida batafsil
              ma’lumot olishingiz mumkin.
            </p>
          </div>
          <div className="hero-image-content">
            <img src={image} alt="hero-img" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
