import React from "react";
import "./About.css";
export default function About() {
  return (
    <div className="About">
      <div className="AboutContainer">
        Shita no saki was made by an anime <span> enthusiast</span> to practice
        front end skills and api integrations. the 3rd party api used here is
        "trace.moe"{" "}
        <a
          className="Moe"
          href="https://github.com/soruly/trace.moe"
          target="_blank"
          rel="noreferrer"
        >
          check it out{" "}
        </a>
        <div className="Beta">
          This site is currently in beta ,if you find any bugs feel free to
          contact me !
        </div>
        <br /> Find me : <br />{" "}
        <a
          className="Socials"
          href="https://twitter.com/SaRez_wd"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Twitter
        </a>
        <br />{" "}
        <a
          className="Socials"
          href="https://github.com/SamRezDev"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          GitHub
        </a>
        <br />{" "}
        <a
          className="Socials"
          href="mailto:SamRezDev@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          E-Mail
        </a>
      </div>
    </div>
  );
}
