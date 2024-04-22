import { useState } from "react";
import InvestmentInput from "./InvestmentInput";
import "./investment.css";
import { calculateInvestmentResults } from "../../util/investment";
import InvestmentResult from "./InvestmentResult";

const Investment = () => {
  const [investmentDatas, setInvestmentDatas] = useState({
    initialInvestment: null,
    annualInvestment: null,
    expectedReturn: null,
    duration: null,
  });

  let annualData = calculateInvestmentResults(investmentDatas);
  let inputIsValid = investmentDatas.duration >= 1;

  function updateInvestmentDatas(inputName, value) {
    setInvestmentDatas((prev) => ({ ...prev, [inputName]: +value }));
  }

  return (
    <>
      <InvestmentInput updateInvestmentDatas={updateInvestmentDatas} />
      {inputIsValid && <InvestmentResult data={annualData} />}
    </>
  );
};

export default Investment;
