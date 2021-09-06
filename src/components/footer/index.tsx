import React from "react";

import "./styles.css";
import { FOOTER_DATA } from "@/constants/data";

const Footer: React.FC = () => (
  <footer>
    <div className="footer_container">
      <h2 className="footer_title">
        <span>Incredible</span> convenient
      </h2>
      <ul className="footer_image">
        {FOOTER_DATA.map(({ href, img }) => (
          <li key={href}>
            <a href={href}>{img}</a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
export default React.memo(Footer);
