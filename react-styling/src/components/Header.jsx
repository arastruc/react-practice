import logo from "../assets/logo.png";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p className={classes.paragraph}>
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
