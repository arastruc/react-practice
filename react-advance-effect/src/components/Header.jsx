import logoImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="A picture with a quiz" />
      <h1>React Quiz</h1>
    </header>
  );
}
