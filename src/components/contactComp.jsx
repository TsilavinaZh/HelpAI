import React from "react";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons"; // Import Ant Design icons

function ContactComp() {
  return (
    <>
      <div className="page-content">
        <div className="about-container">
          <section className="about-hero">
            <h1 className="text-center">Contactez-nous</h1>

          </section>

          <section data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000" className="about-section">
            <div className="contact-info">
              <div className="contact-item">
                <EnvironmentOutlined style={{ fontSize: "24px", color: "#13955e", margin: "10px" }} /> {/* Ant Design icon */}

                <div>
                  <h3>Notre adresse</h3>
                  <p>Antsirabe 110, Madagascar</p>
                </div>
              </div>

              <div className="contact-item">
                <PhoneOutlined style={{ fontSize: "24px", color: "#13955e", margin: "10px" }} /> {/* Ant Design icon */}

                <div>
                  <h3>Téléphone</h3>
                  <p>+261 38 85 738 12</p>
                </div>
              </div>

              <div className="contact-item">
                <MailOutlined style={{ fontSize: "24px", color: "#13955e", margin: "10px" }} /> {/* Ant Design icon */}

                <div>
                  <h3>Email</h3>
                  <p>techforall@gmail.com</p>
                </div>
              </div>
            </div>

            <form className="contact-form" to="/" method="POST">
              <div className="form-group">
                <label htmlFor="full_name">Nom complet</label>
                <input
                  className="form-input"
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  className="form-input"
                  type="text"
                  id="subject"
                  name="subject"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-input"
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Envoyer le message
              </button>
            </form>
          </section>

        </div>

      </div>
    </>
  );
}

export default ContactComp;