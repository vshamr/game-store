import { data } from "./data";
import "./footer.css";

type DataType = {
  href: string;
  imageSrc: string;
};

const Footer = (): JSX.Element => (
  <footer className="footer">
    <h3 className="footer_title">Incredible convenient</h3>
    <div>
      <ul className="footer_image">
        {data.map(({ href, imageSrc }: DataType) => {
          <li key={href}>
            <a href={href}>{imageSrc}</a>
          </li>;
        })}
      </ul>
    </div>
  </footer>
);

export default Footer;
