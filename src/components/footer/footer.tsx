function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <h3 className="footer_title">Incredible convenient</h3>

      <div>
        <span className="footer_image">
          <a href="https://www.supergiantgames.com/">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/54/Supergiant_games_logo.png"
              alt="Supergiant Games Logo"
            />
          </a>
        </span>
        <span className="footer_image">
          <a href="https://www.ubisoft.com/ru-ru/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Ubisoft_logo.svg" alt="Ubisoft Games Logo" />
          </a>
        </span>
        <span className="footer_image">
          <a href="https://www.nintendo.ru/">
            <img
              src="http://cdn02.nintendo-europe.com/media/images/10_share_images/others_3/H2x1_NintendoLogo_Red_image1280w.png"
              alt="Nintendo Games Logo"
            />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
