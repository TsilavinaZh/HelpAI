import MobileBanner from "./MobileBanner";
import Welcome from "./welcomevoice";
export default function MobileHome() {
    return (
        <>
            {/* <header>
                <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
                    <div className="container"><a className="navbar-brand" href="#">Help IA</a>
                        
                    </div>
                </nav>
            </header> */}
            <section>
                <MobileBanner/>
            </section>
            <Welcome />
        </>
    )
}