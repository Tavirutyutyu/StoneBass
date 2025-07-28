import "/src/style/footer.css";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="social-icons">
                <FaInstagram />
                <FaFacebookF />
                <FaYoutube />
            </div>
        </footer>
    );
}
