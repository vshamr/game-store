import { FOOTER_DATA } from "@/constants/data";
import "./footer.css";


const Footer: React.FC = () => (
  <footer>
    <div>
      <h2 className="footer_title">Incredible convenient</h2>

      <div>
        <ul className="footer_image">
          {
            FOOTER_DATA.map(({ href, img }) =>  (
              <li key={href}>
                <a href={href}>{img}</a>
            </li>
            ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
