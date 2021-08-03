import React from "react";
import { createPortal } from "react-dom";

import "./styles.css";

const Modal: React.FC = (props) => createPortal(props.children, document.getElementById("modal") as HTMLElement);

export default Modal;
