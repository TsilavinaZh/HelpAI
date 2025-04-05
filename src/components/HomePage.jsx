import { useEffect } from "react"
import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import BannerPage from "./BannerPage";
import AboutPage from "./AboutPage";
import 'animate.css';
import Chatapp from "./Chatapp";
import ContactComp from "./contactComp";
import UserguideComp from "./UserguideComp";
export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [size, setSize] = useState('large');
  return (
    <>

      <header>
        <nav className="navbar navbar-light navbar-expand-md navigation-clean-button" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
          <div className="container"><a className="navbar-brand" href="#">Help IA</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><a className="nav-link active" href="#">Accueil</a></li>
                <li className="nav-item"><a className="nav-link" href="#docs">Guide d'utilisation</a></li>
                <li className="nav-item"><a className="nav-link" href="/freeapi">API</a></li>
                
                <li className="nav-item"><a className="nav-link" href="#apropos">A Propos</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>


              </ul>
              <Flex gap="small" align="flex-start" vertical>
                <Flex gap="small" wrap>
                  <Button
                    style={{
                      backgroundColor: "#13955e",
                      color: "white",
                      border: "2px solid #13955e",
                    }}
                    shape="round"
                    icon={!showPopup && <DownloadOutlined />}
                    size={size}
                    onClick={togglePopup} // Show or hide the pop-up
                  >
                    {showPopup ? "X" : "Télécharger"}
                  </Button>

                  {showPopup && (
                    <div className="popup">
                      <button
                        type="button"
                        className="popup-button"
                        onClick={() => (window.location.href = "/")}
                      >
                        Application mobile
                      </button>

                      <button
                        type="button"
                        className="popup-button"
                        onClick={() => (window.location.href = "/")}
                      >
                        Version ordinateur
                      </button>
                    </div>
                  )}
                </Flex>
              </Flex>
            </div>
          </div>
        </nav>
      </header>

      <section id="accueil" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
        <BannerPage />
      </section>
      
      <section id="docs">
        
      </section>

      <section data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
        <UserguideComp />
      </section>

      <section id="apropos"></section>
      <section data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
        <AboutPage />
      </section>

      <section id="contact"></section>

      <section data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" >
        <ContactComp />
      </section>

      <Chatapp />

      <footer class="footer-clean">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 item">
              <h3>Nos Pages</h3>
              <ul>
                <li><a href="#services">Accueil</a></li>
                <li><a href="#docs">Documentations</a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 item">
              <h3>Informations</h3>
              <ul>
                <li><a href="#apropos">Qui sommes-nous ?</a></li>
                <li><a href="#contact">Contactez-nous ?</a></li>
              </ul>
            </div>

            <div className="col-lg-3 item social" style={{ textAlign: "center" }}><a href="#">
              <i className="icon ion-social-facebook"></i></a>
              <p className="copyright">Octopus-Dev © 2025</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

