import React from "react";
import { render } from "react-dom";
import App from "../components/App";
import ContextWrapper from "../contexts/ContextWrapper"

document.addEventListener("DOMContentLoaded", () => {
  render(
    <ContextWrapper>
      <App />
    </ContextWrapper>  
    , document.body.appendChild(document.createElement("div")));
});
