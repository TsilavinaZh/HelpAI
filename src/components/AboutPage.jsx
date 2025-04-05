export default function AboutPage(){
    return(
        <>
 <main className="page-content">
  <div className="about-container">

    <section className="about-hero">
      <h1>Qui est <span style={{ color: "#13955e" }}>Help IA</span> ?</h1>
    </section>

    <section data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000"className="about-section">
      <h2 >Notre Mission</h2>
      <div className="mission-content">
        <p>
          <strong>Help IA</strong> est une plateforme inclusive dédiée à rendre la technologie accessible à tous, en particulier aux personnes en situation de handicap.
        </p>
        <p>
          Notre mission est de briser les barrières numériques en proposant des solutions concrètes adaptées aux besoins des utilisateurs aveugles, sourds, malvoyants, malentendants ou à mobilité réduite.
        </p>
        <p>
          Parce que l’innovation doit être un droit, pas un privilège.
        </p>
      </div>
    </section>

    <section className="about-section features-section">
      <h2>Nos Solutions Accessibles</h2>
      <div className="features-grid">

        <div data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000" className="feature-card">
          <h3>Accessibilité pour les malvoyants</h3>
          <p>Interfaces vocales, lecture d’écran, contrastes renforcés et navigation simplifiée.</p>
        </div>

        <div data-aos="fade-down" data-aos-delay="300" data-aos-duration="1000" className="feature-card">
          <h3>Support pour les personnes aveugles</h3>
          <p>Fonctionnalités entièrement contrôlables par la voix et compatibilité avec les lecteurs d'écran.</p>
        </div>

        <div data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000" className="feature-card">
          <h3>Accessibilité pour les personnes sourdes</h3>
          <p>Transcription automatique, sous-titres intégrés et options d’envoi de message pour faciliter la communication.</p>
        </div>

        

      </div>
    </section>

    <section data-aos="fade-right"data-aos-delay="300" data-aos-duration="1000" className="about-section team-section">
      <h2 >Notre Équipe</h2>
      <p>
        Une équipe passionnée, engagée dans la conception de solutions technologiques inclusives pour bâtir un monde numérique équitable.
      </p>
    </section>

  </div>
</main>

        </>
    )
}