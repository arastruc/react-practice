import investmentPicture from "./investment-calculator-logo.png";
import "./header.css";

const Header = () => {
  return (
    <div id="header" className="center">
      <img
        src={investmentPicture}
        alt="A picture with a bag of money and coins"
      />
      <h1>Investment Calculator</h1>
    </div>
  );
};

export default Header;
