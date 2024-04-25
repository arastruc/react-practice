import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex flex-col justify-around items-center gap-2">
      <img src={logo} alt="A canvas" className="m-8 max-w-44" />
      <h1 className="text-2xl font-extrabold font-['Pacifico']">ReactArt</h1>
      <p className="text-stone-700">A community of artists and art-lovers.</p>
    </header>
  );
}
