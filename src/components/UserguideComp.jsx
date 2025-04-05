import React from "react";


function UserguideComp() {
  return (
    <>

      <div className="page-content">
        <div className="about-container">
          <section className="about-hero" >
            <h2 className="text-center">Guide d'utilisation</h2>

          </section>
          <section className="about-section">
          <p className="text-center">
            Bienvenue sur notre site dédié à l'accompagnement des personnes en situation de handicap.
            Notre plateforme vous permet d'accéder facilement à des ressources, des services et des outils adaptés à vos besoins.
            Naviguez à travers nos sections pour découvrir des informations utiles, des guides pratiques et des solutions personnalisées.
            Nous sommes là pour vous aider à chaque étape.<br />
            Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.<br />
          </p>
          </section>

          <div className="text-center" style={{paddingBottom: '30px'}}>

            <button type="button" className="btn_savoir_plus" onClick={() => window.location.href = "/userguide"}>
              En savoir plus sur l'utilisation
            </button>

          </div>
        </div>
      </div>


    </>
  );
}

export default UserguideComp;
