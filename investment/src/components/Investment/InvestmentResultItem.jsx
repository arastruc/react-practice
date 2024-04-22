import { formatter } from "../../util/investment";

const InvestmentResultItem = ({
  year,
  interest,
  valueEndOfYear,
  totalCapitalInvestment,
  totalInterest,
}) => {
  return (
    <tr>
      <td>{year}</td>
      <td>{formatter.format(valueEndOfYear)}</td>
      <td>{formatter.format(interest)}</td>
      <td>{formatter.format(totalInterest)}</td>
      <td>{formatter.format(totalCapitalInvestment)}</td>
    </tr>
  );
};

export default InvestmentResultItem;
