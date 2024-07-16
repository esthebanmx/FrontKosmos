import React from "react";
import "./Footer.scss";
import LogoIne from "../../assets/images/logoINE_bco.svg";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <section className="footer-section">
      <a href="./" target="_blank" rel="noreferrer">
        {/* <img className="logo-ine" src={LogoIne} alt="logo" /> */}  {/* TODO: AGREGAR IMAGEN DEL SISTEMA */}
      </a>
      <div className="left-content">
        <span className="year-label">{`©Demo Blank  ${currentYear}`}</span>        
      </div>
      <span className="utsi-label">
        Demo Blank 
      </span>
      <div className="version-div">
        <span className="revision-label">1.0.0 Rev. 0 01/01/2024 00:00 </span>
        <span className="version-label">
          Nombre del Sistema
        </span>
      </div>
    </section>
  );
}

export { Footer };
