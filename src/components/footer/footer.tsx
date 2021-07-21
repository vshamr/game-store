import { FooterData } from "@/constants/data";
import "./footer.css";


const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer_container">
      <h3 className="footer_title">Incredible convenient</h3>

      <div className="footer_content">
        <ul className="footer_image">
          {
            FooterData.map(({ href, img }) =>  (
              <li key={href}>
                <a href={href}>{img}</a>
            </li>
            )}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
