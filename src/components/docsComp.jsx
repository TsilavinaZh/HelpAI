import React, {useState} from "react";
import image1 from "../assets/images/1742501496599.jpg";
import { Flex, Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

function DocsComp() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const [size, setSize] = useState('large');


  return (
    <>

<header>
        <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
          <div className="container"><a className="navbar-brand" href="#">Help IA</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><a className="nav-link active" href="#">Accueil</a></li>
                <li className="nav-item"><a className="nav-link" href="#docs">Guide d'utilisation</a></li>
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
      <div>
        <center>
          <h2>Guide d'utilisation complète</h2>

        </center>      <h4>En dessous des images descriptips d'utilisation.</h4>

        <div className="responsive">
          <div className="gallery">
            <a target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Cinque Terre" width="600" height="400" />
            </a>
            <div className="desc">Cinque Terre, Italy</div>
          </div>
        </div>

        <div className="responsive">
          <div className="gallery">
            <a target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Beautiful Forest" width="600" height="400" />
            </a>
            <div className="desc">Beautiful Forest</div>
          </div>
        </div>

        <div className="responsive">
          <div className="gallery">
            <a target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Northern Lights" width="600" height="400" />
            </a>
            <div className="desc">Northern Lights</div>
          </div>
        </div>

        <div className="responsive">
          <div className="gallery">
            <a target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Majestic Mountains" width="600" height="400" />
            </a>
            <div className="desc">Majestic Mountains</div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div style={{ padding: "6px" }}>
          <p>
            Notre plateforme vous permet d'accéder facilement à des ressources, des services et des outils adaptés à vos besoins.<br />
            Naviguez à travers nos sections pour découvrir des informations utiles, des guides pratiques et des solutions personnalisées.
            Nous sommes là pour vous aider à chaque étape.<br />
            Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.<br />
          </p>
        </div>

        <footer className="footer-clean">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-4 col-md-3 item">
                <h3>Nos Pages</h3>
                <ul>
                  <li><a href="">Accueil</a></li>
                  <li><a href="">Documentations</a></li>
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 item">
                <h3>Informations</h3>
                <ul>
                  <li><a href="">Qui sommes-nous ?</a></li>
                  <li><a href="">Contactez-nous ?</a></li>
                </ul>
              </div>
              <div className="col-lg-3 item social" style={{ textAlign: "center" }}>
                <a href="#"><i className="icon ion-social-facebook"></i></a>
                <p className="copyright">Octopus-Dev © 2025</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>


  );
}

export default DocsComp;