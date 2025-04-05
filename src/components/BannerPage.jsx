import img from '../assets/images/img.png';
import micro from '../assets/images/micro.png';
import 'animate.css';

export default function BannerPage() {
    return (
        <div className="bannerPage">
            <img
                src={micro}
                alt="Left Image"
                className="left-image animate__animated animate__pulse animate__infinite"
            />

            <div className="center-content" data-aos="fade-up">
                <h1>
                    Bienvenue <br />
                    <span style={{ color: '#007660' }}>Chez Help IA</span>
                </h1>
                <p><strong>Une application qui rend le numérique accessible à tous</strong></p>
                <a href="#next">Voir Plus</a>
            </div>

            <img
                src={img}
                alt="Right Image"
                className="right-image animate__animated animate__pulse animate__infinite"
            />
        </div>
    );
}
