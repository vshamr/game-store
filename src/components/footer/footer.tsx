import { FOOTER_DATA } from "@/constants/data";
import "./footer.css";


const Footer: React.FC = () => (
  <>
    <footer>
      <h2 className="footer_title">Incredible convenient</h2>
      <ul className="footer_image">
        {
          FOOTER_DATA.map((
            { href, img }) => (
              <li key={href}>
                <a href={href}>{img}</a>
              </li>
            ))}
      </ul>
    </footer>
  </>
);

export default Footer;
